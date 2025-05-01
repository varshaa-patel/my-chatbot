import React, { useState } from "react";
import { InputAreaProps } from "../types";

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSendClick = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={disabled}
      />
      <button onClick={handleSendClick} disabled={disabled || !message.trim()}>
        Send
      </button>
    </div>
  );
};
