import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getCitiesData,
  getVehiclesData,
  checkCriminal,
  getCopsData,
  getCriminalData,
} from "@/services/gameServices";

// Define types
export type City = {
  id: number;
  name: string;
  distance: number;
  imageUrl: string;
  isSelected?: boolean;
};

export type Vehicle = {
  id: number;
  type: string;
  range: number;
  count: number;
  available: number;
  icon: string;
  imageUrl: string;
  selectedFor?: number[];
};

export type Cop = {
  id: number;
  name: string;
  image?: string;
  selectedCity?: City | null;
  selectedVehicle?: Vehicle | null;
  canReachDestination?: boolean;
  filePath?: string;
  fileId?: string;
};

type GameContextType = {
  cities: City[];
  vehicles: Vehicle[];
  cops: Cop[];
  currentCopIndex: number;
  setCurrentCopIndex: (val: number) => void;
  criminal: any;
  gameStarted: boolean;
  gameCompleted: boolean;
  loading: boolean;
  successfulCop: Cop | null;
  selectCity: (cityId: number) => void;
  startVehicle: () => void;
  selectVehicle: (vehicleId: number) => void;
  startGame: () => Promise<void>;
  resetGame: () => void;
  nextCop: (type: string) => void;
  previousCop: () => void;
  completeGame: () => Promise<void>;
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Define provider props
interface GameProviderProps {
  children: ReactNode;
}

// Create cops data
const copsData: Cop[] = [
  {
    id: 1,
    name: "Officer Chen",
    image:
      "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=500&auto=format&fit=crop",
    selectedCity: null,
    selectedVehicle: null,
    canReachDestination: false,
  },
  {
    id: 2,
    name: "Officer Rodriguez",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop",
    selectedCity: null,
    selectedVehicle: null,
    canReachDestination: false,
  },
  {
    id: 3,
    name: "Officer Johnson",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop",
    selectedCity: null,
    selectedVehicle: null,
    canReachDestination: false,
  },
];

export function GameProvider({ children }: GameProviderProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [cops, setCops] = useState<Cop[]>(copsData);
  const [criminal, setCriminal] = useState({});
  const [currentCopIndex, setCurrentCopIndex] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [successfulCop, setSuccessfulCop] = useState<Cop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [copsData, criminalData, citiesData, vehiclesData] =
          await Promise.all([
            getCopsData(),
            getCriminalData(),
            getCitiesData(),
            getVehiclesData(),
          ]);

        setCops(copsData);
        setCriminal(criminalData);
        setCities(citiesData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const startGame = async () => {
    setLoading(true);
    try {
      setGameStarted(true);
      // console.log(`Criminal is hiding in ${citiesData[randomCityIndex].name}`);
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setCops((prevCops) =>
      prevCops.map((cop) => ({
        ...cop,
        selectedCity: null,
        selectedVehicle: null,
        canReachDestination: false,
      }))
    );
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => ({ ...v, available: v.count }))
    );
    setCriminal((prev) => {
      return { ...prev, hiddenCity: null };
    });
    setCurrentCopIndex(0);
    setGameStarted(false);
    setGameCompleted(false);
    setSuccessfulCop(null);
  };
  const selectCity = (cityId: number) => {
    const updatedCops = [...cops];
    const selectedCity = cities.find((city) => city.id === cityId) || null;

    // Update the current cop's selectedCity
    updatedCops[currentCopIndex] = {
      ...updatedCops[currentCopIndex],
      selectedCity,
    };

    //
    let value = false;
    if (currentCopIndex === cops.length - 1) {
      value = true;
    }

    setCops(updatedCops);
  };

  const startVehicle = () => {
    // Update cop with selected vehicle
    const updatedCops = cops.map((cop) => ({ ...cop, selectedVehicle: null }));
    const updatedVehicles = vehicles.map((v) => ({ ...v, available: v.count }));

    setVehicles(updatedVehicles);
    setCops(updatedCops);
  };

  const selectVehicle = (vehicleId: number) => {
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );
    if (!selectedVehicle) return;

    // Update cop with selected vehicle
    const updatedCops = [...cops];

    const canReachDestination =
      selectedVehicle.available >= 0 &&
      selectedVehicle.range >=
        (cops[currentCopIndex]?.selectedCity?.distance || 0) * 2;

    updatedCops[currentCopIndex] = {
      ...updatedCops[currentCopIndex],
      selectedVehicle,
      canReachDestination,
    };

    let value = false;
    if (currentCopIndex === cops.length - 1) value = true;

    setCops(updatedCops);
  };

  const nextCop = (type: string) => {
    let currentCop = cops[currentCopIndex];
    if (type == "city") {
      const updatedCities = cities?.map((city) => {
        if (city.id === currentCop?.selectedCity?.id) {
          return { ...city, isSelected: true };
        } else {
          return city;
        }
      });
      setCities(updatedCities);
    } else if (type == "vehicle") {
      // Update vehicles availability
      const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === currentCop.selectedVehicle.id && vehicle.available > 0
          ? {
              ...vehicle,
              available: vehicle.available - 1,
              selectedFor: [...(vehicle?.selectedFor || []), currentCop.id],
            }
          : vehicle
      );
      setVehicles(updatedVehicles);
    }
    if (currentCopIndex < cops.length - 1) {
      setCurrentCopIndex(currentCopIndex + 1);
    }
  };

  const previousCop = () => {
    if (currentCopIndex > 0) {
      setCurrentCopIndex(currentCopIndex - 1);
    }
  };

  const completeGame = async () => {
    setLoading(true);
    try {
      // Make API call to check if any cop caught the criminal
      let resp = await checkCriminal(cops);
      const result = resp; // Directly use 'resp' if 'CheckCriminalResult' contains the required properties

      if (result.found) {
        setSuccessfulCop(result.successfulCop);
      } else {
        setSuccessfulCop(null);
      }
      setCriminal(result.updatedCriminal);

      setGameCompleted(true);
    } catch (error) {
      console.error("Error completing game:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        cities,
        vehicles,
        cops,
        currentCopIndex,
        setCurrentCopIndex,
        criminal,
        gameStarted,
        gameCompleted,
        loading,
        successfulCop,
        selectCity,
        startVehicle,
        selectVehicle,
        startGame,
        resetGame,
        nextCop,
        previousCop,
        completeGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
