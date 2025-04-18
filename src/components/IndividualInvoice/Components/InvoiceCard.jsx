import { Calendar, User } from "lucide-react"
import StatusBadge from "./StatusBadge"

export default function InvoiceCard({ invoice }) {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{invoice.invoiceNo}</span>
        <StatusBadge status={invoice.status} />
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{invoice.date}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <User size={12} />
          <span>Client: {invoice.client}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xs">Jan {invoice.dueDay}</span>
        </div>
        <div className="flex items-center justify-center size-6 bg-green-100 rounded-full">
          <span className="text-xs text-green-800">{invoice.initials}</span>
        </div>
      </div>
    </div>
  )
}

