// src/dashboard/InvoiceTable.jsx
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; // Adjust path to shadcn ui
import { Badge } from "../ui/badge"; // shadcn badge for status
import { Button } from "../ui/button"; // shadcn button for actions
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // shadcn select for filter
import { MoreHorizontal } from "lucide-react"; // Icon for action menu (npm i lucide-react if not)

// Fake invoices data from Figma/PDF (replace with real from Appwrite later)
const fakeInvoices = [
  {
    id: 1,
    client: "Gadget Gallery Ltd",
    invoiceNumber: "Inv MGL5474",
    avatar: "/assets/avatar1.png", // Add your avatar images to public/assets/
    date: "14 Apr 2022 at 8:00 PM",
    orderType: 20,
    amount: 5420.84,
    status: "pending",
  },
  {
    id: 2,
    client: "Gadget Gallery Ltd",
    invoiceNumber: "Inv MGL5474",
    avatar: "/assets/avatar1.png",
    date: "14 Apr 2022 at 8:00 PM",
    orderType: 20,
    amount: 5420.84,
    status: "pending",
  },
  {
    id: 3,
    client: "Gadget Gallery Ltd",
    invoiceNumber: "Inv MGL5474",
    avatar: "/assets/avatar1.png",
    date: "14 Apr 2022 at 8:00 PM",
    orderType: 20,
    amount: 5420.84,
    status: "pending",
  },
];

// Status badge component (orange for pending, green for paid)
const StatusBadge = ({ status }) => (
  <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md">
    {status === "pending" ? "Pending" : "Paid"}
  </Badge>
);

// Action button (three dots from Figma)
const ActionButton = ({ onClick }) => (
  <Button variant="ghost" size="sm" onClick={onClick} className="h-6 w-6 p-0">
    <MoreHorizontal className="h-3 w-3" />
  </Button>
);

export default function InvoiceTable() {
  const [filter, setFilter] = useState("all"); // State for filter dropdown

  // Fake filter logic (replace with real later)
  const filteredInvoices = fakeInvoices.filter((inv) => {
    if (filter === "all") return true;
    return inv.status === filter;
  });

  // Fake action (replace with real edit/delete/mark paid later)
  const handleAction = (id) => {
    console.log(`Action clicked on invoice ${id}`); // Fake
    alert(`Action clicked on invoice ${id} (UI only)`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Recent Invoice</h2>
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

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">NAME/CLIENT</TableHead>
              <TableHead className="text-left">DATE</TableHead>
              <TableHead className="text-left">ORDER TYPE</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead className="text-left">STATUS</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-b border-gray-200"> {/* FIXED: border-b + py-4 for row gap/spacing */}
                <TableCell className="py-4 px-3"> {/* FIXED: py-4 for vertical gap, px-3 for horizontal */}
                  <div className="flex items-center gap-3">
                    <img
                      src={invoice.avatar}
                      alt={invoice.client}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">{invoice.client}</div>
                      <div className="text-xs text-gray-500">{invoice.invoiceNumber}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-3">{invoice.date}</TableCell>
                <TableCell className="py-4 px-3">{invoice.orderType}</TableCell>
                <TableCell className="py-4 px-3 text-right">₦{invoice.amount.toLocaleString()}</TableCell>
                <TableCell className="py-4 px-3"><StatusBadge status={invoice.status} /></TableCell>
                <TableCell className="py-4 px-3 text-right">
                  <ActionButton onClick={() => handleAction(invoice.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredInvoices.length === 0 && (
        <p className="text-center text-gray-500 py-8">No invoices found.</p>
      )}
    </div>
  );
}