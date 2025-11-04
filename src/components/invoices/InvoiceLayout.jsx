import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import FullInvoiceTable from "./FullInvoiceTable";

const InvoiceLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Scrollable content section */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <FullInvoiceTable />
        </main>
      </div>
    </div>
  );
};

export default InvoiceLayout;
