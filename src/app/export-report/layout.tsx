import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FXM Trade Keeper Reports",
};

export default function ExportReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white print:bg-white py-8 px-4 md:px-8">
      {children}
    </div>
  );
}