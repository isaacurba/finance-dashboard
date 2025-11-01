// src/dashboard/SummaryCards.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Adjust path to shadcn ui

const metrics = [
  {
    title: "Total Invoices",
    value: "₦5,240.21", 
    icon: "/assets/wallet1.png",
    color: "text-gray-900",
    bg: "bg-white",
  },
  {
    title: "Amount Paid",
    value: "₦250.80", 
    icon: "/assets/wallet2.png",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Pending Payment",
    value: "₦550.25", 
    icon: "/assets/wallet3.png", 
    color: "text-orange-600",
    bg: "bg-orange-50",
  }
  // {
  //   title: "VAT Collected",
  //   value: "₦375.00", 
  //   icon: "/assets/vat-icon.png",
  //   color: "text-purple-600",
  //   bg: "bg-purple-50",
  // },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {/* Responsive: stack mobile, 2x2 tablet, 4 col desktop */}
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className={`shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${metric.bg}`}
        >
          {/* Figma: light bg for positive, white default */}
          <CardHeader className="pb-2">
            {/* Compact header */}
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">
                {metric.title}
              </CardTitle>
              {/* FIXED: Use <img> for image path, not <metric.icon /> (string error) */}
              <img
                src={metric.icon}
                alt={`${metric.title} icon`}
                className={`h-4 w-4 ${metric.color}`}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Value below, large bold */}
            <div className={`text-3xl font-bold ${metric.color}`}>
              {metric.value}
            </div>
            {/* Big numbers like Figma */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}