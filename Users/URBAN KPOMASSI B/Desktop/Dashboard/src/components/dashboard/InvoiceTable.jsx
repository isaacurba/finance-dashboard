import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { getInvoices } from "../lib/invoiceService"; // ✅ Import service to fetch real data

const StatusBadge = ({ status }) => {
  const colorClass =
    status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-orange-100 text-orange-800";
  return (
    <Badge variant="secondary" className={`${colorClass} text-xs px-2 py-1 rounded-md`}>
      {status === "pending" ? "Pending" : "Paid"}
    </Badge>
  );
};

const ActionButton = ({ onClick }) => (
  <Button variant="ghost" size="sm" onClick={onClick} className="h-6 w-6 p-0">
    <MoreHorizontal className="h-3 w-3" />
  </Button>
);

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState([]); // ✅ State for real invoices
  const [loading, setLoading] = useState(true); // ✅ Loading state

  // ✅ Fetch real invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
        toast.error("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleAction = (id) => {
    toast.info(`Action clicked on invoice ${id} (UI only)`);
  };

  // Show only 3 recent invoices
  const recentInvoices = invoices.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Recent Invoices</h2>
        <a
          href="/invoices"
          className="text-sm text-[#C8EE44] font-medium hover:underline"
        >
          View all
        </a>
      </div>

      <div className="rounded-md border bg-white overflow-x-auto">
        <Table className="min-w-[700px]">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading invoices...
                </TableCell>
              </TableRow>
            ) : (
              recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={invoice.avatar || "/assets/default-avatar.png"}
                        alt={invoice.clientName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{invoice.clientName}</div>
                        <div className="text-xs text-gray-500">{invoice.invoiceID}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.items[0]?.orderTypeName || "Standard"}</TableCell>
                  <TableCell className="text-right">
                    ₦{invoice.total?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status?.toLowerCase()} />
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionButton onClick={() => handleAction(invoice.id)} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
