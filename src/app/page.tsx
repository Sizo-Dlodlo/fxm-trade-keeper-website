import Hero from "@/components/home/Hero";
import ValueProposition from "@/components/home/ValueProposition";
import ScreenshotGallery from "@/components/home/ScreenshotGallery";
import KeyFeatures from "@/components/home/KeyFeatures";
import WhyLocal from "@/components/home/WhyLocal";
import DownloadCTA from "@/components/home/DownloadCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ScreenshotGallery />
      <KeyFeatures />
      <WhyLocal />
      <DownloadCTA />
    </>
  );
}
