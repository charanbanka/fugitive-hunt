
import React from 'react';
import { Vehicle, City } from '@/context/GameContext';
import { Car, Bike, CheckCircle } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  selectedCity: City | null;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  selectedCity, 
  isSelected, 
  isDisabled, 
  onClick 
}) => {
  const cardClasses = `
    vehicle-card card-hover
    ${isSelected ? 'selected-card text-white' : ''}
    ${isDisabled ? 'disabled-card' : ''}
  `;
  
  const cityDistance = selectedCity?.distance || 0;
  const canReachCity = vehicle.range >= cityDistance * 2;
  
  const getVehicleIcon = () => {
    switch(vehicle.icon) {
      case 'car':
        return <Car size={24} />;
      case 'bike':
        return <Bike size={24} />;
      case 'suv':
      default:
        return <Car size={24} className="transform scale-110" />;
    }
  };
  
  return (
    <div 
      className={cardClasses}
      onClick={isDisabled ? undefined : onClick}
    >
      <img src={vehicle.imageUrl} alt={vehicle.type} className="vehicle-image h-[150px]" />
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {getVehicleIcon()}
          <h3 className="font-bold">{vehicle.type}</h3>
        </div>
        <div className="text-xs bg-secondary px-2 py-1 rounded text-black">
          Available: {vehicle.available}/{vehicle.count}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm mt-2">
        <span>Range: <span className="font-medium">{vehicle.range} km</span></span>
        {selectedCity && (
          <span className={canReachCity ? 'text-green-400' : 'text-red-400'}>
            {canReachCity ? (
              <div className="flex items-center gap-1">
                <CheckCircle size={16} /> 
                <span>Can reach</span>
              </div>
            ) : (
              <span>Cannot reach</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;
