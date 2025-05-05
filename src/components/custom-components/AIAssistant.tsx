
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import CategorySection from './CategorySection';
import AIButton from './AIButton';
import CloudBackground from './CloudBackground';

const AIAssistant: React.FC = () => {
  const [aiActive, setAiActive] = useState(false);

  const toggleAI = () => {
    setAiActive(!aiActive);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-ai-gradient">
      <CloudBackground />
      
      {/* Status bar mockup */}
      <div className="py-2 px-4 flex items-center justify-between text-xs text-gray-700 z-10">
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-6a1 1 0 011-1h2a1 1 0 011 1v11a1 1 0 01-1 1H9a1 1 0 01-1-1V5zm6 4a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1h-2a1 1 0 01-1-1v-7z" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <div className="w-6 h-3 bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 flex items-center z-10">
        <button className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center ml-4">
          <div className="w-10 h-10 rounded-full bg-firnas-teal"></div>
          <h2 className="ml-3 text-xl font-semibold">Firnas AI</h2>
        </div>
      </div>

      {/* Assistant content */}
      <div className="px-6 flex-1 overflow-y-auto pb-32 z-10">
        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="w-20 h-20 rounded-full bg-firnas-teal mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Firnas AI</h1>
          <p className="text-gray-600">How can I help you today?</p>
        </div>

        {/* Categories and actions */}
        <CategorySection
          title="ABOUT BOOKING"
          actions={[
            { title: "Check flight status", icon: "flight" },
            { title: "Book a flight", icon: "book" },
            { title: "Manage booking", icon: "manage" },
          ]}
        />

        <CategorySection
          title="REFUNDS"
          actions={[
            { title: "What's the refund policy?", icon: "policy" },
            { title: "Can I get a refund for seat selection?", icon: "refund" },
          ]}
        />

        <CategorySection
          title="BAGGAGE QUERIES"
          actions={[
            { title: "I lost my suitcase", icon: "suitcase" },
            { title: "How much luggage can I carry?", icon: "weight" },
          ]}
        />
      </div>

      {/* Footer with AI button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center items-center z-20">
        <div className="flex items-center justify-between w-full max-w-md">
          <button className="p-2 rounded-full bg-white shadow">
            <MessageCircle className="w-6 h-6 text-gray-600" />
          </button>
          
          <AIButton active={aiActive} onClick={toggleAI} />
          
          <div className="w-10"></div> {/* Empty div for symmetry */}
        </div>
        {/* Bottom phone indicator */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default AIAssistant;
