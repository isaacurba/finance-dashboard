import React from "react";
import Sidebar from "../dashboard/Sidebar";
import SummaryCards from "../dashboard/SummaryCards";
import ChartSection from "../dashboard/ChartSection";
import InvoiceTable from "../dashboard/InvoiceTable";
import Navbar from "../dashboard/Navbar";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />   

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />
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
