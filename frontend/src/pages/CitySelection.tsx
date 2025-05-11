import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import CopCard from "@/components/CopCard";
import CityCard from "@/components/CityCard";
// import Header from "@/components/Header";
import { ArrowRight, ArrowLeft } from "lucide-react";

const CitySelection: React.FC = () => {
  const {
    cities,
    cops,
    currentCopIndex,
    selectCity,
    nextCop,
    previousCop,
    gameStarted,
  } = useGameContext();
  const navigate = useNavigate();

  // Redirect if game hasn't started
  useEffect(() => {
    if (!gameStarted) {
      navigate("/");
    }
  }, [gameStarted, navigate]);

  const currentCop = cops.length ? cops[currentCopIndex] : null;

  // Check if city is already selected by another cop
  const isCitySelected = (cityId: number) => {
    return cops.some(
      (cop, index) =>
        index !== currentCopIndex && cop.selectedCity?.id === cityId
    );
  };

  const handleSelectCity = (cityId: number) => {
    selectCity(cityId);
  };

  const handleNext = () => {
    if (currentCopIndex === cops?.length - 1) {
      // If all cops have selected cities, navigate to vehicle selection
      navigate("/vehicle-selection");
    } else {
      nextCop('city');
    }
  };

  console.log("cities",cities)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="container mx-auto px-4 py-8 flex-1">
        

        <div className="max-w-5xl mx-auto animate-enter">
          <h1 className="page-title">Choose Investigation City</h1>
          <p className="page-subtitle">
            {currentCop?.name} needs to select a city to investigate
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <CopCard cop={currentCop} isActive={true} />

              <div className="bg-card p-4 rounded-lg mt-4 shadow-sm border border-muted">
                <h3 className="font-bold mb-2">Mission Notes</h3>
                <ul className="text-sm space-y-2">
                  <li>• Each officer must choose a different city</li>
                  <li>• City distance affects vehicle requirements</li>
                  <li>• The fugitive is hiding in only one of these cities</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4">Available Cities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cities?.map((city) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    isSelected={currentCop?.selectedCity?.id === city.id}
                    isDisabled={city?.isSelected || false}
                    onClick={() => handleSelectCity(city.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            {currentCopIndex > 0 ? (
              <Button onClick={previousCop} className="game-button-secondary">
                <ArrowLeft className="mr-2" size={18} /> Previous Officer
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/")}
                className="game-button-secondary"
              >
                <ArrowLeft className="mr-2" size={18} /> Back to Briefing
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!currentCop || !currentCop.selectedCity}
              className={
                !currentCop?.selectedCity
                  ? "opacity-50 cursor-not-allowed game-button"
                  : "game-button"
              }
            >
              {currentCopIndex === cops.length - 1
                ? "Continue to Vehicles"
                : "Next Officer"}{" "}
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelection;
