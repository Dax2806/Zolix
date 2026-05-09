import { useEffect, useState } from "react";

import { Bell } from "lucide-react";

import socket from "../../lib/socket";

import {
  getNotifications,
  markAsRead,
} from "../../features/notifications/services/notification.service";

import useAuth from "../../hooks/useAuth";

const NotificationBell = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  // FETCH + SOCKET INIT
  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();

        if (isMounted) {
          setNotifications(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();

    // JOIN SOCKET ROOM
    const userId = user?._id || user?.id;

    if (userId) {
      socket.emit("join", userId);
    }

    // REAL-TIME LISTENER
    const handleNewNotification = (notification) => {
      setNotifications((prev) => [
        notification,
        ...prev,
      ]);
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      isMounted = false;
      socket.off("notification:new", handleNewNotification);
    };
  }, [user]);

  // MARK AS READ
  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
            n._id === id
              ? { ...n, isRead: true }
              : n
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2"
      >
        <Bell />

        {/* RED DOT */}
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-lg z-50">
          {/* HEADER */}
          <div className="p-4 font-semibold border-b">
            Notifications
          </div>

          {/* LIST */}
          <div className="max-h-96 overflow-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">
                No notifications yet
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleRead(n._id)}
                  className={`p-4 border-b cursor-pointer transition ${
                    n.isRead ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <p className="font-medium">{n.title}</p>

                  <p className="text-sm text-slate-500">
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
