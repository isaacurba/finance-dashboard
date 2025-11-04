import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import SummaryCards from "../dashboard/SummaryCards";
import ChartSection from "../dashboard/ChartSection";
import InvoiceTable from "../dashboard/InvoiceTable";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden"> {/* Prevent entire page scroll */}
      {/* Sidebar (fixed desktop, toggle on mobile) */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden"> {/* Prevent main area scroll */}
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-6 overflow-y-auto h-full"> {/* Allow only content scroll */}
            <SummaryCards />
            <ChartSection />
            <InvoiceTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
