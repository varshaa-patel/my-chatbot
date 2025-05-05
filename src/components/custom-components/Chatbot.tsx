// src/components/Chatbot.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FloatingButton } from "./FloatingButton";
import { ChatHeader } from "./ChatHeader";
import { MessageArea } from "./MessageArea";
import { InputArea } from "./InputArea";
import { useChatLogic } from "../../hooks/useChatLogic";
import { ChatbotProps } from "../../types";

export const Chatbot: React.FC<ChatbotProps> = ({
  config = {
    title: "",
    typingDelay: 10,
    heartbeatInterval: 20,
    inactivityLimit: 60,
    timeout: 30,
  },
  language = "en-US",
  location = {
    latitude: 0,
    longitude: 0,
    country: "string",
    city: "string",
  },
  timezone = "UTC",
  fingerprint = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    handleSend,
    endChat,
    isTyping,
    isLoading,
    restorePreviousConversation,
    retryPrompt,
    timedOut,
  } = useChatLogic(language, location, timezone, config, fingerprint);

  // Automatically open if conversation exists
  useEffect(() => {
    const existingConversationId = localStorage.getItem("conversation-id");
    if (existingConversationId) {
      // setIsOpen(true);
      restorePreviousConversation(existingConversationId);
    }
  }, []);

  const toggleChat = async () => {
    if (!isOpen) {
      setIsOpen(true); // Open immediately without waiting
    } else {
      setIsOpen(false);
    }
  };

  const handleEndChat = () => {
    endChat();
    setIsOpen(false);
  };

  return (
    <>
      <FloatingButton onClick={toggleChat} />

      {isOpen && (
        <div className="fixed bottom-[90px] right-6 w-full max-w-[400px] h-[80vh] bg-white text-black border border-gray-300 rounded-xl shadow-lg z-[1000] overflow-hidden flex flex-col p-2">
          <ChatHeader onEndChat={handleEndChat} />
          <MessageArea
            messages={messages}
            onSend={handleSend}
            retryPrompt={retryPrompt}
            timedOut={timedOut}
          />
          <InputArea onSend={handleSend} disabled={isLoading || isTyping} />
        </div>
      )}
    </>
  );
};
