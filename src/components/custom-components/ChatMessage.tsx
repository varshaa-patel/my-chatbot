import React from 'react';

import { Avatar, AvatarFallback } from "../ui/avatar";
type ChatMessageProps = {
  type: 'bot' | 'user';
  message: string;
  time: string;
};

function ChatMessage({ type='bot', message, time }: ChatMessageProps) {
  if (type === 'bot') {
    return (
      <div className="flex items-start space-x-2">
        <Avatar className="h-8 w-8 bg-teal-500 mt-0.5">
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div>
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
            <p>{message}</p>
          </div>
          <span className="text-xs text-muted-foreground block mt-1">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div>
        <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3">
          <p>{message}</p>
        </div>
        <span className="text-xs text-muted-foreground block text-right mt-1">{time}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
