import React, { useEffect, useState } from "react";
import { Flight, MessageAreaProps } from "../types";
import { FlightCards } from "./FlightCards";

export const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  onSend,
  retryPrompt,
  timedOut,
}) => {
  const [dotCount, setDotCount] = useState(1);

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
      <div className="message-bubble bot">
        <div className="">
          Hello! 🌟 How can I assist you today?
        </div>
      </div>
      {
        messages?.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${
              msg?.role === "user" ? "user" : "bot"
            }`}
          >
            <div
              className={`message-bubble ${
                msg?.role === "user" ? "user" : "bot"
              }`}
            >
              <div className="message-content">
                {msg?.loading ? (
                  `${".".repeat(dotCount)}`
                ) : msg?.type === "flights_available" &&
                  msg?.data?.flights?.length ? (
                  <FlightCards
                    flights={msg?.data?.flights}
                    message={msg?.content}
                    onSelectFlight={handleSelectFlight}
                  />
                ) : (
                  msg?.content
                )}
              </div>
            </div>
          </div>
        ))
        // )
      }
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
