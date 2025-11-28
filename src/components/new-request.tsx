import React from "react";

interface Props {
  requests: any;
}
function NewRequest({ requests }: Props) {
  return (
    <div className="space-y-4">
      {requests.map((activity: any, i: number) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-border last:border-0"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {activity.guestName}
            </p>
            <p className="text-xs text-muted-foreground">
              Room {activity.room} - {activity.description}
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">
              {activity.submittedAt}
            </p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === "completed"
                  ? "bg-green-50 text-green-700 border border-green-500"
                  : activity.status === "in-progress"
                    ? "bg-orange-50 text-orange-700 border border-orange-500"
                    : "bg-sky-50 text-sky-700 border border-sky-500"
              }`}
            >
              {activity.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewRequest;
