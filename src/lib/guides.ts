export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  popular: boolean;
  readTime: string;
  updated: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-journal-forex-trades",
    title: "How to Journal Forex Trades Effectively",
    excerpt:
      "A complete guide to building a trading journal that actually improves your performance.",
    category: "Trading Journaling",
    popular: true,
    readTime: "8 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Why Journaling Matters",
        body: [
          "A trading journal is the single most effective tool for turning experience into measurable improvement. Every trade you take contains valuable information — your entries, exits, emotional state, market context, and the outcome. Without recording and reviewing this information, you are trading on repetition rather than evidence.",
          "The best traders treat their journal as a feedback loop: record every trade accurately, review the patterns that emerge, and adjust based on what the data shows. Over time, this turns intuition into a repeatable, profitable process.",
        ],
      },
      {
        heading: "What to Record for Every Trade",
        body: [
          "At minimum, record the instrument, trade direction, entry and exit prices, position size, stop loss, take profit, profit or loss in both pips and R-multiples, and the date. FXM Trade Keeper stores all of this automatically the moment you log a trade.",
          "Beyond the raw numbers, capture the context: the strategy or setup used, the session and time of day, market conditions, screenshots of the chart, and a short note on your decision-making. This qualitative context is where most of the learning lives.",
        ],
      },
      {
        heading: "Review Your Journal Regularly",
        body: [
          "A journal only helps if you actually read it. Set aside time each week to review your recent trades and each month to analyse your broader performance. Look for patterns in your winning and losing trades — the setups that work, the times of day you are most effective, and the mistakes that keep recurring.",
          "Use FXM Trade Keeper's Edge Analytics to filter your performance by strategy, session, instrument, or duration. This turns raw trade data into actionable insight about where your edge actually lives.",
        ],
      },
    ],
  },
  {
    slug: "import-mt5-trades",
    title: "How to Import MT5 Trades into FXM Trade Keeper",
    excerpt:
      "Step-by-step guide to importing your MetaTrader 5 trade history.",
    category: "MT5 Import",
    popular: true,
    readTime: "5 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Export from MetaTrader 5",
        body: [
          "Open MetaTrader 5 and log in to the account you want to import. In the Trade tab or History tab, right-click your trade history and choose to export the account history as a file. MT5 exports your trade records including timestamps, prices, and lot sizes.",
          "Save the exported report somewhere you can find it easily, such as your Desktop or Documents folder. Keep the file format as the default CSV or HTML export that MT5 produces.",
        ],
      },
      {
        heading: "Import into FXM Trade Keeper",
        body: [
          "Open FXM Trade Keeper and navigate to the Import feature. Select your MT5 account and choose the exported file. The app will read your entire trade history and map each trade to the correct fields in your journal.",
          "After the import completes, review a sample of trades to confirm prices, direction, and profit/loss were mapped correctly. You can then tag, categorise, and analyse your imported trades just like any other.",
        ],
      },
      {
        heading: "Troubleshooting Common Issues",
        body: [
          "If some trades do not import, verify that the export file contains the full history and that the column layout matches MT5's standard report. Ensure you exported the correct time period and account.",
          "For the best results, export a fresh copy of your recent history before each import so your journal stays up to date with your live trading.",
        ],
      },
    ],
  },
  {
    slug: "import-mt4-trades",
    title: "How to Import MT4 Trades",
    excerpt:
      "Learn how to export and import your MetaTrader 4 trading history.",
    category: "MT4 Import",
    popular: false,
    readTime: "5 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Export from MetaTrader 4",
        body: [
          "In MetaTrader 4, open the Account History tab and right-click to select all history for the desired period. Choose to export the history to a file. MT4 will generate a report with your complete trade records.",
          "Save the report to a convenient location on your computer. A CSV export is recommended for the most reliable import.",
        ],
      },
      {
        heading: "Import into FXM Trade Keeper",
        body: [
          "Launch FXM Trade Keeper, go to the Import section, select your MT4 account, and choose the exported history file. The application will automatically map each trade into your journal.",
          "Once imported, verify that a few representative trades look correct. You can then apply tags and notes, and the trades become available in your analytics and reports.",
        ],
      },
      {
        heading: "Keeping Your Journal Current",
        body: [
          "Get into the habit of re-importing your MT4 history after each trading week. This keeps your journal, analytics, and equity curve accurate without requiring manual entry of every trade.",
        ],
      },
    ],
  },
  {
    slug: "risk-manager-guide",
    title: "How to Use the FXM Risk Manager",
    excerpt:
      "Master position sizing, drawdown tracking, and prop-firm rule compliance.",
    category: "Risk Management",
    popular: false,
    readTime: "7 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Understand Your Risk Framework",
        body: [
          "Professional traders protect their capital first and seek profits second. The FXM Risk Manager helps you define limits — maximum risk per trade, maximum daily loss, and maximum drawdown — and then tracks your adherence to those limits automatically.",
          "Start by setting your risk per trade as a percentage of your account. A common conservative figure is 1% per trade, meaning a losing trade costs you no more than 1% of your equity.",
        ],
      },
      {
        heading: "Track R-Multiples",
        body: [
          "R-multiples measure your profit or loss relative to the risk you took on a trade. A trade that risks 100 points and makes 200 points is a +2R result. Tracking R-multiples removes the noise of account size and lets you judge the true quality of your trading system.",
          "Use the Risk Manager to log your stop-loss distance and let FXM Trade Keeper calculate the R-multiple for every trade automatically.",
        ],
      },
      {
        heading: "Staying Within Prop Firm Rules",
        body: [
          "If you trade for a prop firm, position sizing and drawdown limits are often contractual obligations. The Risk Manager lets you set your daily and maximum drawdown thresholds to match your prop firm's rules, giving you real-time warnings before you approach a breach.",
        ],
      },
    ],
  },
  {
    slug: "edge-analytics-guide",
    title: "How to Read Edge Analytics",
    excerpt:
      "Understand R-multiples, expectancy, and performance metrics that matter.",
    category: "Analytics",
    popular: false,
    readTime: "6 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Start With Win Rate and Expectancy",
        body: [
          "Win rate alone is misleading. A trader who wins 30% of trades can be highly profitable if their average winner is much larger than their average loser. Expectancy combines win rate with average risk-reward to show your expected profit per trade — this is the number that truly matters.",
          "FXM Trade Keeper's Edge Analytics calculates your expectancy automatically across all your filtered trades.",
        ],
      },
      {
        heading: "Analyse by Strategy, Session, and Instrument",
        body: [
          "Your overall results are the average of many different situations. Filter your analytics by strategy, trading session, instrument, or trade duration to discover where your edge is strongest and where you are leaking money.",
          "This segmented view reveals actionable insights — for example, that your best setups occur in a specific session or that one strategy consistently underperforms.",
        ],
      },
      {
        heading: "Watch the Equity Curve and Drawdown",
        body: [
          "The equity curve shows your cumulative performance over time, while drawdown measures the peak-to-trough decline. Consistent growth with shallow, controlled drawdowns is the hallmark of a durable edge.",
          "Use these charts to evaluate whether your current approach is sustainable in size and over the long term.",
        ],
      },
    ],
  },
  {
    slug: "strategy-tracking",
    title: "How to Track Trading Strategies",
    excerpt:
      "Document, test, and refine your trading strategies with the Strategy Playbook.",
    category: "Strategies",
    popular: false,
    readTime: "6 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Document Every Strategy",
        body: [
          "A strategy you cannot write down is a strategy you cannot test. Use the Strategy Playbook to document the exact entry and exit conditions, risk parameters, and management rules for each of your trading approaches.",
          "Being precise about your rules lets you determine whether you are following them consistently — and whether those rules actually produce an edge.",
        ],
      },
      {
        heading: "Tag Trades to Their Strategy",
        body: [
          "When you log a trade, tag it with the specific strategy it belongs to. Over time, FXM Trade Keeper groups these trades together so you can measure each strategy's win rate, expectancy, and drawdown independently.",
          "This is the difference between knowing you trade profitably and knowing which of your approaches makes you profitable.",
        ],
      },
      {
        heading: "Refine With Data, Not Feelings",
        body: [
          "When a strategy underperforms, resist the urge to tweak it emotionally. Instead, review the analytics for that strategy, identify whether the issue is the rules or the execution, and make one data-driven change at a time.",
        ],
      },
    ],
  },
  {
    slug: "backup-journal",
    title: "How to Back Up Your Trading Journal",
    excerpt:
      "Protect your data with .tkjournal exports and automatic backups.",
    category: "Data Management",
    popular: false,
    readTime: "4 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Why Backups Matter",
        body: [
          "Your trading journal is a record of years of decisions and data. A hardware failure, accidental deletion, or system reset could wipe out that history in an instant. Regular backups are your insurance policy.",
        ],
      },
      {
        heading: "Use .tkjournal Exports",
        body: [
          "FXM Trade Keeper can export your entire journal — every trade, note, screenshot, and setting — into a single portable .tkjournal file. Store these exports on an external drive or a cloud location you trust.",
          "Schedule a backup after each trading week, or use the automatic backup settings to create them on a regular basis.",
        ],
      },
      {
        heading: "Restore and Transfer",
        body: [
          "A .tkjournal export can be imported back into FXM Trade Keeper at any time, whether you are restoring after a system change or transferring your journal to another computer. This makes moving to a new PC simple and safe.",
        ],
      },
    ],
  },
  {
    slug: "transfer-to-new-pc",
    title: "How to Transfer Trade Keeper to Another PC",
    excerpt:
      "Move your journal to a new computer without losing any data.",
    category: "Data Management",
    popular: false,
    readTime: "4 min read",
    updated: "August 2026",
    sections: [
      {
        heading: "Export Your Journal",
        body: [
          "Before moving, open FXM Trade Keeper on your current computer and export your entire journal as a .tkjournal file. This captures all your trades, notes, screenshots, and settings.",
          "Copy the .tkjournal file to a USB drive, email, or cloud storage so you can access it from your new machine.",
        ],
      },
      {
        heading: "Install FXM Trade Keeper on the New PC",
        body: [
          "Download and install the latest version of FXM Trade Keeper on your new computer, either the installer or portable edition, just as you did originally.",
        ],
      },
      {
        heading: "Import Your Journal",
        body: [
          "On the new machine, use the import feature to restore your .tkjournal backup. Verify that a few recent trades and your key settings appear correctly.",
          "Once confirmed, you can continue journaling seamlessly on your new computer as if nothing changed.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
