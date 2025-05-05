import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Chatbot } from "../components/custom-components/Chatbot";
import chatbotStyles from "../components/custom-components/Chatbot.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { fetchChatbotConfig } from "../services/chatbotConfig";
import { initHeartbeatControl } from "@/services/hearbeat";

// Register the Web Component
class WebComponent extends HTMLElement {
  async connectedCallback() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const fingerprint = result.visitorId; // <- unique user ID
    // Save fingerprint in localStorage
    localStorage.setItem("chatbot-fingerprint", fingerprint);

    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    shadow.appendChild(div);

    // 🌟 Load external CSS
    const style = document.createElement("style");
    style.textContent = chatbotStyles;
    shadow.appendChild(style);

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "http://localhost:5000/index.css"); // Path from the 'public' folder
    shadow.appendChild(link);

    let config = await fetchChatbotConfig();

    const root = ReactDOM.createRoot(div);

    root.render(<Chatbot config={config} fingerprint={fingerprint} />);
  }
}

// Define the custom element if not already
if (!customElements.get("my-chatbot")) {
  customElements.define("my-chatbot", WebComponent);
}
initHeartbeatControl({
  heartbeatInterval: 2, // seconds
  inactivityLimit: 20, // seconds
  userId: "abc123",
  sessionId: "xyz456",
});
const allowedOrigins = [
  "https://yourmainsite.com",
  "https://app.yourmainsite.com",
  "http://localhost:3000",
  "",
];
const currentOrigin = window.location.origin;

// if (!allowedOrigins.includes(currentOrigin)) {
//   console.warn("Unauthorized domain. Chatbot will not be injected:", currentOrigin);
//   return;
// }

// 🛠️ Safe injection after page is loaded
window.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("my-chatbot")) {
    const chatbot = document.createElement("my-chatbot");
    document.body.appendChild(chatbot);
  }
});
