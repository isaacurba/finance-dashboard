// src/dashboard/FullInvoiceTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { invoices } from "../data/invoices"; // make sure this file exists
import { useNavigate } from "react-router-dom"; // hook for navigation

// ✅ Status badge component
const StatusBadge = ({ status }) => {
  const colorClass =
    status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-orange-100 text-orange-800";
  return (
    <Badge
      variant="secondary"
      className={`${colorClass} text-xs px-2 py-1 rounded-md`}
    >
      {status === "pending" ? "Pending" : "Paid"}
    </Badge>
  );
};

// ✅ Action button (three dots)
const ActionButton = ({ onClick }) => (
  <Button variant="ghost" size="sm" onClick={onClick} className="h-6 w-6 p-0">
    <MoreHorizontal className="h-3 w-3" />
  </Button>
);

// ✅ Fixed: removed invalid “type="text/javascript"” and properly declared map
const orderTypeMap = {
  10: "Standard",
  15: "Express",
  20: "Priority",
};
const getOrderTypeDescription = (type) => orderTypeMap[type] || "Unknown";

export default function FullInvoiceTable() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredInvoices = invoices.filter((inv) =>
    filter === "all" ? true : inv.status === filter
  );

  const handleAction = (id) => {
    toast.info(`Action clicked on invoice ${id}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">All Invoices</h2>

        {/* Middle: Search Input (always input, hidden on mobile) */}
        <div className="flex-1 max-w-md mx-4 hidden md:flex relative">
          {" "}
          {/* FIXED: flex-1 for centering, max-w-md to prevent overflow */}
          <img
            src="/assets/search.png"
            alt="Search icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" // FIXED: opacity for gray tint
          />
          <input
            type="search"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EE44] focus:border-transparent transition"
          />
        </div>

        <Button
          className="bg-[#C8EE44] text-gray-900 hover:bg-lime-300 flex items-center gap-2"
          onClick={() => navigate("/create-invoice")}
        >
          <img src="/assets/createinvoice.png" className="h-4 w-4" /> Create Invoice
        </Button>

        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">View All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CLIENT</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>ORDER TYPE</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={invoice.avatar}
                      alt={invoice.client}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {invoice.client}
                      </div>
                      <div className="text-xs text-gray-500">
                        {invoice.invoiceNumber}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  {getOrderTypeDescription(invoice.orderType)}
                </TableCell>
                <TableCell className="text-right">
                  ₦{invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionButton onClick={() => handleAction(invoice.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredInvoices.length === 0 && (
        <p className="text-center text-gray-500 py-8">No invoices found.</p>
      )}
    </div>
  );
}
