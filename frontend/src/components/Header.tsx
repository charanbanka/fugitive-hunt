
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import GameProgress from './GameProgress';
import { Loader } from 'lucide-react';

const Header: React.FC = () => {
  const { gameStarted, gameCompleted, cops, currentCopIndex, loading } = useGameContext();
  
  
  if (!gameStarted) return null;
  
  return (
    <header className="border-b border-primary/20 pb-4 mb-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-primary">Fugitive Hunt</h1>
            {loading && (
              <Loader size={20} className="animate-spin text-primary" />
            )}
          </div>
          
          {!gameCompleted && (
            <div className="w-full max-w-2xl">
              <GameProgress 
                current={currentCopIndex + 1} 
                total={cops.length * 2} 
                phase={currentCopIndex < cops.length ? "City Selection" : "Vehicle Selection"} 
              />
              
              <div className="text-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {currentCopIndex < cops.length 
                    ? `${cops[currentCopIndex].name} is choosing a city` 
                    : `${cops[currentCopIndex - cops.length].name} is choosing a vehicle`
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
