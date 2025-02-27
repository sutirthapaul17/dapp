"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 900,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Apr",
    total: 800,
  },
  {
    name: "May",
    total: 1600,
  },
  {
    name: "Jun",
    total: 1200,
  },
  {
    name: "Jul",
    total: 2200,
  },
  {
    name: "Aug",
    total: 900,
  },
  {
    name: "Sep",
    total: 1900,
  },
  {
    name: "Oct",
    total: 1200,
  },
  {
    name: "Nov",
    total: 1000,
  },
  {
    name: "Dec",
    total: 1800,
  },
]

export function BalanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} className="fill-indigo-500" />
      </BarChart>
    </ResponsiveContainer>
  )
}

