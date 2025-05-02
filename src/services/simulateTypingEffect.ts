// src/services/simulateTypingEffect.ts
import { Dispatch, SetStateAction } from "react";
import { Message } from "../types";

/**
 * Simulates a typing effect by progressively updating the last bot message.
 */
export const simulateTypingEffect = (
  response: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  onComplete?: () => void,
  typingDelay?: number
) => {
  let index = 0;
  const typingInterval = setInterval(() => {
    setMessages((prev) => {
      const newContent = response?.slice(0, index + 1);
      return [
        ...prev.slice(0, -1), // Remove the last typing loader
        { role: "bot", content: newContent },
      ];
    });
    index += 1;
    if (index === response?.length) {
      clearInterval(typingInterval); // Stop the typing effect when done
      onComplete?.(); // Call optional completion callback
    }
  }, typingDelay);
};
