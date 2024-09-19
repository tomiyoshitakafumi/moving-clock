"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  button.disabled = true;// 通信中は非活性化
  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.onmessage = (event) => {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = event.data;
    messageContainer.appendChild(messageElement);
    button.disabled = false;
  };
  eventSource.onopen = () => {
    console.log("Connection to server opened.");
  };
  eventSource.onclose = () => {
    console.log("Connection to server closed.");
  };
  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    eventSource.close();
  };
}
