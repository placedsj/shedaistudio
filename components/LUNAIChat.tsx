
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface LUNAIChatProps {
    chat: ChatMessage[];
    isThinking: boolean;
    isOpen: boolean;
    onToggle: () => void;
    onCommand: (cmd: string) => void;
    options: {
        search: boolean;
        maps: boolean;
        thinking: boolean;
    };
    onOptionToggle: (key: string) => void;
}

const LUNAIChat: React.FC<LUNAIChatProps> = ({ chat, isThinking, isOpen, onToggle, onCommand, options, onOptionToggle }) => {
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [chat]);

    const getActiveEngine = () => {
        if (options.maps) return 'GEMINI 2.5 FLASH MAPS';
        if (options.search) return 'GEMINI 3 FLASH SEARCH';
        return 'GEMINI 3 PRO ARCHITECT';
    };

    return (
        <div className="fixed bottom-8 right-8 z-[120] flex flex-col items-end">
            <div className={`w-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">LUNAI Interface</span>
                    </div>
                    <button onClick={onToggle} className="text-white/30 hover:text-white text-2xl px-2">×</button>
                </div>

                <div className="bg-slate-900/50 px-5 py-3 border-b border-white/5">
                    <div className="flex justify-between items-center mb-3 text-[7px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Active Engine</span>
                        <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">{getActiveEngine()}</span>
                    </div>
                    <div className="flex justify-around gap-2 text-[8px] font-black uppercase tracking-widest">
                        <button onClick={() => onOptionToggle('search')} className={`flex-1 py-1.5 rounded-lg transition-all ${options.search ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>Search</button>
                        <button onClick={() => onOptionToggle('maps')} className={`flex-1 py-1.5 rounded-lg transition-all ${options.maps ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>Maps</button>
                        <button onClick={() => onOptionToggle('thinking')} className={`flex-1 py-1.5 rounded-lg transition-all ${options.thinking ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'}`}>Think</button>
                    </div>
                </div>

                <div className="h-80 p-5 space-y-4 overflow-y-auto no-scrollbar scroll-smooth">
                    {chat.map((m, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className={`p-4 rounded-2xl text-[11px] font-medium leading-relaxed ${m.role === 'ai' ? 'bg-slate-800 text-slate-300' : 'bg-blue-600 text-white ml-8 shadow-xl'}`}>
                                {m.text}
                            </div>
                            {m.advice && (
                                <div className="mt-2 p-3 bg-blue-900/30 border border-blue-500/20 rounded-2xl">
                                    <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Architectural Reasoning</div>
                                    <div className="text-[10px] text-blue-100 italic leading-snug">"{m.advice}"</div>
                                </div>
                            )}
                            {m.groundingUrls && m.groundingUrls.length > 0 && (
                                <div className="mt-2 p-3 bg-green-900/10 border border-green-500/20 rounded-2xl">
                                    <div className="text-[7px] font-black text-green-400 uppercase mb-2">Sources Found</div>
                                    <div className="flex flex-col gap-1">
                                        {m.groundingUrls.map((u, idx) => (
                                            <a key={idx} href={u.uri} target="_blank" rel="noopener noreferrer" className="text-[8px] text-green-200/60 hover:text-green-200 truncate underline">🔗 {u.title || u.uri}</a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isThinking && <div className="flex gap-2 p-2 items-center"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"/><span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Reasoning...</span></div>}
                    <div ref={endRef} />
                </div>

                <div className="p-4 bg-slate-800/20">
                    <input 
                        className="w-full bg-slate-950 border border-white/5 p-4 text-[11px] text-white outline-none focus:border-blue-600 rounded-2xl"
                        placeholder="Try '12x14 slate blue' or 'Snow rules in Saint John'..."
                        onKeyDown={(e: any) => {
                            if(e.key === 'Enter' && e.target.value.trim()) {
                                onCommand(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                </div>
            </div>
            <button onClick={onToggle} className={`mt-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all ${isOpen ? 'bg-slate-800 rotate-180' : 'bg-blue-600 hover:scale-110'}`}>{isOpen ? '↓' : '💬'}</button>
        </div>
    );
};

export default LUNAIChat;
