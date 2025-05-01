import { ChatRequestParams } from "../types";

const API_BASE = "http://localhost:8000/api/v1/new";

export const callStartAPIService = async ({
  initialMessage = "Hello",
  language,
  location,
  timezone,
  fingerprint,
}: ChatRequestParams) => {
  const response = await fetch(`${API_BASE}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: "user",
      initial_message: initialMessage,
      language,
      location,
      timezone,
      fingerprint,
    }),
  });

  if (!response.ok) throw new Error("Start API failed");

  return await response.json();
};

export const callChatAPIService = async ({
  message,
  conversationId,
  fingerprint,
}: ChatRequestParams) => {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: "user",
      message,
      conversation_id: conversationId,
      fingerprint,
    }),
  });

  if (!response.ok) throw new Error("Chat API failed");

  return await response.json();
};

export const fetchPreviousChats = async (conversationId: string) => {
  try {
    const response = await fetch(`${API_BASE}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation_id: conversationId }),
    });

    const data = await response.json();
    if (data?.messages) {
      return data.messages;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch previous chat:", error);
    return [];
  }
};
