const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "admin@fxmtradekeeper.com" },
  });

  if (!user) {
    console.log("USER NOT FOUND");
    return;
  }

  console.log("User found:", user.email, "role:", user.role);
  console.log("Password hash:", user.password);

  const testPassword = "FxM@dm1n2026!";
  const valid = await bcrypt.compare(testPassword, user.password);
  console.log("Password valid:", valid);

  if (!valid) {
    console.log("Re-seeding with fresh hash...");
    const newHash = await bcrypt.hash(testPassword, 12);
    await prisma.user.update({
      where: { email: "admin@fxmtradekeeper.com" },
      data: { password: newHash },
    });
    console.log("New hash stored:", newHash);

    const recheck = await bcrypt.compare(testPassword, newHash);
    console.log("Recheck:", recheck);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
