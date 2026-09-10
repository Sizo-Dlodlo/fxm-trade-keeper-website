import Hero from "@/components/home/Hero";
import ValueProposition from "@/components/home/ValueProposition";
import ScreenshotGallery from "@/components/home/ScreenshotGallery";
import KeyFeatures from "@/components/home/KeyFeatures";
import WhyLocal from "@/components/home/WhyLocal";
import DownloadCTA from "@/components/home/DownloadCTA";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ScreenshotGallery />
      <KeyFeatures />
      <WhyLocal />
      <DownloadCTA />
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-1">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
              Stay in the loop
            </h2>
            <p className="font-body-md text-body-md text-text-dimmed">
              Get release updates, guides, and trading tips. No spam,
              unsubscribe anytime.
            </p>
          </div>
          <div className="w-full md:max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
