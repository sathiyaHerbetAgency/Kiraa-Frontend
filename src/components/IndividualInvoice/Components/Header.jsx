"use client"

import { Search, Filter, ArrowUpDown, Plus } from "lucide-react"

export default function Header({ title, searchQuery, setSearchQuery }) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm">
          <Plus size={16} />
          <span>Create New Invoice</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-sm">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-sm">
            <ArrowUpDown size={14} />
            <span>Sort</span>
          </button>
        </div>
      </div>
    </div>
  )
}

