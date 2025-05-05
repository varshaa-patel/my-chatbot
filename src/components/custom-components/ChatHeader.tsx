// src/components/ChatHeader.tsx
import React from "react";
import { ChatHeaderProps } from "../../types";

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onEndChat }) => {
  return (
    <div className="chat-header">
      <h3>Flynas</h3>
      <button onClick={onEndChat}>End Chat</button>
    </div>
  );
};
