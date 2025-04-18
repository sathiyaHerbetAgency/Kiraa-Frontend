export default function StatusBadge({ status }) {
    const getStatusStyles = () => {
      switch (status.toLowerCase()) {
        case "draft":
          return "bg-gray-200 text-gray-800"
        case "todo":
          return "bg-blue-100 text-blue-800"
        case "in progress":
          return "bg-orange-100 text-orange-800"
        case "done":
          return "bg-green-100 text-green-800"
        case "overdue":
          return "bg-red-100 text-red-800"
        case "paid":
          return "bg-green-100 text-green-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    return <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyles()}`}>{status}</span>
  }
  
  