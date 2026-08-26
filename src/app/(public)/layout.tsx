import TopNavBar from "@/components/shared/TopNavBar";
import Footer from "@/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow flex flex-col items-center w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
