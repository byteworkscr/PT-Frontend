export function Notifications() {
  const notifications = [
    {
      id: "1",
      title: "Portfolio Alert",
      message: "BTC price increased by 5% in the last 24 hours",
      time: "10 min ago",
      read: false,
    },
    {
      id: "2",
      title: "New Feature",
      message: "Try our new investment simulator",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Transaction Complete",
      message: "Your purchase of 0.5 ETH was successful",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "Advisory Update",
      message: "New investment opportunities in renewable energy",
      time: "Yesterday",
      read: true,
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-3 rounded-md ${
            notification.read
              ? "bg-black/20"
              : "bg-black/40 border-l-2 border-[#0291fc]"
          }`}
        >
          <div className="flex justify-between">
            <h4 className="font-medium">{notification.title}</h4>
            <span className="text-xs text-white/70">{notification.time}</span>
          </div>
          <p className="text-sm text-white/70 mt-1">{notification.message}</p>
        </div>
      ))}
      <button className="w-full text-center text-sm text-[#0291fc] hover:underline hover:text-gray-200 mt-2">
        View all notifications
      </button>
    </div>
  );
}
