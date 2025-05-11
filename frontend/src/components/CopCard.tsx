import React from "react";
import { Cop } from "@/context/GameContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_GATEWAY_URL } from "@/common/config";

interface CopCardProps {
  cop: Cop;
  isActive?: boolean;
  showDetails?: boolean;
}

const CopCard: React.FC<CopCardProps> = ({
  cop,
  isActive = false,
  showDetails = false,
}) => {
  const initials = cop.name
    .split(" ")
    .map((name) => name[0])
    .join("");
 
  return (
    <div
      className={`p-4 rounded-lg ${
        isActive ? "bg-primary/20 border border-primary" : "bg-card shadow"
      }`}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 border-2 border-primary/50">
          <AvatarImage
            src={`${API_GATEWAY_URL}/file/${cop.fileId}`}
            alt={cop.name}
          />
          <AvatarFallback className="bg-primary text-white text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-lg">{cop.name}</h3>
          <span className="police-badge">Officer</span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-2 text-sm">
          {cop.selectedCity && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned City:</span>
              <span className="font-medium">
                {cop.selectedCity.name} ({cop.selectedCity.distance} km)
              </span>
            </div>
          )}

          {cop.selectedVehicle && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="font-medium">
                {cop.selectedVehicle.type} (Range: {cop.selectedVehicle.range}{" "}
                km)
              </span>
            </div>
          )}

          {cop.selectedCity && cop.selectedVehicle && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span
                className={`font-medium ${
                  cop.canReachDestination ? "text-green-500" : "text-red-500"
                }`}
              >
                {cop.canReachDestination
                  ? "Can reach destination and return"
                  : "Cannot reach destination"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CopCard;
