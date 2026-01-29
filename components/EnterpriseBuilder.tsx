import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProjectService } from '../services/projectService';
import { ShedSpec, CostEstimate, ShedStyleType, UpgradeItem, ShedAddons, LandscapeItem, RenderMode, WeatherType, ChatMessage } from '../types';
import { SHED_DB, UPGRADES, NATURE_ASSETS, COLOR_PALETTE } from '../constants';
import { generateConfigFromPrompt } from '../services/geminiService';
import ShedVisualizer from './ShedVisualizer';
import WeatherOverlay from './WeatherOverlay';

interface EnterpriseBuilderProps {
    onBack?: () => void;
    initialStyle?: string;
    initialSpec?: ShedSpec;
    onCheckout?: (spec: ShedSpec, costs: CostEstimate) => void;
    onSpecChange?: (spec: ShedSpec) => void;
}

const EnterpriseBuilder: React.FC<EnterpriseBuilderProps> = (props) => {
    const { onBack, initialStyle, initialSpec, onCheckout, onSpecChange } = props;

    const defaultShedSpec: ShedSpec = {
        style: 'A-Frame',
        material: 'Vinyl',
        terrain: 'grass',
        time: 50,
        weather: 'clear',
        viewMode: 'exterior',
        renderMode: '3D',
        inventory: [],
        landscape: [],
        addons: {
            ramp: false, solar: false, ac: false, loft: false, workbench: false, shedLoo: false,
            power_20a: false, power_30a: false, power_50a: false, shedcare: false
        },
        pitch: 6,
        wallColor: '#f8fafc',
        trimColor: '#334155',
        sidingType: 'lap',
        doorType: 'single',
        width: 10,
        depth: 12,
        electricalTier: null,
        audioEnabled: false,
    };

    const [spec, setSpecInternal] = useState<ShedSpec>(() => {
        const initial: Partial<ShedSpec> = initialSpec || {};
        const effectiveStyle = initialStyle && SHED_DB[initialStyle]
                               ? initialStyle as ShedStyleType
                               : (initial.style || defaultShedSpec.style);
        return {
            ...defaultShedSpec,
            ...initial,
            style: effectiveStyle,
            landscape: initial.landscape || [],
            addons: { ...defaultShedSpec.addons, ...initial.addons }
        };
    });

    const [chat, setChat] = useState<ChatMessage[]>([{ 
        role: 'ai', 
        text: "I am LUNAI. I can adjust your build and provide architectural advice.",
        advice: "Tip: For NB coastal winds, I recommend Board & Batten siding for superior interlocking."
    }]);
    const [isThinking, setIsThinking] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const chatMessagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [chat]);

    const updateSpec = (updates: Partial<ShedSpec>) => {
        setSpecInternal(prevSpec => {
            const newSpec = { ...prevSpec, ...updates };
            onSpecChange?.(newSpec);
            return newSpec;
        });
    };

    const handleCommand = async (txt: string) => {
        setChat(c => [...c, { role: 'user', text: txt }]);
        setIsThinking(true);
        try {
            const geminiResponse = await generateConfigFromPrompt(txt, spec);
            if (geminiResponse) {
                updateSpec({ ...geminiResponse });
                setChat(prev => [...prev, { 
                    role: 'ai', 
                    text: geminiResponse.explanation || "System Updated.",
                    advice: geminiResponse.advice 
                }]);
            }
        } catch (e) {
            setChat(prev => [...prev, { role: 'ai', text: "Signal lost. Please rephrase." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="w-full h-screen flex overflow-hidden font-sans text-white transition-all duration-1000 relative"
             style={{ background: spec.renderMode === 'BLUEPRINT' ? '#1e3a8a' : `linear-gradient(to bottom, #0f172a ${spec.time}%, #3b82f6 100%)` }}>
            
            <WeatherOverlay type={spec.weather} time={spec.time} />

            {/* Top Bar Actions */}
            <div className="absolute top-8 left-8 z-[110] flex gap-2">
                {onBack && <button onClick={onBack} className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg border border-white/20 hover:bg-slate-800 text-xs font-bold">← EXIT</button>}
                <button onClick={() => updateSpec({ audioEnabled: !spec.audioEnabled })} className={`px-4 py-2 rounded-lg border border-white/20 transition-all text-xs font-bold ${spec.audioEnabled ? 'bg-blue-600' : 'bg-slate-900/80'}`}>
                    {spec.audioEnabled ? '🔊 SOUND ON' : '🔇 MUTE'}
                </button>
            </div>

            {/* Top HUD: Style Switcher */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/20">
                {Object.keys(SHED_DB).map(s => (
                    <button
                        key={s}
                        onClick={() => updateSpec({ style: s as ShedStyleType })}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${spec.style === s ? 'bg-white text-blue-900' : 'text-slate-400 hover:text-white'}`}
                    >
                        {s.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Left: Environment Hub */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 items-center">
                 <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-3 rounded-2xl flex flex-col gap-4">
                    {['clear', 'rain', 'snow'].map((wType) => (
                        <button
                            key={wType}
                            onClick={() => updateSpec({ weather: wType as WeatherType })}
                            className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center text-xl
                                ${spec.weather === wType ? 'bg-blue-600 shadow-lg' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                        >
                            {wType === 'clear' ? '☀️' : wType === 'rain' ? '🌧️' : '❄️'}
                        </button>
                    ))}
                 </div>
                 <div className="h-40 w-1.5 bg-white/10 rounded-full relative">
                     <input 
                        type="range" min="0" max="100" value={spec.time} 
                        onChange={(e) => updateSpec({ time: parseInt(e.target.value) })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        style={{ writingMode: 'vertical-lr' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full transition-all" style={{ height: `${spec.time}%` }} />
                 </div>
            </div>

            {/* Right: Material Tray (Tactile Panel) */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-end">
                <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-4 rounded-[2rem] flex flex-col gap-3 shadow-2xl">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-center">Color</span>
                    <div className="grid grid-cols-2 gap-2">
                        {COLOR_PALETTE.map(c => (
                            <button 
                                key={c.hex} 
                                onClick={() => updateSpec({ wallColor: c.hex })}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${spec.wallColor === c.hex ? 'border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                    <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                        <button onClick={() => updateSpec({ sidingType: 'lap' })} className={`text-[9px] font-black p-2 rounded-lg ${spec.sidingType === 'lap' ? 'bg-white text-slate-900' : 'bg-slate-800'}`}>LAP</button>
                        <button onClick={() => updateSpec({ sidingType: 'board' })} className={`text-[9px] font-black p-2 rounded-lg ${spec.sidingType === 'board' ? 'bg-white text-slate-900' : 'bg-slate-800'}`}>BOARD</button>
                    </div>
                </div>
            </div>

            {/* Main Visualizer */}
            <div className="flex-1 flex items-center justify-center relative">
                <ShedVisualizer spec={spec} weather={spec.weather} />
                {spec.audioEnabled && spec.weather !== 'clear' && (
                    <div className="absolute bottom-32 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30 text-[10px] font-black animate-pulse">
                        IMMERSIVE AUDIO SYNCED: {spec.weather.toUpperCase()} AMBIENCE
                    </div>
                )}
            </div>

            {/* Landscape Dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-2 rounded-3xl flex gap-2 shadow-2xl">
                    {NATURE_ASSETS.map(n => (
                        <button
                            key={n.id}
                            onClick={() => updateSpec({ landscape: [...spec.landscape, { id: n.id, x: Math.random()*200 - 100, y: 50, scale: 0.8 + Math.random()*0.4, layer: Math.random() > 0.5 ? 'fg' : 'bg' }] })}
                            className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all flex flex-col items-center justify-center"
                        >
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: n.color }}></div>
                            <span className="text-[7px] font-black uppercase mt-1 text-slate-500">{n.name}</span>
                        </button>
                    ))}
                    <button onClick={() => updateSpec({ landscape: [] })} className="w-14 h-14 rounded-2xl border border-red-900/30 text-red-500 hover:bg-red-900/10">CLR</button>
                </div>
            </div>

            {/* LUNAI Chat Panel */}
            <div className="fixed bottom-8 right-8 z-[120] flex flex-col items-end">
                <div className={`w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-500 origin-bottom-right ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-800/50 rounded-t-[2.5rem]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">LUNAI Intelligence</span>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-white/30 hover:text-white">✕</button>
                    </div>
                    <div className="h-80 p-5 space-y-4 overflow-y-auto no-scrollbar scroll-smooth">
                        {chat.map((m,i) => (
                            <div key={i} className="space-y-2">
                                <div className={`p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${m.role === 'ai' ? 'bg-slate-800 text-slate-300' : 'bg-blue-600 text-white ml-8 shadow-lg'}`}>
                                    {m.text}
                                </div>
                                {m.advice && (
                                    <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
                                        <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Architectural Insight</div>
                                        <div className="text-[10px] text-blue-100 italic">"{m.advice}"</div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex gap-1 p-2">
                                {[1,2,3].map(d => <div key={d} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${d*0.1}s` }} />)}
                            </div>
                        )}
                        <div ref={chatMessagesEndRef} />
                    </div>
                    <div className="p-4 pt-0">
                        <input 
                            className="w-full bg-slate-950 border border-white/5 p-4 text-[11px] text-white outline-none focus:border-blue-600 rounded-2xl shadow-inner"
                            placeholder="Try 'Add a shed loo' or 'Make it modern'..."
                            onKeyDown={(e: any) => {
                                if(e.key === 'Enter' && e.target.value.trim()) {
                                    handleCommand(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                    </div>
                </div>
                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`mt-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all ${isChatOpen ? 'bg-slate-800 rotate-180' : 'bg-blue-600 scale-110 hover:scale-125'}`}
                >
                    {isChatOpen ? '↓' : '💬'}
                </button>
            </div>
            
            <style>{`
                @keyframes sway {
                    0%, 100% { transform: rotate(-1deg); }
                    50% { transform: rotate(1deg); }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default EnterpriseBuilder;
