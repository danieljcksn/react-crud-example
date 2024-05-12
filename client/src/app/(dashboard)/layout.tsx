import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <div className="w-full py-1 border-b">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
