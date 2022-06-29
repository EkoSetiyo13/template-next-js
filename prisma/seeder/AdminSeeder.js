const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const data = [
  {
    username: "admin",
    email: "admin@vendorportal.com",
    password: "admin"
  },
  {
    username: "admin2",
    email: "admin2@vendorportal.com",
    password: "admin2"
  }
];

async function AdminSeeder() {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE admins RESTART IDENTITY CASCADE;`
  );

  data.map(async (item, index) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(item.password, salt, 1000, 64, "sha512")
      .toString("hex");
    const admin = await prisma.admin.create({
      data: {
        id: uuidv4(),
        username: item.username,
        email: item.email,
        password: hash,
        salt: salt,
        is_admin: true
      }
    });
  })

  
}

module.exports = AdminSeeder;
