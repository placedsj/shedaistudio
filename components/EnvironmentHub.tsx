
import React from 'react';
import { WeatherType } from '../types';

interface EnvironmentHubProps {
    weather: WeatherType;
    time: number;
    audioEnabled: boolean;
    onUpdate: (updates: any) => void;
}

const EnvironmentHub: React.FC<EnvironmentHubProps> = ({ weather, time, audioEnabled, onUpdate }) => {
    return (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 items-center">
            <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-3 rounded-2xl flex flex-col gap-4 shadow-2xl">
                {['clear', 'rain', 'snow'].map((wType) => (
                    <button
                        key={wType}
                        onClick={() => onUpdate({ weather: wType as WeatherType })}
                        className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center text-xl
                            ${weather === wType ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                        {wType === 'clear' ? '☀️' : wType === 'rain' ? '🌧️' : '❄️'}
                    </button>
                ))}
            </div>

            <div className="flex flex-col items-center gap-2">
                 <div className="h-40 w-1.5 bg-white/10 rounded-full relative">
                     <input 
                        type="range" min="0" max="100" value={time} 
                        onChange={(e) => onUpdate({ time: parseInt(e.target.value) })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        style={{ writingMode: 'vertical-lr' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full transition-all" style={{ height: `${time}%` }} />
                 </div>
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Time</span>
            </div>

            <button 
                onClick={() => onUpdate({ audioEnabled: !audioEnabled })}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${audioEnabled ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-white/10 text-slate-500'}`}
            >
                {audioEnabled ? '🔊' : '🔇'}
            </button>
        </div>
    );
};

export default EnvironmentHub;
