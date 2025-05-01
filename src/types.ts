// src/types.ts

export interface Config {
  title?: string;
  delay?: number;
  heartbeatInterval: number;
  inactivityLimit: number;
  timeout?: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
}

export interface Message {
  role: "user" | "bot";
  content: string;
  type?: string;
  data?: any;
  loading?: boolean;
}

export interface ChatbotProps {
  config?: Config;
  language?: string;
  location?: Location;
  timezone?: string;
  fingerprint: string;
}

export interface InputAreaProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export interface ChatHeaderProps {
  onEndChat: () => void;
}

export interface FloatingButtonProps {
  onClick: () => void;
}

export interface MessageAreaProps {
  messages: {
    role: string;
    content: string;
    type?: string;
    data?: any;
    loading?: boolean;
  }[];
  onSend: (msg: string) => void;
  retryPrompt: () => void;
  timedOut: boolean;
}

export interface Flight {
  airline: string;
  flight_number: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  stops: number;
  price: {
    amount: number;
    currency: string;
  };
  fare_class: string;
  logo_url: string;
}

export interface FlightCardsProps {
  flights: Flight[];
  message: string;
  onSelectFlight: (flight: Flight) => void;
}

export interface ChatRequestParams {
  message?: string;
  initialMessage?: string;
  conversationId?: string | null;
  language?: string;
  location?: Location;
  timezone?: string;
  fingerprint: string;
  timeout?: number;
}
