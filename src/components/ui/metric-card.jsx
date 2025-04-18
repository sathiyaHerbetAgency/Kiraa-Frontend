export default function MetricCard({ title, value, subtitle, color, mtd }) {
    const getColorClasses = (color) => {
      switch (color) {
        case "green":
          return "bg-green-100 text-green-600"
        case "red":
          return "bg-red-100 text-red-600"
        case "yellow":
          return "bg-yellow-100 text-yellow-600"
        case "purple":
          return "bg-purple-100 text-purple-600"
        default:
          return "bg-gray-100 text-gray-600"
      }
    }
  
    const colorClasses = getColorClasses(color)
  
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-gray-500">{title}</div>
          {mtd && <div className="text-xs text-gray-400">MTD</div>}
        </div>
  
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">{value}</div>
          {color !== "black" && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses}`}>
              {color === "green" && "S"}
              {color === "red" && "$"}
              {color === "yellow" && "$"}
              {color === "purple" && "#"}
            </div>
          )}
        </div>
  
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>
    )
  }
  
  