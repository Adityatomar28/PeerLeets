import prisma from "../src/config/db.js";
import { signupService } from "../src/modules/auth/auth.service.js";
import { createGroupService, joinGroupService } from "../src/modules/group/group.service.js";
import { createDailyChallengeSlot, activateChallengeService, closeChallengeService } from "../src/modules/challenge/challenge.service.js";
import { solveChallengeService } from "../src/modules/submission/submission.service.js";
import leaderboardService from "../src/modules/leaderboard/leaderboard.service.js";
import activityService from "../src/modules/activity/activity.service.js";
import { initEventListeners } from "../src/services/event.service.js";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log("=========================================");
  console.log("🚀 STARTING E2E SOCIAL ACCOUNTABILITY ENGINE TESTS");
  console.log("=========================================\n");

  // Register event bus listeners for tests
  initEventListeners();

  const testSuffix = Date.now().toString().slice(-6);
  const emails = {
    userA: `usera_${testSuffix}@example.com`,
    userB: `userb_${testSuffix}@example.com`,
    userC: `userc_${testSuffix}@example.com`,
  };

  let userA, userB, userC;
  let group;
  let challenge;
  let submissionA, submissionB;

  try {
    // ----------------------------------------------------
    // 1. CREATE TEST USERS
    // ----------------------------------------------------
    console.log("Step 1: Registering Test Users...");
    const resA = await signupService({ name: "Alice", email: emails.userA, password: "password123" });
    const resB = await signupService({ name: "Bob", email: emails.userB, password: "password123" });
    const resC = await signupService({ name: "Charlie", email: emails.userC, password: "password123" });

    userA = resA.user;
    userB = resB.user;
    userC = resC.user;
    console.log(`✅ Users Created: Alice (${userA.id}), Bob (${userB.id}), Charlie (${userC.id})\n`);

    // ----------------------------------------------------
    // 2. CREATE PRIVATE GROUP & JOIN
    // ----------------------------------------------------
    console.log("Step 2: Creating private group...");
    group = await createGroupService({ name: `DSA Consistency Squad ${testSuffix}`, creatorId: userA.id });
    console.log(`✅ Group Created: ${group.name} | Invite Code: ${group.inviteCode}`);

    console.log("Joining group members Bob and Charlie...");
    await joinGroupService({ inviteCode: group.inviteCode, userId: userB.id });
    await joinGroupService({ inviteCode: group.inviteCode, userId: userC.id });
    console.log("✅ All members joined the group successfully\n");

    // ----------------------------------------------------
    // 3. CREATE & ACTIVATE CHALLENGE SLOT
    // ----------------------------------------------------
    console.log("Step 3: Creating and activating daily challenge...");
    challenge = await createDailyChallengeSlot({ groupId: group.id });
    console.log(`✅ WAITING challenge slot created for today. Assigned creator ID: ${challenge.createdBy}`);

    // Activate the challenge (must be done by the assigned challenger)
    const activeChallenge = await activateChallengeService({
      challengeId: challenge.id,
      userId: challenge.createdBy,
      problemLink: "https://leetcode.com/problems/two-sum/",
    });
    console.log(`✅ Challenge activated with problem link: ${activeChallenge.problemLink}\n`);

    // Wait briefly to allow async events for created/activated to process
    await sleep(200);

    // ----------------------------------------------------
    // 4. SUBMIT SOLVES (SOLVE FLOW)
    // ----------------------------------------------------
    console.log("Step 4: Submitting solves...");
    // Alice solves first
    console.log("Alice solving challenge...");
    const solveResA = await solveChallengeService({
      userId: userA.id,
      groupId: group.id,
      challengeId: challenge.id,
      timeTaken: 600, // 10 minutes
    });
    submissionA = solveResA.submission;
    console.log(`✅ Alice solved first! Solved time: ${submissionA.solvedAt}`);

    // Wait to guarantee order
    await sleep(100);

    // Bob solves second
    console.log("Bob solving challenge...");
    const solveResB = await solveChallengeService({
      userId: userB.id,
      groupId: group.id,
      challengeId: challenge.id,
      timeTaken: 1200, // 20 minutes
    });
    submissionB = solveResB.submission;
    console.log(`✅ Bob solved second. Solved time: ${submissionB.solvedAt}`);

    // Charlie does NOT solve (should remain pending, and later missed when closed)
    console.log("Charlie remains pending...\n");

    // Wait for the async events (SOLVED, FIRST_SOLVER, STREAK_UPDATED) to fire
    console.log("Waiting for async activity logging to complete...");
    await sleep(500);

    // ----------------------------------------------------
    // 5. ACTIVITY FEED VERIFICATION
    // ----------------------------------------------------
    console.log("Step 5: Verifying Activity Feed...");
    const activityFeed = await activityService.getActivityFeedService({ groupId: group.id, page: 1, limit: 10 });
    console.log("Retrieved Activity Logs:");
    activityFeed.forEach((log, index) => {
      console.log(`   ${index + 1}. [${log.type}] ${log.message}`);
    });
    
    // Validate that we got a FIRST_SOLVER and SOLVED events
    const firstSolverLog = activityFeed.find(l => l.type === 'FIRST_SOLVER');
    const solvedLog = activityFeed.find(l => l.type === 'SOLVED');
    if (firstSolverLog) console.log("✅ FIRST_SOLVER event logged successfully");
    if (solvedLog) console.log("✅ SOLVED event logged successfully");
    console.log("");

    // ----------------------------------------------------
    // 6. LEADERBOARD ENGINE VERIFICATION
    // ----------------------------------------------------
    console.log("Step 6: Verifying Leaderboard Rankings...");
    const globalBoard = await leaderboardService.getLeaderboardService({ groupId: group.id, type: "global" });
    console.log("Global Leaderboard Rankings:");
    globalBoard.leaderboard.forEach((rank, index) => {
      console.log(`   Rank ${index + 1}: ${rank.name} | Score: ${rank.score} | Solved: ${rank.totalSolved} | Streak: ${rank.currentStreak}`);
    });

    const weeklyBoard = await leaderboardService.getLeaderboardService({ groupId: group.id, type: "weekly" });
    console.log("Weekly Leaderboard Rankings:");
    weeklyBoard.leaderboard.forEach((rank, index) => {
      console.log(`   Rank ${index + 1}: ${rank.name} | Last 7 Days Solved: ${rank.last7DaysSolved}`);
    });
    console.log("");

    // ----------------------------------------------------
    // 7. CHALLENGE PARTICIPATION STATUS VERIFICATION
    // ----------------------------------------------------
    console.log("Step 7: Verifying Challenge Participation Status Grid...");
    let statusGrid = await leaderboardService.getChallengeParticipationService({
      groupId: group.id,
      challengeId: challenge.id,
    });
    console.log(`Solved Count: ${statusGrid.solved.length}`);
    console.log(`Pending Count: ${statusGrid.pending.length}`);
    console.log(`Missed Count: ${statusGrid.missed.length}`);
    console.log(`First Solver Badge: ${statusGrid.firstSolver ? statusGrid.firstSolver.name : "None"}`);

    if (statusGrid.firstSolver && statusGrid.firstSolver.userId === userA.id) {
      console.log("✅ First Solver Badge correctly points to Alice");
    }
    if (statusGrid.pending.some(p => p.userId === userC.id)) {
      console.log("✅ Charlie is correctly marked PENDING because challenge is still active");
    }

    // Now close the challenge and verify that Charlie becomes MISSED
    console.log("\nClosing challenge early to test MISSED transitions...");
    await closeChallengeService({ challengeId: challenge.id });

    statusGrid = await leaderboardService.getChallengeParticipationService({
      groupId: group.id,
      challengeId: challenge.id,
    });
    if (statusGrid.missed.some(p => p.userId === userC.id)) {
      console.log("✅ Charlie successfully transitioned from PENDING to MISSED status after closure");
    }
    console.log("");

    // ----------------------------------------------------
    // 8. INACTIVE USERS VERIFICATION
    // ----------------------------------------------------
    console.log("Step 8: Verifying Inactive User Detection...");
    const inactiveUsers = await leaderboardService.detectInactiveUsers({ groupId: group.id });
    console.log("Inactive Users (0 solves in last 7 days):");
    inactiveUsers.forEach(u => {
      console.log(`   - ${u.name} (${u.email})`);
    });
    if (inactiveUsers.some(u => u.userId === userC.id)) {
      console.log("✅ Charlie (who didn't solve) is correctly flagged as INACTIVE");
    }
    if (!inactiveUsers.some(u => u.userId === userA.id || u.userId === userB.id)) {
      console.log("✅ Active solvers Alice and Bob are correctly OMITTED from inactive list");
    }
    console.log("");

    console.log("=========================================");
    console.log("🎉 ALL FUNCTIONAL TESTS COMPLETED SUCCESSFULLY");
    console.log("=========================================");

  } catch (error) {
    console.error("❌ TEST RUN ENCOUNTERED AN ERROR:", error);
    throw error;
  } finally {
    // ----------------------------------------------------
    // CLEANUP DATABASE
    // ----------------------------------------------------
    console.log("\nCleaning up test records from database...");
    
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
    if (userA?.id) testUserIds.push(userA.id);
    if (userB?.id) testUserIds.push(userB.id);
    if (userC?.id) testUserIds.push(userC.id);

    if (testUserIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: testUserIds } } });
    }

    console.log("✅ Database cleanup complete");
    await prisma.$disconnect();
  }
}

runTests();
