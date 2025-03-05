"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard"); 

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {!isDashboard && <Header />}
      <main className="flex-grow max-w-6xl mx-auto p-6">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default LayoutWrapper;
