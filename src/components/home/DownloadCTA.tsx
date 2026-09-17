import Link from "next/link";
import { APP_URL } from "@/lib/site";

export default function DownloadCTA() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="glass-card rounded-xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fxm-navy/20 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Ready to Take Control of Your Trading?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Try the free web app — it works on Windows, macOS, Android and
            iPhone, offline, with no downloads and no warnings. Native desktop
            downloads also available for advanced users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">install_desktop</span>
              Try the Free Web App
            </a>
            <Link
              href="/features"
              className="bg-transparent border border-surface-stroke text-on-surface font-headline-md text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">info</span>
              Learn More
            </Link>
          </div>
          <p className="font-label-mono text-label-mono text-text-dimmed text-xs mt-4">
            Desktop download options:{" "}
            <Link href="/download#portable" className="text-primary">
              Portable
            </Link>{" "}
            · <Link href="/download#mac" className="text-primary">macOS</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
