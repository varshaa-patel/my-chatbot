// src/components/Chatbot.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FloatingButton } from "./FloatingButton";
import { ChatHeader } from "./ChatHeader";
import { MessageArea } from "./MessageArea";
import { InputArea } from "./InputArea";
import { useChatLogic } from "../hooks/useChatLogic";
import { ChatbotProps } from "../types";
import { BroadcastService } from "@/services/BroadcastService";

export const Chatbot: React.FC<ChatbotProps> = ({
  config = {
    title: "",
    delay: 10,
    heartbeatInterval: 1,
    inactivityLimit: 60,
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
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    messages,
    handleSend,
    endChat,
    isTyping,
    isLoading,
    restorePreviousConversation,
  } = useChatLogic(language, location, timezone, config, fingerprint);

  // Automatically open if conversation exists
  useEffect(() => {
    const existingConversationId = localStorage.getItem("conversation-id");
    if (existingConversationId) {
      setIsOpen(true);
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
  useEffect(() => {
    BroadcastService.sendLoadingState(isLoading || isTyping);
  }, [isLoading, isTyping]);
  useEffect(() => {
    BroadcastService.onLoadingState(setIsDisabled);
  }, []);
 

  const handleEndChat = () => {
    endChat();
    setIsOpen(false);
  };

  return (
    <>
      <FloatingButton onClick={toggleChat} />

      {isOpen && (
        <div className="chatbot-container">
          <ChatHeader onEndChat={handleEndChat} />
          <MessageArea messages={messages} onSend={handleSend} />
          <InputArea onSend={handleSend} disabled={isLoading || isTyping} />
        </div>
      )}
    </>
  );
};
