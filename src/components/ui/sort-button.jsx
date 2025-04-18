import { ArrowUpDown } from "lucide-react"

export default function SortButton() {
  return (
    <button className="px-4 py-2 border rounded-md flex items-center gap-2 bg-white hover:bg-gray-50">
      <ArrowUpDown className="h-4 w-4" />
      <span className="text-sm">Sort</span>
    </button>
  )
}