"use client"

import { LayoutGrid, List } from "lucide-react"

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => setActiveTab("board")}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
          activeTab === "board" ? "bg-gray-200 font-medium" : "bg-white border border-gray-300"
        }`}
      >
        <LayoutGrid size={16} />
        <span>Board</span>
      </button>
      <button
        onClick={() => setActiveTab("list")}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
          activeTab === "list" ? "bg-gray-200 font-medium" : "bg-white border border-gray-300"
        }`}
      >
        <List size={16} />
        <span>List</span>
      </button>
    </div>
  )
}

