
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-6 border rounded-lg bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-center">
      <div className="text-5xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
