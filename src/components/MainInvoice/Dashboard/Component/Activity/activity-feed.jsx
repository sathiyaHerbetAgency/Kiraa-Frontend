/* eslint-disable */

export default function ActivityFeed({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

function ActivityItem({ activity }) {
  const { id, user, action, subject, target, time } = activity

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200">
      {user ? (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 text-center">
           <p className="text-center p-2">a</p>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
            {subject.charAt(0)}
          </div>
        </div>
      )}

      <div className="flex-1">
        <div className="text-sm">
          {user && <span className="font-medium">{user.name} </span>}
          <span>{action} </span>
          <span className="font-medium">{subject} </span>
          {target && (
            <span>
              to <span className="font-medium">{target}</span>
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
    </div>
  )
}

