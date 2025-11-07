import { PrismaClient } from "./lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("DB connected:", result);
  } catch (err) {
    console.error("Prisma connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
