// src/dashboard/ChartSection.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Mock data for Working Capital
const data = [
  { date: "Apr 14", income: 5000, expenses: 7000 },
  { date: "Apr 15", income: 7200, expenses: 6400 },
  { date: "Apr 16", income: 4800, expenses: 7500 },
  { date: "Apr 17", income: 5500, expenses: 6800 },
  { date: "Apr 18", income: 4200, expenses: 6200 },
  { date: "Apr 19", income: 4700, expenses: 5600 },
  { date: "Apr 20", income: 5200, expenses: 5900 },
];

const timeRanges = ["Last 7 days", "Last 30 days", "This month"];

export default function ChartSection() {
  const [timeRange, setTimeRange] = useState("Last 7 days");

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Working Capital
        </CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px] h-8 text-sm">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            {/* Light grid lines */}
            <CartesianGrid stroke="#f9f9f9" vertical={false} />

            {/* X and Y axis */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              domain={[0, 10000]}
              tickFormatter={(v) => `${v / 1000}K`}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                stroke: "#E5E7EB",
                strokeWidth: 30,
                opacity: 0.3,
              }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "6px 10px",
              }}
              formatter={(value) => [`₦${value.toLocaleString()}`]}
              labelStyle={{ color: "#111827", fontWeight: "500" }}
            />

            {/* Legend */}
            <Legend
              verticalAlign="top"
              align="center"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 10,
                fontSize: 12,
              }}
            />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#00C49F"
              strokeWidth={3}
              dot={false}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#C8EE44"
              strokeWidth={3}
              dot={false}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
