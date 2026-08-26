import Link from "next/link";

export default function DownloadCTA() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="glass-card rounded-xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fxm-navy/20 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Ready to Take Control of Your Trading?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Download FXM Trade Keeper for free. Choose between the Windows
            Installer or the Portable Edition. No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/download"
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              Download Free
            </Link>
            <Link
              href="/features"
              className="bg-transparent border border-surface-stroke text-on-surface font-headline-md text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">info</span>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
