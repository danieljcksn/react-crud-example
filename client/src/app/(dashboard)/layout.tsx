import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="w-full py-2 border-b">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
