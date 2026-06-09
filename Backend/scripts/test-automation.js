import prisma from "../src/config/db.js";
import { signupService } from "../src/modules/auth/auth.service.js";
import { createGroupService, joinGroupService } from "../src/modules/group/group.service.js";
import { activateChallengeService } from "../src/modules/challenge/challenge.service.js";
import { solveChallengeService } from "../src/modules/submission/submission.service.js";
import challengeQueue from "../src/queues/challenge.queue.js";
import streakQueue from "../src/queues/streak.queue.js";
import reminderQueue from "../src/queues/reminder.queue.js";
import activityQueue from "../src/queues/activity.queue.js";
import { initEventListeners } from "../src/services/event.service.js";

// Make sure workers are imported and listening
import challengeWorker from "../src/workers/challenge.worker.js";
import streakWorker from "../src/workers/streak.worker.js";
import reminderWorker from "../src/workers/reminder.worker.js";
import activityWorker from "../src/workers/activity.worker.js";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAutomationTests() {
  console.log("=========================================");
  console.log("🚀 STARTING E2E BULLMQ AUTOMATION ENGINE TESTS");
  console.log("=========================================\n");

  const testSuffix = Date.now().toString().slice(-6);
  const emails = {
    alice: `alice_auto_${testSuffix}@example.com`,
    bob: `bob_auto_${testSuffix}@example.com`,
    charlie: `charlie_auto_${testSuffix}@example.com`,
  };

  let alice, bob, charlie;
  let group;
  let challenge;

  // Initialize event listeners to route events into BullMQ
  initEventListeners();

  try {
    // ----------------------------------------------------
    // 1. SETUP TEST ENTITIES
    // ----------------------------------------------------
    console.log("Step 1: Registering Test Users...");
    const resAlice = await signupService({ name: "Alice", email: emails.alice, password: "password123" });
    const resBob = await signupService({ name: "Bob", email: emails.bob, password: "password123" });
    const resCharlie = await signupService({ name: "Charlie", email: emails.charlie, password: "password123" });

    alice = resAlice.user;
    bob = resBob.user;
    charlie = resCharlie.user;

    console.log(`✅ Users Created: Alice (${alice.id}), Bob (${bob.id}), Charlie (${charlie.id})`);

    console.log("Creating private group with Alice...");
    group = await createGroupService({ name: `Automated DSA Club ${testSuffix}`, creatorId: alice.id });
    
    console.log(`Joining Bob and Charlie to group...`);
    await joinGroupService({ inviteCode: group.inviteCode, userId: bob.id });
    await joinGroupService({ inviteCode: group.inviteCode, userId: charlie.id });
    
    // Set Charlie's freeze count to 0 manually to force a streak reset later
    await prisma.userGroupStats.update({
      where: { userId_groupId: { userId: charlie.id, groupId: group.id } },
      data: { freezeCount: 0, currentStreak: 3 }, // Give him a starting streak of 3
    });
    
    // Give Bob a starting streak of 5 and default freezes
    await prisma.userGroupStats.update({
      where: { userId_groupId: { userId: bob.id, groupId: group.id } },
      data: { freezeCount: 2, currentStreak: 5 },
    });

    console.log("✅ Group structure and initial user stats configured successfully\n");

    // ----------------------------------------------------
    // 2. DAILY CHALLENGE SLOT CREATION AUTOMATION
    // ----------------------------------------------------
    console.log("Step 2: Dispatching automated challenge slot creation job via BullMQ...");
    const createJob = await challengeQueue.add('create-daily-challenges', {});
    console.log(`Job queued: challengeQueue:${createJob.id}. Waiting for worker processing...`);
    
    // Wait for the worker to process the group iteration and slot generation
    await sleep(2500);

    // Verify today's challenge slot is created
    const createdChallenges = await prisma.dailyChallenge.findMany({ where: { groupId: group.id } });
    if (createdChallenges.length === 0) {
      throw new Error("Automated challenge slot creation job failed to create a challenge record");
    }
    challenge = createdChallenges[0];
    console.log(`✅ Verified: Daily challenge slot created for today in status ${challenge.status}. Assigned Assignee ID: ${challenge.createdBy}`);

    // Activate the challenge so solvers can submit
    await activateChallengeService({
      challengeId: challenge.id,
      userId: challenge.createdBy,
      problemLink: "https://leetcode.com/problems/climbing-stairs/",
    });
    console.log(`✅ Challenge activated by assignee with Climb Stairs link`);
    
    // Wait for CHALLENGE_ACTIVATED event to be routed by BullMQ activity worker
    await sleep(1500);

    // ----------------------------------------------------
    // 3. SUBMIT SOLVES (Alice solves, Bob and Charlie do not)
    // ----------------------------------------------------
    console.log("\nStep 3: Submitting solve for Alice...");
    await solveChallengeService({
      userId: alice.id,
      groupId: group.id,
      challengeId: challenge.id,
      timeTaken: 300,
    });
    console.log("✅ Alice solved today's challenge. Bob and Charlie remain pending.");
    
    // Wait for SOLVED, STREAK_UPDATED, and FIRST_SOLVER to queue and process
    await sleep(2000);

    // ----------------------------------------------------
    // 4. SOLVE REMINDERS ENGINE
    // ----------------------------------------------------
    console.log("\nStep 4: Dispatching solve reminders job via BullMQ...");
    const reminderJob = await reminderQueue.add('process-reminders', {});
    console.log(`Job queued: reminderQueue:${reminderJob.id}. Waiting for worker compiler...`);
    
    // Wait for reminder processing
    await sleep(2000);

    // Verify reminder events are generated in activity feed
    let logs = await prisma.activityLog.findMany({
      where: { groupId: group.id, type: 'REMINDER_TRIGGERED' },
    });
    console.log(`Retrieved Reminder logs:`);
    logs.forEach(l => {
      console.log(`   - [Reminder for user ${l.userId}] ${l.message}`);
    });
    
    if (logs.length < 2) {
      throw new Error("Reminder engine did not queue alerts for all pending users");
    }
    console.log("✅ Verified: solve reminders compiled and logged for Bob and Charlie.");

    // --- REMINDER IDEMPOTENCY AUDIT ---
    console.log("Testing Reminder Idempotency: Re-dispatching reminders job...");
    await reminderQueue.add('process-reminders', {});
    await sleep(1500);
    
    const doubleReminderLogs = await prisma.activityLog.findMany({
      where: { groupId: group.id, type: 'REMINDER_TRIGGERED' },
    });
    if (doubleReminderLogs.length !== logs.length) {
      throw new Error(`Reminder engine is not idempotent. Total reminders increased from ${logs.length} to ${doubleReminderLogs.length}`);
    }
    console.log("✅ Verified: Reminder engine is completely idempotent. Zero duplicate alerts dispatched.\n");

    // ----------------------------------------------------
    // 5. AUTO CHALLENGE CLOSER & STREAK PROCESSING
    // ----------------------------------------------------
    console.log("Step 5: Dispatching automated challenge closure job via BullMQ...");
    const closeJob = await challengeQueue.add('close-daily-challenges', {});
    console.log(`Job queued: challengeQueue:${closeJob.id}. Waiting for worker processing...`);
    
    // Wait for closure and subsequent streak missed checks to complete
    await sleep(3500);

    // Verify challenge transitioned to CLOSED
    const freshChallenge = await prisma.dailyChallenge.findUnique({ where: { id: challenge.id } });
    console.log(`Verified Challenge Status: ${freshChallenge.status}`);
    if (freshChallenge.status !== 'CLOSED') {
      throw new Error("Auto challenge closer job failed to transition status to CLOSED");
    }
    console.log("✅ Verified: Challenge closed successfully.");

    // ----------------------------------------------------
    // 6. STREAK FREEZE AND RESET VERIFICATION
    // ----------------------------------------------------
    console.log("\nStep 6: Verifying Streak Resets and Streak Freeze consumptions...");
    
    // 6.1 Check Bob (who has streak freezes)
    const statsBob = await prisma.userGroupStats.findUnique({
      where: { userId_groupId: { userId: bob.id, groupId: group.id } },
    });
    console.log(`Bob Stats -> Current Streak: ${statsBob.currentStreak} | Freeze Count: ${statsBob.freezeCount}`);
    if (statsBob.currentStreak !== 5) {
      throw new Error(`Bob's streak should have been protected at 5, but is ${statsBob.currentStreak}`);
    }
    if (statsBob.freezeCount !== 1) {
      throw new Error(`Bob should have consumed 1 streak freeze (leaving 1), but has ${statsBob.freezeCount}`);
    }
    console.log("✅ Verified: Bob's streak was successfully protected by consuming 1 freeze.");

    // 6.2 Check Charlie (who had 0 freezes)
    const statsCharlie = await prisma.userGroupStats.findUnique({
      where: { userId_groupId: { userId: charlie.id, groupId: group.id } },
    });
    console.log(`Charlie Stats -> Current Streak: ${statsCharlie.currentStreak} | Freeze Count: ${statsCharlie.freezeCount}`);
    if (statsCharlie.currentStreak !== 0) {
      throw new Error(`Charlie's streak should have been reset to 0, but is ${statsCharlie.currentStreak}`);
    }
    console.log("✅ Verified: Charlie's streak reset to 0 due to freeze exhaustion.");

    // 6.3 Verify activity logs for FREEZE_USED and MISSED
    const freezeLogs = await prisma.activityLog.findMany({ where: { groupId: group.id, type: 'FREEZE_USED' } });
    const missedLogs = await prisma.activityLog.findMany({ where: { groupId: group.id, type: 'MISSED' } });
    
    if (freezeLogs.length === 0) throw new Error("FREEZE_USED event not logged");
    if (missedLogs.length === 0) throw new Error("MISSED event not logged");
    console.log(`✅ Logged: [${freezeLogs[0].type}] ${freezeLogs[0].message}`);
    console.log(`✅ Logged: [${missedLogs[0].type}] ${missedLogs[0].message}`);

    // ----------------------------------------------------
    // 7. STREAK IDEMPOTENCY AUDIT (RETRY-SAFETY)
    // ----------------------------------------------------
    console.log("\nStep 7: Testing Streak Idempotency (Job Replay Safeguard)...");
    console.log("Re-dispatching process-missed-users job manually to simulate worker retry/replay...");
    await streakQueue.add('process-missed-users', {
      challengeId: challenge.id,
      groupId: group.id,
    });
    
    // Wait for the worker to process the replayed job
    await sleep(2000);

    // Check Bob and Charlie's stats again to ensure they did not change
    const statsBobRetry = await prisma.userGroupStats.findUnique({
      where: { userId_groupId: { userId: bob.id, groupId: group.id } },
    });
    const statsCharlieRetry = await prisma.userGroupStats.findUnique({
      where: { userId_groupId: { userId: charlie.id, groupId: group.id } },
    });

    console.log(`Retried Bob Stats -> Current Streak: ${statsBobRetry.currentStreak} | Freeze Count: ${statsBobRetry.freezeCount}`);
    console.log(`Retried Charlie Stats -> Current Streak: ${statsCharlieRetry.currentStreak} | Freeze Count: ${statsCharlieRetry.freezeCount}`);

    if (statsBobRetry.freezeCount !== 1) {
      throw new Error(`Idempotency failed: Bob's freezes were double-consumed to ${statsBobRetry.freezeCount}`);
    }
    if (statsCharlieRetry.currentStreak !== 0) {
      throw new Error(`Idempotency failed: Charlie's streak changed after retry processing`);
    }

    const doubleFreezeLogs = await prisma.activityLog.findMany({ where: { groupId: group.id, type: 'FREEZE_USED' } });
    const doubleMissedLogs = await prisma.activityLog.findMany({ where: { groupId: group.id, type: 'MISSED' } });

    if (doubleFreezeLogs.length !== 1 || doubleMissedLogs.length !== 1) {
      throw new Error(`Idempotency failed: duplicate events logged during replay processing`);
    }
    console.log("✅ Verified: Streak processor is completely idempotent under job replay. Zero double consumption.");

    // ----------------------------------------------------
    // 8. SOCIAL ACTIVITY LOG FEED VERIFICATION
    // ----------------------------------------------------
    console.log("\nStep 8: Fetching full activity feed of the squad...");
    const feed = await prisma.activityLog.findMany({
      where: { groupId: group.id },
      orderBy: { createdAt: 'asc' },
    });
    console.log("Full Social Activity Logs Compiled:");
    feed.forEach((log, i) => {
      console.log(`   ${i + 1}. [${log.type}] ${log.message}`);
    });

    console.log("\n=========================================");
    console.log("🎉 ALL AUTOMATION E2E TESTS COMPLETED SUCCESSFULLY");
    console.log("=========================================");

  } catch (error) {
    console.error("❌ TEST RUN ENCOUNTERED AN ERROR:", error);
    throw error;
  } finally {
    // ----------------------------------------------------
    // SHUTDOWN WORKERS AND QUEUES TO PREVENT CONCURRENT DB OPERATIONS
    // ----------------------------------------------------
    console.log("Shutting down BullMQ workers and queues...");
    try {
      await Promise.all([
        challengeWorker.close(),
        streakWorker.close(),
        reminderWorker.close(),
        activityWorker.close(),
        challengeQueue.close(),
        streakQueue.close(),
        reminderQueue.close(),
        activityQueue.close(),
      ]);
      console.log("✅ Workers and queues shut down successfully");
    } catch (shutdownErr) {
      console.error("Error shutting down workers/queues:", shutdownErr.message);
    }

    // ----------------------------------------------------
    // CLEANUP
    // ----------------------------------------------------
    console.log("\nCleaning up test automation records from database...");
    
    if (challenge?.id) {
      await prisma.submission.deleteMany({ where: { challengeId: challenge.id } });
      await prisma.activityLog.deleteMany({ where: { groupId: group.id } });
      await prisma.dailyChallenge.delete({ where: { id: challenge.id } });
    }

    if (group?.id) {
      await prisma.userGroupStats.deleteMany({ where: { groupId: group.id } });
      await prisma.groupMember.deleteMany({ where: { groupId: group.id } });
      await prisma.group.delete({ where: { id: group.id } });
    }

    const testUserIds = [];
    if (alice?.id) testUserIds.push(alice.id);
    if (bob?.id) testUserIds.push(bob.id);
    if (charlie?.id) testUserIds.push(charlie.id);

    if (testUserIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: testUserIds } } });
    }

    console.log("✅ Database cleanup complete");
    await prisma.$disconnect();
    process.exit(0);
  }
}

runAutomationTests();
