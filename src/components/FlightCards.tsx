import React from "react";
import { format } from "date-fns";
import { FlightCardsProps } from "@/types";

export const FlightCards: React.FC<FlightCardsProps> = ({
  flights,
  message,
  onSelectFlight,
}) => {
  return (
    <div className="flight-cards">
      {/* <p className="font-bold mb-2">{message}</p> */}
      <div>
        {flights
          .filter((f) => f.departure?.time && f.arrival?.time)
          .map((flight, idx) => (
            <div
              key={idx}
              className="flight-card"
              onClick={() => onSelectFlight(flight)}
            >
              <div className="flight-card-header">
                <div className="flight-info">
                  <h3>
                    {flight?.airline} {flight?.flight_number}
                  </h3>
                  <p>{flight?.fare_class}</p>
                </div>
                <img
                  src={flight?.logo_url}
                  alt="Airline Logo"
                  className="flight-logo"
                />
              </div>
              <div className="flight-details">
                <p>
                  <strong>Departure:</strong> {flight?.departure?.airport} -{" "}
                  {flight?.departure?.time ? "5:30 PM" : "N/A"}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight?.arrival?.airport} -{" "}
                  {flight?.arrival?.time ? "7:30 PM" : "N/A"}
                </p>
                <p>
                  <strong>Duration:</strong> {flight?.duration}
                </p>
                <p>
                  <strong>Stops:</strong> {flight?.stops}
                </p>
                <p className="flight-price">
                  {flight?.price?.amount} {flight?.price?.currency}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
