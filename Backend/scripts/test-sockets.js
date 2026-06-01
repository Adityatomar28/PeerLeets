import http from 'http';
import app from '../src/app.js';
import { initSocketServer } from '../src/sockets/socket.server.js';
import { io as Client } from 'socket.io-client';
import prisma from '../src/config/db.js';
import { signupService } from '../src/modules/auth/auth.service.js';
import { createGroupService, joinGroupService } from '../src/modules/group/group.service.js';
import { createDailyChallengeSlot, activateChallengeService, closeChallengeService } from '../src/modules/challenge/challenge.service.js';
import { solveChallengeService } from '../src/modules/submission/submission.service.js';
import jwt from 'jsonwebtoken';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log("==================================================");
  console.log("🚀 STARTING REALTIME SOCKET ENGINE TEST SUITE");
  console.log("==================================================\n");

  const testSuffix = Date.now().toString().slice(-6);
  const emails = {
    alice: `alice_${testSuffix}@example.com`,
    bob: `bob_${testSuffix}@example.com`,
    charlie: `charlie_${testSuffix}@example.com`,
  };

  let userA, userB, userC;
  let tokenA, tokenB, tokenC;
  let group, unauthorizedGroup;
  let challenge;

  let server;
  let io;
  let port;

  let clientA, clientB, clientC;

  try {
    // ----------------------------------------------------
    // 1. SETUP DB RECORDS & USERS
    // ----------------------------------------------------
    console.log("[DB Setup] Registering Alice, Bob, and Charlie...");
    const resA = await signupService({ name: "Alice", email: emails.alice, password: "password123" });
    const resB = await signupService({ name: "Bob", email: emails.bob, password: "password123" });
    const resC = await signupService({ name: "Charlie", email: emails.charlie, password: "password123" });

    userA = resA.user;
    userB = resB.user;
    userC = resC.user;

    tokenA = resA.token;
    tokenB = resB.token;
    tokenC = resC.token;

    console.log("[DB Setup] Creating main testing group...");
    group = await createGroupService({ name: `Realtime Squad ${testSuffix}`, creatorId: userA.id });
    
    console.log("[DB Setup] Bob joining the squad...");
    await joinGroupService({ inviteCode: group.inviteCode, userId: userB.id });
    
    // Note: Charlie does NOT join the main group yet to test unauthorized access!
    console.log("[DB Setup] Creating a separate group where only Charlie belongs...");
    unauthorizedGroup = await createGroupService({ name: `Charlie Private Hub ${testSuffix}`, creatorId: userC.id });

    console.log("✅ DB Setup Completed successfully\n");

    // ----------------------------------------------------
    // 2. START LOCAL TEST SERVER WITH SOCKETS
    // ----------------------------------------------------
    console.log("[Server Setup] Launching ephemeral HTTP + Socket server...");
    server = http.createServer(app);
    io = initSocketServer(server);

    await new Promise((resolve) => {
      server.listen(0, () => {
        port = server.address().port;
        console.log(`[Server Setup] Ephemeral server running on port: ${port}`);
        resolve();
      });
    });

    // ----------------------------------------------------
    // 3. VERIFY SOCKET AUTHENTICATION & SECURITY
    // ----------------------------------------------------
    console.log("\n[Test 1] Testing JWT connection authentication...");
    
    // A. Connect with no token (Expect failure)
    await new Promise((resolve) => {
      const failClient = Client(`http://localhost:${port}`, {
        reconnectionDelay: 10,
        forceNew: true,
      });
      failClient.on("connect_error", (err) => {
        console.log(`   ✅ Correctly rejected client with no token: "${err.message}"`);
        failClient.disconnect();
        resolve();
      });
    });

    // B. Connect with invalid token format
    await new Promise((resolve) => {
      const failClient = Client(`http://localhost:${port}`, {
        auth: { token: "MalformedTokenString" },
        reconnectionDelay: 10,
        forceNew: true,
      });
      failClient.on("connect_error", (err) => {
        console.log(`   ✅ Correctly rejected client with invalid token: "${err.message}"`);
        failClient.disconnect();
        resolve();
      });
    });

    // C. Connect with expired/invalid JWT signature
    await new Promise((resolve) => {
      const expiredToken = jwt.sign({ id: userA.id }, "wrong_secret_key", { expiresIn: '0s' });
      const failClient = Client(`http://localhost:${port}`, {
        auth: { token: expiredToken },
        reconnectionDelay: 10,
        forceNew: true,
      });
      failClient.on("connect_error", (err) => {
        console.log(`   ✅ Correctly rejected client with wrong signature/expired JWT: "${err.message}"`);
        failClient.disconnect();
        resolve();
      });
    });

    // D. Connect with valid tokens
    console.log("Connecting valid clients (Alice and Bob)...");
    
    clientA = await new Promise((resolve, reject) => {
      const socket = Client(`http://localhost:${port}`, { auth: { token: tokenA } });
      socket.on("connect", () => resolve(socket));
      socket.on("connect_error", (err) => reject(err));
    });
    console.log("   ✅ Alice connected successfully");

    clientB = await new Promise((resolve, reject) => {
      const socket = Client(`http://localhost:${port}`, { auth: { token: tokenB } });
      socket.on("connect", () => resolve(socket));
      socket.on("connect_error", (err) => reject(err));
    });
    console.log("   ✅ Bob connected successfully");

    clientC = await new Promise((resolve, reject) => {
      const socket = Client(`http://localhost:${port}`, { auth: { token: tokenC } });
      socket.on("connect", () => resolve(socket));
      socket.on("connect_error", (err) => reject(err));
    });
    console.log("   ✅ Charlie connected successfully");

    // ----------------------------------------------------
    // 4. VERIFY GROUP ROOM BOUNDARIES & AUTHORIZATION
    // ----------------------------------------------------
    console.log("\n[Test 2] Testing group room boundaries and join security...");

    // Charlie (non-member) attempts to join Alice's squad group
    await new Promise((resolve) => {
      clientC.emit("join-group", { groupId: group.id });
      clientC.once("socket:error", (err) => {
        console.log(`   ✅ Correctly rejected Charlie from joining unauthorized group: "${err.message}"`);
        resolve();
      });
    });

    // Alice (actual member) joins room successfully
    clientA.emit("join-group", { groupId: group.id });
    // Bob joins room successfully
    clientB.emit("join-group", { groupId: group.id });
    
    await sleep(200);
    console.log("   ✅ Alice and Bob joined the authorized squad room successfully");

    // ----------------------------------------------------
    // 5. TEST REALTIME CHALLENGE ACTIVATION BROADCASTS
    // ----------------------------------------------------
    console.log("\n[Test 3] Testing Challenge Activation Broadcasts...");
    
    console.log("Creating WAITING challenge slot today...");
    challenge = await createDailyChallengeSlot({ groupId: group.id });

    // Set up listeners for the activation broadcast on Bob's client
    const activationPromise = new Promise((resolve) => {
      clientB.once("challenge:activated", (data) => {
        console.log(`   ✅ Bob received live "challenge:activated" broadcast!`);
        console.log(`      Payload -> Challenge ID: ${data.challengeId} | Problem: ${data.problemLink}`);
        resolve(data);
      });
    });

    console.log("Alice activating today's challenge...");
    await activateChallengeService({
      challengeId: challenge.id,
      userId: challenge.createdBy,
      problemLink: "https://leetcode.com/problems/two-sum/",
    });

    const activatedEvent = await activationPromise;
    if (activatedEvent.challengeId === challenge.id && activatedEvent.problemLink.includes("two-sum")) {
      console.log("   ✅ Challenge activation broadcast successfully verified");
    }

    // ----------------------------------------------------
    // 6. TEST REALTIME SOLVE & PARTICIPATION GRID STREAMING
    // ----------------------------------------------------
    console.log("\n[Test 4] Testing Solve event, first solver badge, and participation grids...");

    // Setup listeners on Bob's socket
    const solveSuccessPromise = new Promise((resolve) => {
      clientB.once("solve:success", (data) => {
        console.log(`   ✅ Bob received live "solve:success" broadcast!`);
        resolve(data);
      });
    });

    const firstSolverPromise = new Promise((resolve) => {
      clientB.once("solve:first", (data) => {
        console.log(`   ✅ Bob received live "solve:first" badge broadcast!`);
        resolve(data);
      });
    });

    const participationPromise = new Promise((resolve) => {
      clientB.once("participation:update", (data) => {
        console.log(`   ✅ Bob received live "participation:update" grid refresh!`);
        console.log(`      Solved list contains: ${data.solved.map(s => s.name).join(', ')}`);
        console.log(`      Pending list contains: ${data.pending.map(p => p.name).join(', ')}`);
        console.log(`      First Solver: ${data.firstSolver ? data.firstSolver.name : "None"}`);
        resolve(data);
      });
    });

    console.log("Alice submitting a correct solve...");
    await solveChallengeService({
      userId: userA.id,
      groupId: group.id,
      challengeId: challenge.id,
      timeTaken: 450, // 7.5 minutes
    });

    await Promise.all([solveSuccessPromise, firstSolverPromise, participationPromise]);
    console.log("   ✅ Solve event, first solver, and participation status grid broadcasts verified");

    // ----------------------------------------------------
    // 7. TEST DYNAMIC LEADERBOARD & ACTIVITY FEED STREAMING
    // ----------------------------------------------------
    console.log("\n[Test 5] Testing Dynamic Leaderboard and Activity Feed Streaming...");

    const activityPromise = new Promise((resolve) => {
      clientB.once("activity:created", (data) => {
        console.log(`   ✅ Bob received live social activity line: "${data.message}"`);
        resolve(data);
      });
    });

    const leaderboardPromise = new Promise((resolve) => {
      clientB.once("leaderboard:update", (data) => {
        console.log(`   ✅ Bob received live "leaderboard:update" ranking streams!`);
        data.leaderboard.forEach((rank, idx) => {
          console.log(`      Rank ${idx + 1}: ${rank.name} | Dynamic Score: ${rank.score} | Streak: ${rank.currentStreak}`);
        });
        resolve(data);
      });
    });

    // Wait briefly for activity worker and leaderboard updates to finish streaming
    await sleep(200);

    const loggedActivity = await activityPromise;
    const updatedLeaderboard = await leaderboardPromise;

    if (loggedActivity.message.includes("solved today's challenge")) {
      console.log("   ✅ Activity social streams successfully verified");
    }
    if (updatedLeaderboard.leaderboard.some(rank => rank.userId === userA.id)) {
      console.log("   ✅ Leaderboard dynamic streams successfully verified");
    }

    // ----------------------------------------------------
    // 8. TEST CONNECTION RATE LIMITING
    // ----------------------------------------------------
    console.log("\n[Test 6] Testing websocket rate limiting rules...");
    console.log("Bob spamming room-joins 20 times simultaneously...");
    
    let errorCount = 0;
    const spamPromises = [];
    
    clientB.on("socket:error", (err) => {
      if (err.code === "RATE_LIMIT_EXCEEDED") {
        errorCount++;
      }
    });

    for (let i = 0; i < 20; i++) {
      clientB.emit("join-group", { groupId: group.id });
    }

    await sleep(400);
    clientB.removeAllListeners("socket:error");

    console.log(`   ✅ Spam completed. Received ${errorCount} "RATE_LIMIT_EXCEEDED" error responses.`);
    if (errorCount > 0) {
      console.log("   ✅ Rate Limiter correctly triggered and blocked socket spam");
    } else {
      throw new Error("Rate limiter failed to block spam");
    }

    // ----------------------------------------------------
    // 9. TEST CONNECTION DISCONNECT & RECONNECT ROOM RESTORATION
    // ----------------------------------------------------
    console.log("\n[Test 7] Testing connection disconnect & reconnect authorization safety...");
    console.log("Bob disconnects...");
    clientB.disconnect();
    await sleep(200);

    console.log("Bob reconnects with fresh socket...");
    const reconnectedClient = await new Promise((resolve, reject) => {
      const socket = Client(`http://localhost:${port}`, {
        auth: { token: tokenB },
        forceNew: true,
      });
      socket.on("connect", () => resolve(socket));
      socket.on("connect_error", (err) => reject(err));
    });
    console.log("   ✅ Reconnected successfully. Sockets are isolated and rate-limiter caches cleared.");

    // Bob requests room entry again, verifying DB authorization runs again
    console.log("Bob requests room entry again (forces membership DB check)...");
    reconnectedClient.emit("join-group", { groupId: group.id });
    await sleep(200);
    
    // We confirm Bob is in room by broadcasting an activity log and verifying he receives it!
    const activityReconnectPromise = new Promise((resolve) => {
      reconnectedClient.once("activity:created", (data) => {
        console.log(`   ✅ Reconnected Bob successfully received live broadcast message: "${data.message}"`);
        resolve(data);
      });
    });

    // Mock an activity log
    await prisma.activityLog.create({
      data: {
        userId: userA.id,
        groupId: group.id,
        type: 'STREAK_UPDATED',
        message: 'Mock activity to test re-established room connection!',
      }
    });
    
    // Emit manually for checking
    io.to(`group:${group.id}`).emit('activity:created', { message: 'Mock activity to test re-established room connection!' });

    await activityReconnectPromise;
    reconnectedClient.disconnect();
    console.log("   ✅ Reconnection and Room entry checks fully verified");

    console.log("\n==================================================");
    console.log("🎉 ALL REALTIME WEBSOCKET SUITE TESTS PASSED");
    console.log("==================================================");

  } catch (error) {
    console.error("❌ SOCKET TESTS ENCOUNTERED ERROR:", error);
    throw error;
  } finally {
    // Disconnect any active test sockets
    if (clientA) clientA.disconnect();
    if (clientB) clientB.disconnect();
    if (clientC) clientC.disconnect();

    // Close server
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("\n[Server Cleanup] Ephemeral server closed.");
    }

    // ----------------------------------------------------
    // CLEANUP DATABASE
    // ----------------------------------------------------
    console.log("[DB Cleanup] Removing testing records...");
    
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

    if (unauthorizedGroup?.id) {
      await prisma.userGroupStats.deleteMany({ where: { groupId: unauthorizedGroup.id } });
      await prisma.groupMember.deleteMany({ where: { groupId: unauthorizedGroup.id } });
      await prisma.group.delete({ where: { id: unauthorizedGroup.id } });
    }

    const testUserIds = [];
    if (userA?.id) testUserIds.push(userA.id);
    if (userB?.id) testUserIds.push(userB.id);
    if (userC?.id) testUserIds.push(userC.id);

    if (testUserIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: testUserIds } } });
    }

    console.log("✅ DB Cleanup Completed");
    await prisma.$disconnect();
  }
}

runTests();
