"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Rent", value: 2500 },
  { name: "Utilities", value: 1200 },
  { name: "Salaries", value: 5000 },
  { name: "Marketing", value: 1800 },
  { name: "Insurance", value: 900 },
  { name: "Supplies", value: 600 },
  { name: "Other", value: 1000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FCCDE5"]

export function DonutChart() {
  return (
    <div className="h-[200px] flex w-[100%]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span>{item.name}</span>
            <span className="ml-auto font-medium">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
