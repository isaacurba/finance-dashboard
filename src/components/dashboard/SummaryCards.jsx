import React from "react";
import { Card } from "../ui/card";

const metrics = [
  {
    title: "Total Invoice",
    value: "₦5240.21",
    iconBg: "bg-[#45484D]", // dark icon background
    icon: "/assets/wallet3.png",
    cardBg: "bg-[#2F3237] text-white", // full dark card
  },
  {
    title: "Amount Paid",
    value: "₦250.80",
    iconBg: "bg-gray-100",
    icon: "/assets/wallet2.png",
    cardBg: "bg-gray-50 text-gray-900", // light gray
  },
  {
    title: "Pending Payment",
    value: "₦550.25",
    iconBg: "bg-gray-100",
    icon: "/assets/wallet1.png",
    cardBg: "bg-gray-50 text-gray-900", // light gray
  },
  {
    title: "Total VAT Collected",
    value: "₦550.25",
    iconBg: "bg-gray-100",
    icon: "/assets/wallet1.png",
    cardBg: "bg-gray-50 text-gray-900", // light gray
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className={`relative p-6 rounded-xl shadow-sm border border-gray-200 ${metric.cardBg}`}
        >
          <div className="flex gap-5 items-center">
            <div>
              <img src={metric.icon} alt="icon" />
            </div>

            <div>
              {/* Title */}
              <p
                className={`text-sm font-medium ${
                  metric.cardBg.includes("text-white")
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {metric.title}
              </p>

              {/* Value */}
              <h2 className="text-2xl font-bold mt-1">{metric.value}</h2>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
