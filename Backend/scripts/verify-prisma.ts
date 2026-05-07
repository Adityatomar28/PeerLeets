import { prisma } from "../lib/prisma";

async function verify() {
  try {
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);
    console.log("✅ Connected");
  } catch (error) {
    console.error("❌ Connection failed");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
