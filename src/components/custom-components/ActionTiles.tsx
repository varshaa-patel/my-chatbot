import React from 'react';
import { cn } from '@/lib/utils';
import { Plane, Check, Calendar, Briefcase, FileQuestion, HelpCircle, Luggage } from 'lucide-react';

type ActionCardProps = {
  title: string;
  icon: 'flight' | 'book' | 'manage' | 'policy' | 'refund' | 'luggage' | 'suitcase' | 'weight';
  className?: string;
  onClick?: () => void;
};

const ActionCard: React.FC<ActionCardProps> = ({ title, icon, className, onClick }) => {
  const getIcon = () => {
    switch (icon) {
      case 'flight':
        return <Plane size={20} className="text-gray-600" />;
      case 'book':
        return <Check size={20} className="text-green-600" />;
      case 'manage':
        return <Calendar size={20} className="text-red-600" />;
      case 'policy':
        return <FileQuestion size={20} className="text-gray-600" />;
      case 'refund':
        return <Briefcase size={20} className="text-amber-600" />;
      case 'luggage':
        return <Luggage size={20} className="text-yellow-600" />;
      case 'suitcase':
        return <Briefcase size={20} className="text-orange-400" />; 
      case 'weight':
        return <HelpCircle size={20} className="text-gray-500" />;
      default:
        return <HelpCircle size={20} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center p-4 bg-white rounded-xl shadow-sm",
        "hover:shadow-md transition-shadow cursor-pointer",
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
        {getIcon()}
      </div>
      <p className="ml-3 text-sm font-medium text-gray-800">{title}</p>
    </div>
  );
};

export default ActionCard;