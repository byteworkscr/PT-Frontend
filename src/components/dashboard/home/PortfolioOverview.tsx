"use client";

import { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", digital: 4000, physical: 2400, total: 6400 },
  { name: "Feb", digital: 3000, physical: 2500, total: 5500 },
  { name: "Mar", digital: 5000, physical: 2600, total: 7600 },
  { name: "Apr", digital: 7800, physical: 2900, total: 10700 },
  { name: "May", digital: 5500, physical: 3100, total: 8600 },
  { name: "Jun", digital: 6000, physical: 3300, total: 9300 },
  { name: "Jul", digital: 8200, physical: 3500, total: 11700 },
  { name: "Aug", digital: 9000, physical: 3700, total: 12700 },
  { name: "Sep", digital: 11000, physical: 3900, total: 14900 },
  { name: "Oct", digital: 9800, physical: 4100, total: 13900 },
  { name: "Nov", digital: 12000, physical: 4300, total: 16300 },
  { name: "Dec", digital: 14000, physical: 4500, total: 18500 },
];

export function PortfolioOverview() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where you would initialize any chart-specific functionality
    // For example, handling resize events or custom tooltips
  }, []);

  return (
    <div ref={chartRef} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              color: "white",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="digital"
            stroke="#0291fc"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="physical"
            stroke="#c46be3"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
