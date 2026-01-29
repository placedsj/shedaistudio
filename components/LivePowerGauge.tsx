
import React from 'react';

interface LivePowerGaugeProps {
  loadFactor: number;
  maxAmps?: number;
  status?: string;
}

const LivePowerGauge: React.FC<LivePowerGaugeProps> = ({ loadFactor, maxAmps = 15, status }) => {
  // Clamp loadFactor between 0 and 1 for gauge visual
  const visualLoad = Math.max(0, Math.min(1, loadFactor));
  const rotation = -90 + (visualLoad * 180); // -90deg to +90deg
  
  // Determine status color
  const isHighLoad = visualLoad > 0.8;
  const isCritical = visualLoad > 0.95;
  
  let statusColor = "text-green-400";
  let statusBorder = "border-green-500/20";
  let statusBg = "bg-green-500/10";
  
  if (isCritical) {
    statusColor = "text-red-500";
    statusBorder = "border-red-500/20";
    statusBg = "bg-red-500/10";
  } else if (isHighLoad) {
    statusColor = "text-orange-400";
    statusBorder = "border-orange-500/20";
    statusBg = "bg-orange-500/10";
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
        {/* Background circuit pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%">
                 <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                     <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#grid)" />
             </svg>
        </div>

        <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">Live Load</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{(loadFactor * 100).toFixed(0)}</span>
                    <span className="text-sm font-bold text-slate-500">%</span>
                </div>
            </div>
            <div className={`px-3 py-1 rounded-full border ${statusBorder} ${statusBg} ${statusColor} text-[9px] font-black uppercase tracking-widest flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${isHighLoad ? 'animate-pulse' : ''}`} />
                {status || (isCritical ? 'OVERLOAD' : 'NORMAL')}
            </div>
        </div>

        {/* Gauge Arc */}
        <div className="relative w-full aspect-[2/1] flex items-end justify-center overflow-hidden">
            <div className="absolute bottom-0 w-[80%] h-[160%] rounded-full border-[15px] border-slate-800 border-b-0" />
            
            {/* Ticks */}
            <div className="absolute bottom-0 w-full h-full">
               {[0, 25, 50, 75, 100].map(tick => {
                   const deg = -90 + (tick / 100 * 180);
                   return (
                       <div 
                        key={tick}
                        className="absolute bottom-0 left-1/2 w-0.5 h-1/2 origin-bottom bg-slate-600"
                        style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
                       >
                           <div className="w-full h-2 bg-white/20" />
                       </div>
                   );
               })}
            </div>

            {/* Needle */}
            <div 
                className={`absolute bottom-0 left-1/2 w-1.5 h-[85%] origin-bottom transition-transform duration-700 ease-out z-20 ${isCritical ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'}`}
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            >
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
            </div>
            
            {/* Hub */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-slate-900 border-4 border-slate-700 rounded-full z-30" />
        </div>

        <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-600 font-mono">
            <span>0A</span>
            <span>{maxAmps}A MAX</span>
        </div>
    </div>
  );
};

export default LivePowerGauge;
