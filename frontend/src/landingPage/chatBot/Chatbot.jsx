import React, { useState } from "react";
import "./chatbot.css";
import Icon from '@mdi/react';
import { mdiRobotHappy } from '@mdi/js';



function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    // Send message to the backend
    const res = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="chatbot-button" onClick={() => setOpen(!open)} title="Open SafeHer Chatbot">
        {/* <i class="fa-regular fa-comment"></i> */}
        <Icon path={mdiRobotHappy} size={1} />
      </div>

      {/* Chatbox Window */}
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <i className="bi bi-robot me-2"></i> SafeHer Assistant
            <span className="close-btn" onClick={() => setOpen(false)}>&times;</span>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
                <div className="system-message">Ask me anything about safety, wellness, or legal resources!</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`message-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input-field"
            />
            <button onClick={sendMessage} className="chat-send-btn">
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;