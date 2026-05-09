import { useEffect } from "react";

import AppRouter from "./routes/AppRouter";
import useAuth from "./hooks/useAuth";

import socket from "./lib/socket";

const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    const userId = user?._id || user?.id;

    if (!userId) return;

    // join user-specific socket room
    socket.emit("join", userId);

    return () => {
      // optional cleanup (safe disconnect from room context)
      socket.off("notification:new");
    };
  }, [user?._id, user?.id]);

  return (
    <AppRouter />
  );
};

export default App;
