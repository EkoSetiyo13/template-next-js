const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function AdminSeeder() {
  await prisma.$executeRaw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync("admin", salt, 1000, 64, "sha512")
    .toString("hex");
  const admins = await prisma.user.create({
    data: {
      id: uuidv4(),
      username: "admin",
      email: "admin@vendorportal.com",
      password: hash,
      salt: salt,
      is_admin: true
    }
  });

  console.log({ admins });
}

module.exports = AdminSeeder;
