import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import CopCard from "@/components/CopCard";
import { CheckCircle, XCircle, Trophy, MapPin, Home } from "lucide-react";
import confetti from "canvas-confetti";
import { API_GATEWAY_URL } from "@/common/config";

const Results: React.FC = () => {
  const {
    cops,
    criminal,
    gameStarted,
    gameCompleted,
    successfulCop,
    resetGame,
  } = useGameContext();
  const navigate = useNavigate();

  // Redirect if game hasn't started or not completed
  useEffect(() => {
    if (!gameStarted) {
      navigate("/");
    }

    // Launch confetti if mission was successful
    if (successfulCop) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [gameStarted, gameCompleted, successfulCop, navigate]);

  const handlePlayAgain = () => {
    resetGame();
    navigate("/");
  };

  // if (!criminal?.hiddenCity) return null;
  console.log("cro",criminal)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto animate-enter">
          <div className="text-center mb-8">
            <h1 className="page-title">
              Mission {successfulCop ? "Successful" : "Failed"}
            </h1>
            <div className="inline-flex items-center justify-center mb-4 bg-primary/20 p-4 rounded-full">
              {successfulCop ? (
                <Trophy size={40} className="text-yellow-400" />
              ) : (
                <XCircle size={40} className="text-red-500" />
              )}
            </div>
            <p className="page-subtitle">
              {successfulCop
                ? `${successfulCop.name} successfully captured the fugitive in ${criminal?.hiddenCity?.name}!`
                : `The fugitive escaped capture. They were hiding in ${criminal?.hiddenCity?.name}.`}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg mb-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="criminal-image-container">
                <img
                  src={`${API_GATEWAY_URL}/file/${criminal?.fileId}`}
                  alt="Criminal"
                  className="criminal-image"
                />
                <div className="mt-2 text-center text-sm font-medium text-muted-foreground">
                  {successfulCop ? "Captured Fugitive" : "Escaped Fugitive"}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-primary" />
                  <h3 className="font-bold text-xl">Fugitive Location</h3>
                </div>
                <p className="text-lg mb-4">
                  The fugitive was hiding in{" "}
                  <span className="font-bold text-primary">
                    {criminal?.hiddenCity?.name}
                  </span>
                  , which is{" "}
                  <span className="font-bold">{criminal?.hiddenCity?.distance} km</span>{" "}
                  from headquarters.
                </p>

                {successfulCop ? (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="font-medium text-green-800">
                      {successfulCop.name} successfully apprehended the
                      fugitive!
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <p className="font-medium text-red-800">
                      No officer was able to catch the fugitive.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Officer Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cops?.map((cop) => {
              const foundFugitive =
                cop.selectedCity?.id === criminal?.hiddenCity?.id &&
                cop.canReachDestination;
              const isSuccessfulCop = successfulCop?.id === cop.id;

              return (
                <div
                  key={cop.id}
                  className={`bg-card border rounded-lg overflow-hidden ${
                    isSuccessfulCop
                      ? "border-yellow-400 shadow-lg shadow-yellow-400/20"
                      : "border-border/50"
                  }`}
                >
                  <div
                    className={`p-3 text-center ${
                      isSuccessfulCop
                        ? "bg-yellow-400/20"
                        : foundFugitive
                        ? "bg-green-500/20"
                        : "bg-card"
                    }`}
                  >
                    <span className="font-bold">{cop.name}</span>
                    {isSuccessfulCop && (
                      <span className="ml-2 inline-flex items-center text-yellow-400 text-sm">
                        <Trophy size={14} className="mr-1" /> Captured Fugitive
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={`${API_GATEWAY_URL}/file/${cop.fileId}`}
                        alt={cop.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-muted"
                      />
                      <div>
                        <div className="text-sm font-medium">{cop.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Police Department
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Investigated:
                        </span>
                        <span className="font-medium">
                          {cop.selectedCity?.name}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-medium">
                          {cop.selectedCity?.distance} km
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicle:</span>
                        <span className="font-medium">
                          {cop.selectedVehicle?.type}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Range:</span>
                        <span className="font-medium">
                          {cop.selectedVehicle?.range} km
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span
                          className={`font-medium flex items-center ${
                            cop.canReachDestination
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {cop.canReachDestination ? (
                            <>
                              <CheckCircle size={14} className="mr-1" /> Reached
                            </>
                          ) : (
                            <>
                              <XCircle size={14} className="mr-1" /> Failed to
                              reach
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Found Fugitive:
                        </span>
                        <span
                          className={`font-medium flex items-center ${
                            foundFugitive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {foundFugitive ? (
                            <>
                              <CheckCircle size={14} className="mr-1" /> Yes
                            </>
                          ) : (
                            <>
                              <XCircle size={14} className="mr-1" /> No
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={handlePlayAgain}
              className="game-button px-8 py-3 text-lg"
            >
              <Home className="mr-2" size={18} /> Play Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
