const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const reviews = [
  {
    rating: 5,
    title: "Game changer for my trading",
    body: "Trade Keeper has completely changed how I journal. The MT5 import saves me hours every week, and the edge analytics helped me identify my best setups.",
    displayName: "Sarah K.",
    applicationVersion: "2.0.0",
    platform: "Windows",
  },
  {
    rating: 5,
    title: "Finally a free journal that works",
    body: "I've tried dozens of trading journals and this is the first one that's actually free and doesn't compromise on features. The risk manager alone is worth it.",
    displayName: "Marcus T.",
    applicationVersion: "2.0.0",
    platform: "Windows",
  },
  {
    rating: 5,
    title: "Privacy-first approach is refreshing",
    body: "As a prop trader, I need my data to stay local. Trade Keeper does exactly that. No cloud, no accounts, just a solid journal.",
    displayName: "David L.",
    applicationVersion: "2.0.0",
    platform: "Windows",
  },
  {
    rating: 4,
    title: "Great for prop firm traders",
    body: "The risk management features are perfect for prop firm rules. I can track my drawdown and lot sizes in real-time. Would love to see a Mac version eventually.",
    displayName: "Alex M.",
    applicationVersion: "2.0.0",
    platform: "Windows",
  },
  {
    rating: 5,
    title: "Strategy tracking is brilliant",
    body: "The strategy playbook feature lets me document every setup and track which ones actually work. The AI analysis is a nice bonus.",
    displayName: "Jordan R.",
    applicationVersion: "2.0.0",
    platform: "Windows",
  },
];

async function main() {
  const existing = await prisma.review.count();
  if (existing > 0) {
    console.log(`Skipping: ${existing} reviews already exist.`);
    return;
  }
  for (const review of reviews) {
    await prisma.review.create({ data: { ...review, status: "approved" } });
  }
  console.log(`Seeded ${reviews.length} approved reviews.`);
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
