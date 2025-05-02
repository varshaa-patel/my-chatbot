import React, { useState } from "react";
import { InputAreaProps } from "../types";
import { useVoiceToText } from "../hooks/useVoiceToText";

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const { isRecording, startRecording, stopRecording } = useVoiceToText(
    (transcript) => {
      // onSend(transcript); // Send the transcript as prompt
      setMessage(transcript);
    }
  );

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
      <div className="chat-input">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          style={{ color: isRecording ? "#ff0000" : "#000000" }}
          disabled={disabled}
        >
          {isRecording ? "Stop" : "🎤"}
        </button>
      </div>
    </div>
  );
};
