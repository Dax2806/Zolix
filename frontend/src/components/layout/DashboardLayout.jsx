import {
  useState,
} from "react";

import Sidebar
  from "./Sidebar";

import Header
  from "./Header";

import MobileSidebar
  from "./MobileSidebar";


const DashboardLayout = ({
  children,
}) => {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
    "
    >
      <Sidebar />

      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="lg:ml-64">
        <Header
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main
          className="
          p-4
          sm:p-6
          lg:p-8
        "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
