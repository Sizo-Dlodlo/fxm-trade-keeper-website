const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@fxmtradekeeper.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "FXM Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin user created/updated: ${user.email}`);

  // Create default settings
  const defaults = [
    { key: "site_url", value: "https://fxmtradekeeper.com" },
    { key: "support_email", value: "support@fxmtradekeeper.com" },
    { key: "advertising_enabled", value: "false" },
    { key: "comments_enabled", value: "false" },
  ];

  for (const setting of defaults) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Default settings created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
