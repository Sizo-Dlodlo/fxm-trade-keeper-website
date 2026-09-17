const SECTIONS = [
  {
    icon: "verified_user",
    title: "Is this software safe?",
    body: (
      <>
        FXM Trade Keeper is distributed from this official website over a
        secure, encrypted connection (look for the padlock icon next to the
        address). Every download has a{" "}
        <strong>SHA-256 checksum</strong> listed on this page so you can
        verify the file is exactly the one we published — and nothing has been
        changed or tampered with in transit.
      </>
    ),
  },
  {
    icon: "shield",
    title: "Why does Windows show a “Windows protected your PC” warning?",
    body: (
      <>
        Our installer is not signed with a commercial code-signing
        certificate, which costs thousands of dollars per year. Windows shows
        a warning for any unsigned installer — including this official one. If
        you see the blue “Windows protected your PC” screen, click{" "}
        <strong>More info</strong>, then <strong>Run anyway</strong>. The file
        is safe; you can confirm with the SHA-256 checksum above.
      </>
    ),
  },
  {
    icon: "apple",
    title: "Why does macOS say the “developer cannot be verified”?",
    body: (
      <>
        macOS shows this for apps that are not from the App Store and are not
        notarized by Apple. To open ours: find the app in Finder,{" "}
        <strong>right-click it</strong> and choose <strong>Open</strong>, then
        click <strong>Open</strong> again in the dialog that appears. You only
        need to do this the first time.
      </>
    ),
  },
  {
    icon: "web",
    title: "Prefer to avoid warnings entirely? Use the free web app.",
    body: (
      <>
        The recommended option on this page — the installable web app (PWA) —
        installs with no downloads and no warnings on any device, while still
        running offline like a normal application.
      </>
    ),
  },
];

export default function SecurityNotes() {
  return (
    <div className="lg:col-span-12 bg-surface-container border border-surface-stroke rounded-xl p-6 md:p-8">
      <h4 className="font-headline-md text-base text-on-surface mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[22px]">
          security
        </span>
        Security &amp; Trust Notes
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <details
            key={s.title}
            className="group bg-surface border border-surface-stroke rounded-lg px-4 py-3"
          >
            <summary className="flex items-center gap-3 cursor-pointer list-none font-body-md text-body-md text-on-surface font-medium [&::-webkit-details-marker]:hidden select-none">
              <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">
                {s.icon}
              </span>
              <span className="flex-1">{s.title}</span>
              <span className="material-symbols-outlined text-text-dimmed text-[20px] transition-transform group-open:rotate-180 flex-shrink-0">
                expand_more
              </span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
              {s.body}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}