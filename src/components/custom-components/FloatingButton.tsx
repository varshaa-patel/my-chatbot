// src/components/FloatingButton.tsx
import React from "react";
import { FloatingButtonProps } from "../../types";

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="floating-button"
      aria-label="Open Chatbot"
    >
      💬
    </button>
  );
};
