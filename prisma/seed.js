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

  // Seeded release if none exist
  const releaseCount = await prisma.release.count();
  if (releaseCount === 0) {
    await prisma.release.create({
      data: {
        version: "2.0.0",
        stable: true,
        releaseDate: new Date("2026-08-26"),
        changelog: [
          "## New",
          "- Portable Edition — run without installation",
          "- SQLite persistence for reliable data storage",
          "- .tkjournal export/import for backups and transfers",
          "- Automatic local backups",
          "- AI Strategy Generator",
          "- Per-strategy AI analysis",
          "- JSON/PDF strategy export",
          "",
          "## Improved",
          "- Offline-first architecture",
          "- Crash and error logging",
          "- Performance optimizations",
        ].join("\n"),
      },
    });
    console.log("Seeded default v2.0.0 release");
  }
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
