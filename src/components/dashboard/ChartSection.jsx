// src/dashboard/ChartSection.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Adjust path to shadcn ui
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Recharts for line chart
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // shadcn select for filter

// Fake data from Figma (Working Capital: Income green, Expenses yellow, dates Apr 14-20, values in $ or ₦)
const fakeData = [
  { date: "Apr 14", income: 4000, expenses: 2400 },
  { date: "Apr 15", income: 3000, expenses: 1398 },
  { date: "Apr 16", income: 2000, expenses: 3800 },
  { date: "Apr 17", income: 2780, expenses: 3908 },
  { date: "Apr 18", income: 1890, expenses: 2900 },
  { date: "Apr 19", income: 2390, expenses: 3800 },
  { date: "Apr 20", income: 3490, expenses: 4300 },
];

// Fake filter (replace with real time range later)
const timeRanges = ["Last 7 days", "Last 30 days", "This month"];

export default function ChartSection() {
  const [timeRange, setTimeRange] = useState("Last 7 days"); // State for filter

  return (
    <Card className="bg-white shadow-sm border border-gray-200 rounded-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">Working Capital</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fakeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> {/* Grid lines */}
            <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} /> {/* X-axis dates */}
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} /> {/* Y-axis values */}
            <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Value"]} /> {/* Tooltip with ₦ format */}
            <Legend /> {/* Legend: Income/Expenses */}
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" /> {/* Green line for Income */}
            <Line type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} name="Expenses" /> {/* Yellow line for Expenses */}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}