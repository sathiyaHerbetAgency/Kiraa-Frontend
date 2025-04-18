"use client"

import { List, LayoutGrid } from "lucide-react"

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <button
        className={`px-3 py-1.5 flex items-center ${activeView === "list" ? "bg-gray-100" : "bg-white"}`}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4 mr-1" />
        <span className="text-sm">List</span>
      </button>
      <button
        className={`px-3 py-1.5 flex items-center ${activeView === "board" ? "bg-gray-100" : "bg-white"}`}
        onClick={() => onViewChange("board")}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        <span className="text-sm">Board</span>
      </button>
    </div>
  )
}

