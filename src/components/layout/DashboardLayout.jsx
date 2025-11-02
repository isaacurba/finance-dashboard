import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import SummaryCards from "../dashboard/SummaryCards";
import ChartSection from "../dashboard/ChartSection";
import InvoiceTable from "../dashboard/InvoiceTable";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-50">
      {/* FIXED: Removed extra div — sidebar direct child, no push */}
      <Sidebar toggleSidebar={isSidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col md:pl-64"> {/* Responsive padding for medium screens and above */}
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-6 space-y-6">
          <SummaryCards />
          <ChartSection />
          <InvoiceTable />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;