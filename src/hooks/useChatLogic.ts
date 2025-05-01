// src/hooks/useChatLogic.ts
import { useEffect, useState } from "react";
import { Config, Location, Message } from "../types";
import { simulateTypingEffect } from "../services/simulateTypingEffect";
import { startHeartbeat, resetInactivityTimer } from "../services/hearbeat";
import {
  callChatAPIService,
  callStartAPIService,
  fetchPreviousChats,
} from "../services/chatService";

export const useChatLogic = (
  language: string,
  location: Location,
  timezone: string,
  config: Config,
  fingerprint: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const storedConversationId = localStorage.getItem("conversation-id");
    if (storedConversationId) {
      setConversationId(storedConversationId);
    }
  }, []);

  const handleBotResponse = (data: any) => {
    if (data?.response) {
      simulateTypingEffect(
        data.response,
        setMessages,
        () => setIsTyping(false),
        config?.delay
      );
      if (data?.conversation_id) {
        setConversationId(data.conversation_id);
        localStorage.setItem("conversation-id", data.conversation_id);
      }
      startHeartbeat({
        heartbeatInterval: config?.heartbeatInterval,
      });
      resetInactivityTimer({
        inactivityLimit: config?.inactivityLimit,
      });
    } else {
      setMessages([{ role: "bot", content: "Bot did not respond." }]);
    }
  };

  const callStartAPI = async () => {
    try {
      setIsTyping(true);
      setIsLoading(true);
      setMessages([{ role: "bot", content: "...", loading: true }]);
      const data = await callStartAPIService(
        {
          language,
          location,
          timezone,
          fingerprint,
        },
        config?.timeout
      );
      handleBotResponse(data);
    } catch (error) {
      console.error("Start API call failed:", error);
      setMessages([{ role: "bot", content: "Network error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (message: string, isRetry = false) => {
    if (!message.trim() || isLoading || isTyping) return;
    setLastPrompt(message);
    // Only add user message if it's not a retry
    if (!isRetry) {
      setMessages((prev) => [...prev, { role: "user", content: message }]);
    }

    try {
      setIsTyping(true);
      setIsLoading(true);
      setTimedOut(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "...", loading: true },
      ]);
      const data = conversationId
        ? await callChatAPIService(
            { message, conversationId, fingerprint },
            config?.timeout
          )
        : await callStartAPIService(
            {
              initialMessage: message,
              language,
              location,
              timezone,
              fingerprint,
            },
            config?.timeout
          );
      handleBotResponse(data);
    } catch (error) {
      console.error("Chat API call failed:", error);
      if (error instanceof Error && error.message === "timeout") {
        setTimedOut(true);
        setIsTyping(false);
        setMessages((prev) => [...prev.slice(0, -1)]); // Remove loader
      } else {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "bot", content: "Network error. Try again later." },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const restorePreviousConversation = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const previousMessages = await fetchPreviousChats(conversationId);
      if (previousMessages.length) {
        setMessages(previousMessages);
      }
    } catch (error) {
      console.error("Error restoring conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const retryPrompt = async () => {
    if (!lastPrompt) return;
    await handleSend(lastPrompt, true);
  };

  const endChat = () => {
    setMessages([]);
    setConversationId(null);
    setIsTyping(false);
    setIsLoading(false);
    setLastPrompt(null);
    localStorage.removeItem("conversation-id");
  };

  return {
    messages,
    callStartAPI,
    handleSend,
    endChat,
    isTyping,
    isLoading,
    restorePreviousConversation,
    retryPrompt,
    timedOut,
  };
};
