"use client";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* No extra props needed */}
      <main className="flex-grow p-6 transition-all ml-64"> {/* Adjust margin if needed */}
        {children}
      </main>
    </div>
  );
}
