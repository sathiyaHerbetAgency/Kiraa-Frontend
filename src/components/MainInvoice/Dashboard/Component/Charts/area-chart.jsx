"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 5000 },
  { name: "Feb", value: 9000 },
  { name: "Mar", value: 12000 },
  { name: "Apr", value: 18000 },
  { name: "May", value: 14000 },
  { name: "Jun", value: 20000 },
  { name: "Jul", value: 22000 },
]

export function AreaChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
            dx={-10}
            domain={[0, 30000]}
            ticks={[0, 10000, 20000, 30000]}
          />
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="value" stroke="none" fill="url(#colorValue)" fillOpacity={0.2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
