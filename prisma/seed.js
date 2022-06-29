const AdminSeeder = require("./seeder/AdminSeeder");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  AdminSeeder();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
