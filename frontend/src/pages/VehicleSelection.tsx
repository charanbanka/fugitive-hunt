import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import CopCard from "@/components/CopCard";
import VehicleCard from "@/components/VehicleCard";
// import Header from "@/components/Header";
import { ArrowRight, ArrowLeft } from "lucide-react";

const VehicleSelection: React.FC = () => {
  const {
    vehicles,
    cops,
    currentCopIndex,
    setCurrentCopIndex,
    selectVehicle,
    nextCop,
    previousCop,
    completeGame,
    gameStarted,
  } = useGameContext();
  const navigate = useNavigate();

  // Adjust the cop index for vehicle selection phase
  const actualCopIndex = currentCopIndex % cops.length;
  const currentCop = cops[actualCopIndex];

  useEffect(() => {
    if (setCurrentCopIndex) setCurrentCopIndex(0);
  }, []);

  // Redirect if game hasn't started or not all cops have selected cities
  useEffect(() => {
    if (!gameStarted) {
      navigate("/");
      return;
    }

    const allCopsSelectedCities = cops.every(
      (cop) => cop.selectedCity !== null
    );
    if (!allCopsSelectedCities) {
      navigate("/city-selection");
    }
  }, [gameStarted, cops, navigate]);

  const handleSelectVehicle = (vehicleId: number) => {
    selectVehicle(vehicleId);
  };

  const handleNext = async () => {
    if (actualCopIndex === cops.length - 1) {
      // If all cops have selected vehicles, complete the game
      await completeGame();
      navigate("/results");
    } else {
      nextCop("vehicle");
    }
  };

  const handlePrevious = () => {
    if (actualCopIndex === 0 && currentCopIndex < cops.length) {
      // If we're at the first cop in vehicle selection, go back to city selection
      navigate("/city-selection");
    } else {
      previousCop();
    }
  };

  // Only disable vehicles with no availability
  const isVehicleDisabled = (vehicle: any) => {
    return (
      vehicle.available <= 0 ||
      (currentCop.selectedCity?.distance || 0) * 2 > vehicle.range
    );
  };

  const isMissionNotComplete = useMemo(() => {
    return vehicles.some((vehicle) => !isVehicleDisabled(vehicle));
  }, [vehicles]);

  return (
    <div className=" bg-[url('https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=2429&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/60 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto animate-enter">
          <h1 className="page-title">Choose Electric Vehicle</h1>
          <p className="page-subtitle">
            {currentCop.name} needs to select a vehicle to reach{" "}
            {currentCop.selectedCity?.name}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1 text-white mt-9">
              <CopCard cop={currentCop} isActive={true} showDetails={true} />

              <div className="bg-card p-4 rounded-lg mt-4 shadow-sm border border-muted text-black">
                <h3 className="font-bold mb-2">Distance Requirements</h3>
                <p className="text-sm mb-4">
                  Select a vehicle with sufficient range to reach{" "}
                  {currentCop.selectedCity?.name} (
                  {currentCop.selectedCity?.distance} km).
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${
                        ((currentCop.selectedCity?.distance || 0) / 120) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0 km</span>
                  <span>120 km</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-white">Available Vehicles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles?.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    selectedCity={currentCop.selectedCity}
                    isSelected={vehicle?.id == currentCop?.selectedVehicle?.id}
                    isDisabled={isVehicleDisabled(vehicle)}
                    onClick={() => handleSelectVehicle(vehicle.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={handlePrevious} className="game-button-secondary">
              <ArrowLeft className="mr-2" size={18} />{" "}
              {actualCopIndex === 0
                ? "Back to City Selection"
                : "Previous Officer"}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!currentCop.selectedVehicle && isMissionNotComplete}
              className={
                !currentCop.selectedVehicle && isMissionNotComplete
                  ? "opacity-50 cursor-not-allowed game-button"
                  : "game-button"
              }
            >
              {actualCopIndex === cops.length - 1
                ? "Complete Mission"
                : "Next Officer"}{" "}
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
