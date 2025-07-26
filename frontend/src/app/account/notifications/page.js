"use client";

import { useContext, useState } from "react";
import { ServerAuthContext } from "@/context/ServerAuthContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { markNotificationAsRead } from "@/services/notificationService"; // You need to implement this API call

export default function NotificationsPage() {
  const user = useContext(ServerAuthContext);
  // Only show in-app notifications
  const [notifications, setNotifications] = useState(
    (user?.notifications || []).filter((n) => n.channel === "inapp")
  );

  const rowClassName = (rowData) => ({
    "bg-yellow-50": !rowData.is_read,
  });

  // Handler to mark a notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );
    } catch (e) {
      // Optionally show error
    }
  };

  // Button template for each row
  const markAsReadBody = (rowData) =>
    !rowData.is_read ? (
      <Button
        label="Mark as read"
        size="small"
        onClick={() => handleMarkAsRead(rowData.id)}
        className="p-button-text p-button-sm"
      />
    ) : (
      <span className="text-xs text-success">Read</span>
    );

  return (
    <div className="p-5">
      <h2 className="mb-4">Notifications</h2>
      <DataTable
        value={notifications}
        rowClassName={rowClassName}
        emptyMessage="No notifications found."
        className="surface-section border-round shadow-1"
        paginator
        rows={10}
        responsiveLayout="scroll"
      >
        <Column
          field="verb"
          header="Type"
          body={(rowData) => <span className="font-bold">{rowData.verb}</span>}
        />
        <Column field="description" header="Description" />
        <Column
          field="created_at"
          header="Date"
          body={(rowData) => (
            <span className="text-xs text-500">
              {new Date(rowData.created_at).toLocaleString()}
            </span>
          )}
        />
        <Column
          header="Action"
          body={markAsReadBody}
          style={{ width: "140px" }}
        />
      </DataTable>
    </div>
  );
}