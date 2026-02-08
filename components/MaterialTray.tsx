
import React from 'react';
import { COLOR_PALETTE } from '../constants';
import { SidingType } from '../types';

interface MaterialTrayProps {
    wallColor: string;
    sidingType: SidingType;
    onUpdate: (updates: any) => void;
}

const MaterialTray: React.FC<MaterialTrayProps> = ({ wallColor, sidingType, onUpdate }) => {
    return (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-end">
            <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-4 rounded-[2rem] flex flex-col gap-3 shadow-2xl">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-center mb-2">Palette</span>
                <div className="grid grid-cols-2 gap-2">
                    {COLOR_PALETTE.map(c => (
                        <button 
                            key={c.hex} 
                            onClick={() => onUpdate({ wallColor: c.hex })}
                            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${wallColor === c.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                        />
                    ))}
                </div>
                
                <div className="border-t border-white/10 mt-2 pt-4 flex flex-col gap-2">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">Interlocking</span>
                    <button 
                        onClick={() => onUpdate({ sidingType: 'lap' })} 
                        className={`text-[9px] font-black p-2 rounded-lg transition-all ${sidingType === 'lap' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        LAP SIDING
                    </button>
                    <button 
                        onClick={() => onUpdate({ sidingType: 'board' })} 
                        className={`text-[9px] font-black p-2 rounded-lg transition-all ${sidingType === 'board' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        BOARD & BATTEN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MaterialTray;
