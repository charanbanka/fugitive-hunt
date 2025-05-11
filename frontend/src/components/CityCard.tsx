
import React from 'react';
import { City } from '@/context/GameContext';

interface CityCardProps {
  city: City;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, isSelected, isDisabled, onClick }) => {
  const cardClasses = `
    city-card card-hover
    ${isSelected ? 'selected-card text-white' : ''}
    ${isDisabled ? 'disabled-card' : ''}
  `;
  
  // Generate a background color based on distance (closer = greener)
  const maxDistance = 60; // Based on the data
  const distanceRatio = city.distance / maxDistance;
  const greenValue = Math.round(255 * (1 - distanceRatio));
  const redValue = Math.round(255 * distanceRatio);
  
  return (
    <div 
      className={cardClasses}
      onClick={isDisabled ? undefined : onClick}
    >
      <img src={city.imageUrl} alt={city.name} className="city-image h-[150px]" />
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{city.name}</h3>
        <div className="px-3 py-1 rounded-full bg-secondary text-sm text-black">
          {city.distance} km
        </div>
      </div>
    </div>
  );
};

export default CityCard;
