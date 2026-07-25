import { io } from "socket.io-client";

// The connection is started by the game flow, never while Next.js renders.
export const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001",
  {
    transports: ["websocket"],
    autoConnect: false,
  }
);
