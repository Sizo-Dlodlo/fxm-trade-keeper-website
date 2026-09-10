export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const posts: Post[] = [
  {
    slug: "why-local-first-trading-journal",
    title: "Why a Local-First Trading Journal Matters",
    excerpt:
      "In an era of cloud everything, here's why keeping your trading data local is a competitive advantage.",
    category: "Trading Journaling",
    date: "August 20, 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "Privacy Is a Competitive Edge",
        body: [
          "Your trading journal contains your most sensitive decisions — the setups you trade, the mistakes you made, the R-multiples you risk. In an era of cloud-everything, that data often ends up on third-party servers where you have no control over who accesses it.",
          "A local-first journal keeps this information on your own machine. No cloud sync, no telemetry, no data harvesting. Your edge stays exactly where it belongs: with you.",
        ],
      },
      {
        heading: "Offline Reliability",
        body: [
          "Trading doesn't pause when your internet drops. A local-first journal keeps working fully offline, so you can log and review trades no matter what. There's no dependency on a third-party service staying online.",
        ],
      },
      {
        heading: "Ownership and Portability",
        body: [
          "Local-first means you own your data completely. You can export your entire journal anytime as a portable file, back it up where you choose, and move it between computers without any lock-in. That freedom is the foundation of a durable trading practice.",
        ],
      },
    ],
  },
  {
    slug: "fxm-trade-keeper-v2-release",
    title: "FXM Trade Keeper v2.0 — What's New",
    excerpt:
      "SQLite persistence, portable edition, AI strategy generator, and more. Here's everything in v2.0.",
    category: "Product Updates",
    date: "August 15, 2026",
    readTime: "3 min read",
    sections: [
      {
        heading: "SQLite Persistence",
        body: [
          "Version 2.0 upgrades the storage engine to a robust local SQLite database, giving you faster performance, better reliability, and a solid foundation for advanced analytics — all while staying 100% local.",
        ],
      },
      {
        heading: "Portable Edition",
        body: [
          "For traders on the move, v2.0 introduces a portable edition that runs directly from a USB drive with no installation. Entirely self-contained, it keeps your journal with you wherever you go.",
        ],
      },
      {
        heading: "AI Strategy Generator and More",
        body: [
          "New optional AI-powered features help you analyse strategies and generate setup ideas, while the Edge Analytics, Risk Manager, and Strategy Playbook have all been refined. Download v2.0 today to see everything in action.",
        ],
      },
    ],
  },
  {
    slug: "prop-firm-risk-management",
    title: "Risk Management for Prop Firm Traders",
    excerpt:
      "How to use Trade Keeper's risk manager to stay within prop firm rules and maximize your evaluation.",
    category: "Risk Management",
    date: "August 10, 2026",
    readTime: "7 min read",
    sections: [
      {
        heading: "Know the Rules Before You Trade",
        body: [
          "Prop firm evaluations are won or lost on risk discipline before they are won on profit. Daily loss limits, maximum drawdown, and position sizing rules are contractual — breaching them ends your evaluation regardless of how profitable your trades are.",
          "Before placing a single trade, write down every rule your prop firm enforces and translate it into concrete numbers you can track.",
        ],
      },
      {
        heading: "Set Limits That Keep You in the Game",
        body: [
          "Use FXM Trade Keeper's Risk Manager to configure your daily loss limit and maximum drawdown to match your prop firm's rules, leaving yourself a margin of safety below the hard limits. Position sizing is then calculated automatically so every trade fits inside your risk framework.",
        ],
      },
      {
        heading: "Track Your Drawdown in Real Time",
        body: [
          "Your equity curve and drawdown are tracked continuously. Real-time warnings let you step back before you approach a breach, protecting both your evaluation and your capital. Consistently staying inside your limits is what separates traders who pass evaluations from those who don't.",
        ],
      },
    ],
  },
  {
    slug: "r-multiples-explained",
    title: "R-Multiples Explained: Why They Matter",
    excerpt:
      "Understanding R-multiples is key to evaluating your trading system. Here's how to use them.",
    category: "Trading Analytics",
    date: "August 5, 2026",
    readTime: "6 min read",
    sections: [
      {
        heading: "What Is an R-Multiple?",
        body: [
          "An R-multiple expresses a trade's profit or loss relative to the risk you took on it. If you risk 100 points and gain 200 points, that trade produced +2R. If you lost the full 100 points, it produced -1R. R-multiples normalise every trade to a common scale, regardless of account size or instrument.",
        ],
      },
      {
        heading: "Why Win Rate Misleads",
        body: [
          "A trader with a 40% win rate can be far more profitable than one with a 70% win rate if their winners are consistently larger than their losers. R-multiples make this visible by separating the size of your wins from the frequency of them.",
        ],
      },
      {
        heading: "Put R-Multiples to Work",
        body: [
          "FXM Trade Keeper calculates the R-multiple for every trade automatically and rolls them up into your expectancy and equity analytics. Over hundreds of trades, your average R-per-trade reveals the true quality of your system and tells you whether to size up, refine, or rethink your approach.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
