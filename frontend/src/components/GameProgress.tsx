
import React from 'react';

interface GameProgressProps {
  current: number;
  total: number;
  phase: string;
}

const GameProgress: React.FC<GameProgressProps> = ({ current, total, phase }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>{phase}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div  role="progressbar" 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GameProgress;
