
import React, { useState, useEffect } from 'react';
import { ShedSpec, CostEstimate, ShedStyleType, WeatherType, ChatMessage, GenerateConfigResponse, LLMConfigResponse } from '../types';
import { SHED_DB, NATURE_ASSETS, VALID_WEATHER_TYPES } from '../constants';
import { generateConfigFromPrompt } from '../services/geminiService';
import { atmosphere } from '../services/atmosphereService';
import ShedVisualizer from './ShedVisualizer';
import WeatherOverlay from './WeatherOverlay';
import EnvironmentHub from './EnvironmentHub';
import MaterialTray from './MaterialTray';
import LUNAIChat from './LUNAIChat';

interface EnterpriseBuilderProps {
    onBack?: () => void;
    initialSpec?: Partial<ShedSpec>;
    onCheckout?: (spec: ShedSpec, costs: CostEstimate) => void;
}

const EnterpriseBuilder: React.FC<EnterpriseBuilderProps> = ({ onBack, initialSpec, onCheckout }) => {
    const defaultSpec: ShedSpec = {
        style: 'A-Frame',
        material: 'Vinyl',
        terrain: 'grass',
        time: 50,
        weather: 'clear',
        viewMode: 'exterior',
        renderMode: '3D',
        inventory: [],
        landscape: [],
        addons: { ramp: false, solar: false, ac: false, loft: false, workbench: false, shedLoo: false },
        pitch: 6,
        wallColor: '#f8fafc',
        trimColor: '#334155',
        sidingType: 'lap',
        doorType: 'single',
        width: 10,
        depth: 12,
        audioEnabled: false
    };

    const [spec, setSpec] = useState<ShedSpec>({ ...defaultSpec, ...initialSpec });
    const [isCinematic, setIsCinematic] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [chatOptions, setChatOptions] = useState({ search: false, maps: false, thinking: true });
    const [chat, setChat] = useState<ChatMessage[]>([{ 
        role: 'ai', 
        text: "LUNAI Intelligence Online. World Builder active. Atmospheric engines synchronized.",
        advice: "Design Tip: Heavy snowfall in Saint John requires at least a 9/12 pitch for long-term structural health."
    }]);

    useEffect(() => {
        if (spec.audioEnabled) atmosphere.start();
        atmosphere.update(spec.weather, spec.time, spec.audioEnabled);
    }, [spec.audioEnabled, spec.weather, spec.time]);

    const handleSpecUpdate = (updates: Partial<ShedSpec>) => {
        setSpec(prev => ({ ...prev, ...updates }));
    };

    const handleOptionToggle = (key: string) => {
        setChatOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const handleCommand = async (txt: string) => {
        setChat(c => [...c, { role: 'user', text: txt }]);
        setIsThinking(true);
        try {
            const response = await generateConfigFromPrompt(txt, spec, {
                useSearchGrounding: chatOptions.search,
                useMapsGrounding: chatOptions.maps,
                deepThinking: chatOptions.thinking
            });

            if ('text' in response) {
                setChat(c => [...c, { role: 'ai', text: response.text, groundingUrls: response.groundingUrls }]);
            } else {
                const config = response as LLMConfigResponse & { groundingUrls?: any[] };
                const updates: Partial<ShedSpec> = {};
                if (config.style) updates.style = config.style as ShedStyleType;
                if (config.weather && VALID_WEATHER_TYPES.includes(config.weather as WeatherType)) updates.weather = config.weather as WeatherType;
                if (config.width) updates.width = config.width;
                if (config.depth) updates.depth = config.depth;
                if (config.pitch) updates.pitch = config.pitch;
                if (config.wallColor) updates.wallColor = config.wallColor;
                if (config.addons) updates.addons = { ...spec.addons, ...config.addons };
                handleSpecUpdate(updates);
                setChat(c => [...c, { role: 'ai', text: config.explanation || "System optimized.", advice: config.advice, groundingUrls: config.groundingUrls }]);
            }
        } catch (e) {
            setChat(c => [...c, { role: 'ai', text: "Processing error. Please restate command." }]);
        } finally {
            setIsThinking(false);
        }
    };

    const calculateCosts = (): CostEstimate => {
        const base = SHED_DB[spec.style]?.price || 5000;
        const sizeMod = (spec.width * spec.depth) / 120;
        const mat = Math.ceil(base * sizeMod);
        const labor = Math.ceil(mat * 0.45);
        return { material: mat, labor, total: mat + labor };
    };

    return (
        <div className={`w-full h-screen flex overflow-hidden font-sans text-white relative transition-all duration-1000 ${isCinematic ? 'cursor-none' : ''}`}
             style={{ background: spec.renderMode === 'BLUEPRINT' ? '#1e3a8a' : `linear-gradient(to bottom, #0f172a ${spec.time}%, #1e293b 100%)` }}>
            <WeatherOverlay type={spec.weather} time={spec.time} />
            <div className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 ${isCinematic ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 w-full h-24 bg-black" />
                <div className="absolute bottom-0 w-full h-24 bg-black" />
            </div>
            <div className="absolute top-24 left-8 z-[110] flex gap-3">
                {onBack && <button onClick={onBack} className="bg-slate-900/80 backdrop-blur px-5 py-2 rounded-xl border border-white/20 hover:bg-slate-800 text-xs font-black uppercase tracking-widest">← EXIT</button>}
                <button onClick={() => setIsCinematic(!isCinematic)} className={`bg-slate-900/80 backdrop-blur px-5 py-2 rounded-xl border border-white/20 hover:bg-slate-800 text-xs font-black ${isCinematic ? 'text-blue-400' : 'text-white'}`}>
                    {isCinematic ? '🎥 PHOTO MODE ON' : '📷 STANDARD VIEW'}
                </button>
            </div>
            <EnvironmentHub weather={spec.weather} time={spec.time} audioEnabled={spec.audioEnabled} onUpdate={handleSpecUpdate} />
            <MaterialTray wallColor={spec.wallColor} sidingType={spec.sidingType} onUpdate={handleSpecUpdate} />
            <LUNAIChat chat={chat} isThinking={isThinking} isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} onCommand={handleCommand} options={chatOptions} onOptionToggle={handleOptionToggle} />
            <div className={`flex-1 flex items-center justify-center relative select-none transition-all duration-[2000ms] ${isCinematic ? 'scale-110 translate-y-4' : 'scale-100'}`}>
                <div className={`${isCinematic ? 'animate-[float_8s_ease-in-out_infinite]' : ''}`}>
                    <ShedVisualizer spec={spec} weather={spec.weather} />
                </div>
            </div>
            <div className={`absolute bottom-8 left-8 z-30 flex flex-col gap-3 transition-opacity duration-500 ${isCinematic ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[280px]">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Build Config</span>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">{spec.width}' × {spec.depth}' {spec.style}</h2>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                         <div className="flex flex-col">
                             <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Est. Total</span>
                             <span className="text-lg font-black font-mono">${calculateCosts().total.toLocaleString()}</span>
                         </div>
                         <div className="flex flex-col border-l border-white/5 pl-4">
                             <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">Siding</span>
                             <span className="text-lg font-black uppercase">{spec.sidingType}</span>
                         </div>
                    </div>
                </div>
                <button onClick={() => onCheckout?.(spec, calculateCosts())} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all">Review Order →</button>
            </div>
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 ${isCinematic ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-3 rounded-[2.5rem] flex gap-3 shadow-2xl">
                    {NATURE_ASSETS.map(n => (
                        <button key={n.id} onClick={() => handleSpecUpdate({ landscape: [...spec.landscape, { id: n.id, x: Math.random()*240 - 120, y: 50, scale: 0.8 + Math.random()*0.4, layer: Math.random() > 0.5 ? 'fg' : 'bg' }] })} className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all flex flex-col items-center justify-center group">
                            <div className="w-4 h-4 rounded-full group-hover:scale-150 transition-transform mb-1" style={{ backgroundColor: n.color }}></div>
                            <span className="text-[7px] font-black uppercase text-slate-500 group-hover:text-blue-400">{n.name.split(' ')[0]}</span>
                        </button>
                    ))}
                    <div className="w-[1px] bg-white/10 mx-1" />
                    <button onClick={() => handleSpecUpdate({ landscape: [] })} className="w-14 h-14 rounded-2xl border border-red-900/30 text-red-500 hover:bg-red-900/20 text-[9px] font-black uppercase">CLR</button>
                </div>
            </div>
            <style>{`
                @keyframes sway { 0%, 100% { transform: rotate(-1.5deg); } 50% { transform: rotate(2deg); } }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default EnterpriseBuilder;
