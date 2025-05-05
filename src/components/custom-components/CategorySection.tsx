
import React from 'react';
import ActionCard from './ActionTiles';

type CategorySectionProps = {
  title: string;
  actions: Array<{
    title: string;
    icon: 'flight' | 'book' | 'manage' | 'policy' | 'refund' | 'luggage' | 'suitcase' | 'weight';
  }>;
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, actions }) => {
  return (
    <section className="my-4">
      <div className="flex items-center justify-center mb-2">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-4 uppercase text-xs tracking-wider text-gray-600 font-medium">{title}</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <ActionCard 
            key={index}
            title={action.title}
            icon={action.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
