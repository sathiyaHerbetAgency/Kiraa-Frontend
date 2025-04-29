export function ActivityTimeline({ activities }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-6">Activities</h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex">
            {activity.type === "sent" ? (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            ) : (
              <img
                src={activity.user.avatar || "/placeholder.svg"}
                alt={activity.user.name}
                className="h-10 w-10 rounded-full mr-4"
              />
            )}

            <div>
              <div className="flex items-center">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mr-2">
                  {activity.date}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>

              {activity.type === "created" && (
                <p className="mt-1 text-sm">
                  <span className="font-medium">{activity.user.name}</span> created invoice{" "}
                  {activity.invoiceNumber || "N41-0220"}
                </p>
              )}

              {activity.type === "edited" && (
                <p className="mt-1 text-sm">
                  <span className="font-medium">{activity.user.name}</span> edited invoice{" "}
                  {activity.invoiceNumber || "N41-0220"}
                </p>
              )}

              {activity.type === "sent" && (
                <p className="mt-1 text-sm">
                  Invoice {activity.invoiceNumber || "N41-0220"} was sent to{" "}
                  <span className="font-medium">{activity.recipient}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
