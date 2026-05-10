import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-indigo-500 selection:text-white">
      {/* Subtle advanced background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent -z-10 pointer-events-none"></div>
      
      <Sidebar />

      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="lg:ml-64 flex flex-col min-h-screen relative z-10">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
