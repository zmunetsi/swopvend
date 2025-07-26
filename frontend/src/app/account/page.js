'use client'

import { useContext } from "react";
import { ServerAuthContext } from "@/context/ServerAuthContext";
import Link from "next/link";

export default function AccountHome() {
  const user = useContext(ServerAuthContext);
  const notifications = (user?.notifications || []).filter(n => n.channel === "inapp");
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="p-5">
      <h2>Welcome, {user?.first_name || user?.username || "Trader"}!</h2>
      <div className="my-4 flex gap-4 flex-wrap">
        <div className="surface-section border-round shadow-1 p-4 flex-1">
          <div className="font-bold text-lg mb-2">Your Stats</div>
          <div>Items listed: <b>{user?.items?.length ?? 0}</b></div>
          <div>Unread notifications: <b>{unreadCount}</b></div>
          {/* Add more stats as needed */}
        </div>
        <div className="surface-section border-round shadow-1 p-4 flex-1">
          <div className="font-bold text-lg mb-2">Quick Actions</div>
          <Link href="/account/items" className="block mb-2">View My Items</Link>
          <Link href="/account/items/new" className="block mb-2">Add New Item</Link>
          <Link href="/account/notifications" className="block">View Notifications</Link>
        </div>
      </div>
      <div className="surface-section border-round shadow-1 p-4 mt-4">
        <div className="font-bold text-lg mb-2">Recent Notifications</div>
        {notifications.length === 0 ? (
          <div>No notifications yet.</div>
        ) : (
          <ul>
            {notifications.slice(0, 5).map(n => (
              <li key={n.id} className={!n.is_read ? "font-bold" : ""}>
                {n.verb} - {n.description}
              </li>
            ))}
          </ul>
        )}
        <Link href="/account/notifications" className="block mt-2 text-primary">See all notifications</Link>
      </div>
    </div>
  );
}