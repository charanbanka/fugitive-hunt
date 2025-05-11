
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import CopCard from '@/components/CopCard';
import { ArrowRight, Shield, Loader } from 'lucide-react';

const Index: React.FC = () => {
  const { cops, startGame, loading } = useGameContext();
  const navigate = useNavigate();
  
  const handleStart = async () => {
    await startGame();
    navigate('/city-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-enter">
        <div className="max-w-3xl w-full bg-white p-6 md:p-8 rounded-xl shadow-lg border border-primary/20 card-gradient">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4 bg-primary/20 p-3 rounded-full">
              <Shield size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Fugitive Hunt</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              A notorious criminal escape artist has vanished again. They could be hiding in one of the 5 neighboring cities. Your mission: coordinate our three fearless officers to track down and apprehend the fugitive!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {cops?.map(cop => (
              <CopCard key={cop.id} cop={cop} />
            ))}
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg mb-8 border border-primary/10">
            <h2 className="font-bold text-xl mb-2 text-primary">Mission Briefing</h2>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex gap-2">
                <span className="font-bold text-primary">Step 1:</span> 
                <span>Assign each officer to investigate one of the 5 neighboring cities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">Step 2:</span> 
                <span>Select appropriate electric vehicles for each officer based on the distance of their assigned city.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">Step 3:</span> 
                <span>Complete the mission and see if your team successfully captures the fugitive.</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={handleStart} 
              className="game-button px-8 py-3 text-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={18} className="mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Begin Mission <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
