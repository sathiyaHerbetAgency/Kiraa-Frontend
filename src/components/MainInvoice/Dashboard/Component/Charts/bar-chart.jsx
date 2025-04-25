"use client"

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 7500 },
  { name: "Mar", value: 6000 },
  { name: "Apr", value: 9500 },
  { name: "May", value: 8000 },
  { name: "Jun", value: 12000 },
  { name: "Jul", value: 10000 },
]

export function BarChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
            dx={-10}
            domain={[0, 20000]}
            ticks={[0, 10000, 20000]}
          />
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
          <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
