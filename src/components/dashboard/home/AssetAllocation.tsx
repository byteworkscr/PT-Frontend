"use client";

import { useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Crypto", value: 35 },
  { name: "Stocks", value: 25 },
  { name: "Real Estate", value: 20 },
  { name: "Commodities", value: 10 },
  { name: "Bonds", value: 10 },
];

const COLORS = ["#0291fc", "#c46be3", "#36A2EB", "#FFCE56", "#4BC0C0"];

export function AssetAllocation() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <div ref={chartRef} className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
