import io from "socket.io-client";
import events from "events";

export class ChatSocketService {
  socket;

  eventEmitter = new events.EventEmitter();

  // Connecting to Socket Server
  establishSocketConnection(userId) {
    try {
      this.socket = io("https://da96-188-43-14-13.eu.ngrok.io", {
        query: {
          userId // `userId=${userId}`
        }
      });
    } catch (error) {
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  getChatList(userId) {
    if (this.socket) {
      this.socket.emit("chat-list", {
        userId
      });
      this.socket.on("chat-list-response", (data) => {
        this.eventEmitter.emit("chat-list-response", data);
      });
    }
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit("add-message", message);
    }
  }

  receiveMessage() {
    if (this.socket) {
      this.socket.on("add-message-response", (data) => {
        this.eventEmitter.emit("add-message-response", data);
      });
    }
  }

  logout(userId) {
    if (this.socket) {
      this.socket.emit("logout", userId);
      this.socket.on("logout-response", (data) => {
        this.eventEmitter.emit("logout-response", data);
      });
    }
  }
}

export default new ChatSocketService();
