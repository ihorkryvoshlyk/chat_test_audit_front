import io from "socket.io-client";

// in development mode
// const socketUrl = "http://localhost:4000";
// in production mode
const socketUrl = "/";

const initSocket = (userId) =>
  io(socketUrl, {
    query: { userId }
  });

export default initSocket;
