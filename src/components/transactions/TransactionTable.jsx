// src/transactions/TransactionTable.jsx
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: 1,
      icon: "/assets/iphone.png",
      name: "Iphone 13 Pro Max",
      business: "Apple Inc",
      type: "Mobile",
      amount: 1403.84,
      date: "14 Apr 2022",
      invoiceId: "MGL524877",
    },
    {
      id: 2,
      icon: "/assets/netflix.png",
      name: "Netflix Subscription",
      business: "Netflix",
      type: "Entertainment",
      amount: 120.0,
      date: "03 Apr 2022",
      invoiceId: "MGL524856",
    },
    {
      id: 3,
      icon: "/assets/figma.png",
      name: "Figma Subscription",
      business: "Figma",
      type: "Software",
      amount: 240.24,
      date: "08 Apr 2022",
      invoiceId: "MGL524863",
    },
    {
      id: 4,
      icon: "/assets/bitcoin.png",
      name: "Bitcoin Transaction",
      business: "Crypto",
      type: "Technology",
      amount: 5038.14,
      date: "07 Apr 2022",
      invoiceId: "MGL524844",
    },
    {
      id: 5,
      icon: "/assets/avatar.png",
      name: "Sajib Rahman",
      business: "Withdrawal",
      type: "Withdraw",
      amount: 500.89,
      date: "26 Mar 2022",
      invoiceId: "MGL524829",
    },
    {
      id: 6,
      icon: "/assets/instagram.png",
      name: "Instagram Ads",
      business: "Meta",
      type: "Entertainment",
      amount: 390.0,
      date: "30 Mar 2022",
      invoiceId: "MGL524837",
    },
    {
      id: 7,
      icon: "/assets/avatar.png",
      name: "UIHUT Subscription",
      business: "UIHUT",
      type: "Payment",
      amount: 346.0,
      date: "25 Mar 2022",
      invoiceId: "MGL524817",
    },
    {
      id: 8,
      icon: "/assets/invoice5.png",
      name: "Citi Bank Ltd",
      business: "City Bank",
      type: "Withdraw",
      amount: 3403.11,
      date: "24 Mar 2022",
      invoiceId: "MGL524811",
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header + Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <img
            src="/assets/search.png"
            alt="Search icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
          />
          <input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EE44] focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border bg-white overflow-x-auto shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME / BUSINESS</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>INVOICE ID</TableHead>
              <TableHead className="text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {t.icon && (
                        <img
                          src={t.icon}
                          alt={t.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {t.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.business}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>₦{t.amount.toLocaleString()}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.invoiceId}</TableCell>
                  <TableCell className="text-right">
                    <Button className="bg-[#C8EE44] text-gray-900 text-xs font-medium hover:bg-lime-300">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No matching transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
