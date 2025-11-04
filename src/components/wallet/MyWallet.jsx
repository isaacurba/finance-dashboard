import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const payments = [
  {
    id: 1,
    name: "Payoneer",
    date: "20 Apr 2022, 06:55 PM",
    amount: "+$4800.24",
    icon: "/assets/payoneer.png",
  },
  {
    id: 2,
    name: "Remitly",
    date: "18 Apr 2022, 08:58 PM",
    amount: "-$1800.24",
    icon: "/assets/remitly.png",
  },
  {
    id: 3,
    name: "Wise",
    date: "15 Apr 2022, 02:55 AM",
    amount: "-$24.32",
    icon: "/assets/wise.png",
  },
  {
    id: 4,
    name: "Paypal",
    date: "14 Apr 2022, 07:40 PM",
    amount: "-$400.32",
    icon: "/assets/paypal.png",
  },
];

const upcomingPayments = [
  {
    id: 5,
    name: "Facebook Ads",
    date: "20 Apr 2022, 06:55 PM",
    amount: "$400.00",
    icon: "/assets/facebook.png",
  },
];

export default function MyWallets() {
  const [tab, setTab] = useState("all");

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left: Wallet Info */}
      <div className="w-full md:w-1/3 space-y-6">
        {/* Wallet Card */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl shadow-md">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-70">Maglo. | Universal Bank</p>
              </div>
              <img
                src="/assets/wifi-signal.png"
                alt="Contactless"
                className="h-5 opacity-70"
              />
            </div>
            <div className="text-2xl tracking-widest font-mono">
              5495 3379 2321
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-80">Maglo. | Commercial Bank</p>
              <img src="/assets/visa.png" alt="Visa" className="h-7" />
            </div>
            <p className="text-lg font-semibold mt-2">85952548****</p>
            <p className="text-xs opacity-70">09/25</p>
          </CardHeader>
        </Card>

        {/* Wallet Summary */}
        <Card className="rounded-2xl border border-gray-200 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Your Balance</p>
              <p className="text-lg font-semibold">$5240.00</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-500 font-medium">↑ 23.65%</span>
              <span className="text-red-500 font-medium">↓ 10.40%</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Currency</span>
              <span>USD / US Dollar</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Status</span>
              <span>Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Payments */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">My Payments</h2>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#C8EE44] focus:outline-none"
          />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-gray-100 rounded-lg mb-4">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              All Payments
            </TabsTrigger>
            <TabsTrigger
              value="regular"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Regular Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Today Payments */}
            <h3 className="text-gray-500 text-sm mb-3">Today</h3>
            <div className="space-y-3">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.icon}
                      alt={p.name}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.date}</p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${
                      p.amount.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {p.amount}
                  </p>
                </div>
              ))}
            </div>

            {/* Upcoming Payments */}
            <h3 className="text-gray-500 text-sm mt-6 mb-3">
              Upcoming Payments
            </h3>
            <div className="space-y-3">
              {upcomingPayments.map((u) => (
                <div
                  key={u.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={u.icon}
                      alt={u.name}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">{u.amount}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regular">
            <div className="text-gray-500 text-sm p-6 text-center">
              No regular payments found.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
