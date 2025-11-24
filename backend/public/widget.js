(function () {
  const scriptTag = document.currentScript;

  const config = {
    chatbotId: scriptTag.getAttribute("data-chatbot-id"),
    color: scriptTag.getAttribute("data-color") || "#0F62FE",
    businessName: scriptTag.getAttribute("data-business") || "Business Name",
    welcome: scriptTag.getAttribute("data-welcome") || "Hello! How can I help you?",
    position: scriptTag.getAttribute("data-position") || "right",
    shape: scriptTag.getAttribute("data-shape") || "round",
  };

  const container = document.createElement("div");
  const shadow = container.attachShadow({ mode: "open" });
  document.body.appendChild(container);

  // --- Chat bubble ---
  const bubble = document.createElement("button");
  bubble.className = "bubble";
  bubble.innerHTML = "💬";

  // --- Chat window ---
  const chatWindow = document.createElement("div");
  chatWindow.className = "chat-window";
  chatWindow.style.display = "none";

  chatWindow.innerHTML = `
    <div class="header">
      <div class="title">${config.businessName}</div>
      <div class="subtitle">Typically replies instantly</div>
    </div>
    <div class="messages" id="messages">
      <div class="msg-bot">${config.welcome}</div>
    </div>
    <div class="input-area">
      <input id="chatInput" placeholder="Type your message..." />
      <button id="sendBtn">Send</button>
    </div>
  `;

  shadow.appendChild(bubble);
  shadow.appendChild(chatWindow);

  const style = document.createElement("style");
  style.textContent = `
    .bubble {
      width: 64px;
      height: 64px;
      background: ${config.color};
      color: white;
      font-size: 29px;
      border-radius: ${config.shape === "round" ? "50%" : "12px"};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: fixed;
      bottom: 20px;
      ${config.position}: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      border: none;
      transition: transform .15s;
    }

    .bubble:hover {
      transform: scale(1.1);
    }

    .chat-window {
      width: 360px;
      height: 400px;
      background: #ffffff;
      position: fixed;
      bottom: 100px;
      ${config.position}: 20px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.18);
      font-family: system-ui, sans-serif;
    }

    .header {
      background: ${config.color};
      padding: 14px;
      color: white;
    }

    .title {
      font-weight: 600;
      font-size: 15px;
    }

    .subtitle {
      font-size: 11px;
      opacity: 0.85;
      margin-top: 2px;
    }

    .messages {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f8f8f8;
    }

    .msg-bot {
      background: ${config.color}20;
      padding: 10px;
      border-radius: 10px;
      max-width: 75%;
      font-size: 14px;
    }

    .msg-user {
      background: #e5e5e5;
      padding: 10px;
      border-radius: 10px;
      max-width: 75%;
      align-self: flex-end;
      font-size: 14px;
    }

    .input-area {
      display: flex;
      border-top: 1px solid #ddd;
    }

    .input-area input {
      flex: 1;
      padding: 10px;
      border: none;
      outline: none;
      font-size: 14px;
    }

    .input-area button {
      background: ${config.color};
      color: white;
      border: none;
      padding: 0 18px;
      font-size: 14px;
      cursor: pointer;
    }
  `;

  shadow.appendChild(style);

  // toggle window
  bubble.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
  };

  // send message
  async function sendMessage() {
    const input = shadow.getElementById("chatInput");
    const messages = shadow.getElementById("messages");
    const text = input.value.trim();

    if (!text) return;

    const user = document.createElement("div");
    user.className = "msg-user";
    user.textContent = text;
    messages.appendChild(user);

    input.value = "";

    const res = await fetch("http://localhost:3001/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatbot_id: config.chatbotId,
        message: text
      })
    });

    const data = await res.json();

    const bot = document.createElement("div");
    bot.className = "msg-bot";
    bot.textContent = data.reply || "Sorry, I couldn't understand.";
    messages.appendChild(bot);

    messages.scrollTop = messages.scrollHeight;
  }

  shadow.getElementById("sendBtn").onclick = sendMessage;
  shadow.getElementById("chatInput").addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
})();
