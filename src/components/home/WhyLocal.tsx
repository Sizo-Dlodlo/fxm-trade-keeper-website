export default function WhyLocal() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop bg-surface-container-low border-y border-surface-stroke/30">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="material-symbols-outlined text-primary text-sm mr-2">
              database
            </span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
              Privacy First
            </span>
          </div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            Your Data Never Leaves Your Machine
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
            Unlike cloud-based journals, FXM Trade Keeper stores all your
            trading data locally on your computer. No accounts required, no
            cloud sync, no telemetry. Your edge is proprietary — we keep it
            that way.
          </p>
          <ul className="space-y-3">
            {[
              "Local SQLite database on your machine",
              "Optional .tkjournal export for backups",
              "No mandatory online account",
              "No data harvesting or selling",
              "Full control over your trading records",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">
                  check_circle
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <div className="glass-card rounded-xl p-8 flex items-center space-x-6">
            <span className="material-symbols-outlined text-5xl text-primary">
              lock
            </span>
            <div>
              <div className="font-label-mono text-label-mono text-on-surface">
                trade_journal.db
              </div>
              <div className="font-body-md text-body-md text-text-dimmed">
                Encrypted &amp; Secure — Local Only
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
