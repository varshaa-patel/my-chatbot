import React, { useEffect, useState } from "react";
import { Flight, MessageAreaProps } from "../../types";
import { FlightCards } from "./FlightCards";
import CategorySection from "./CategorySection";
import ChatMessage from "./ChatMessage";

export const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  onSend,
  retryPrompt,
  timedOut,
}) => {
  const [dotCount, setDotCount] = useState(1);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setTimestamp(formattedTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSelectFlight = (flight: Flight) => {
    const flightSummary = `Selected flight: ${flight?.airline} ${flight.flight_number}, from ${flight?.departure?.airport} to ${flight?.arrival?.airport}, departs at ${flight?.departure?.time}`;
    onSend(flightSummary);
  };

  return (
    <div className="message-area">
      <div className="">
        <ChatMessage
          type="bot"
          message="Hello! 🌟 How can I assist you today?"
          time={timestamp}
        ></ChatMessage>
      </div>
      {messages?.map((msg, index) => (
        <ChatMessage
          type={msg?.role}
          message={msg?.content}
          time={timestamp}
        ></ChatMessage>
      ))}
      {timedOut && (
        <div className="timeout-error-container">
          <p className="error-text">The request timed out.</p>
          <button onClick={retryPrompt} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
