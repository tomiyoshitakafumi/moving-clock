import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });
const initialMessage = {
  id: Date.now(),
  body: 'World'
};
wss.on("connection", (ws) => {
  ws.send(JSON.stringify(initialMessage));
  ws.on("message", (data) => {
      const message =　JSON.parse(data.toString());
      console.log("receive", message);
    });  
});
