import http from "http";
import { initSocket } from "./server";

const PORT = 3001;

const server = http.createServer((_, res) => {
  res.writeHead(200);
  res.end("Socket.IO Server Running");
});

initSocket(server);

server.listen(PORT, () => {
  console.log(`✅ Socket.IO running on http://localhost:${PORT}`);
});