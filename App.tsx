
import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import EnterpriseBuilder from './components/EnterpriseBuilder';
import Handbook from './components/Handbook';
import ROICalculator from './components/ROICalculator';
import CheckoutFlow from './components/CheckoutFlow';
import Contact from './components/Contact';
import ShedLanding from './components/ShedLanding';
import BlogSystem from './components/BlogSystem';
import AIFeatureGallery from './components/AIFeatureGallery';
import { ShedStyleType, ShedSpec, CostEstimate, WeatherType } from './types';
import { BRAND_CONFIG, CURRENT_BRAND } from './config/branding';

const Header = ({ onHome, onBuild, onHandbook, onCalculator, onContact, onBlog, onAIGallery }: any) => {
    const brand = BRAND_CONFIG[CURRENT_BRAND];
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/5 backdrop-blur-xl px-10 py-5 flex justify-between items-center border-b border-white/10">
            <div onClick={onHome} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-10 h-10 ${brand.logoColor} rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg`}>
                    {brand.logoLetter}
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{brand.headerTitle}</span>
                    <span className="text-sm font-bold text-orange-500 tracking-tighter">{brand.headerSubtitle}</span>
                </div>
            </div>
            <div className="hidden xl:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                <button onClick={onBuild} className="hover:text-white transition-colors">Builder</button>
                <button onClick={onAIGallery} className="hover:text-white transition-colors text-purple-400">AI Forge</button>
                <button onClick={onHandbook} className="hover:text-white transition-colors">Handbook</button>
                <button onClick={onBlog} className="hover:text-white transition-colors">Blog</button>
                <button onClick={onCalculator} className="hover:text-white transition-colors">ROI</button>
                <button onClick={onContact} className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-500 transition-all text-[10px] font-black uppercase tracking-widest">Get Quote</button>
            </div>
        </nav>
    );
};

const App: React.FC = () => {
    const [view, setView] = useState<'landing' | 'showroom' | 'builder' | 'handbook' | 'calculator' | 'checkout' | 'contact' | 'blog' | 'ai-gallery'>('landing');
    
    const getInitialSpecFromURL = (): ShedSpec | null => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has('style')) return null;
        return {
            style: params.get('style') as ShedStyleType || 'Modern Studio',
            width: parseInt(params.get('width') || '10'),
            depth: parseInt(params.get('depth') || '12'),
            wallColor: params.get('color') ? `#${params.get('color')}` : '#f8fafc',
            sidingType: (params.get('siding') as any) || 'lap',
            addons: { ramp: false, solar: false, ac: false, loft: false, workbench: false, shedLoo: false },
            material: 'Metal', terrain: 'grass', time: 50, viewMode: 'exterior',
            renderMode: '3D', inventory: [], landscape: [], pitch: 6, trimColor: '#334155', doorType: 'single',
            weather: (params.get('weather') as WeatherType) || 'clear',
            audioEnabled: false,
        };
    };

    const initialSpecFromURL = getInitialSpecFromURL();
    const [currentSpec, setCurrentSpec] = useState<ShedSpec | null>(initialSpecFromURL);
    const [currentCosts, setCurrentCosts] = useState<CostEstimate | null>(null);

    return (
        <main className="w-full h-screen overflow-hidden font-sans bg-[#020617]">
            <Header
                onHome={() => setView('landing')}
                onBuild={() => setView('builder')}
                onHandbook={() => setView('handbook')}
                onCalculator={() => setView('calculator')}
                onContact={() => setView('contact')}
                onBlog={() => setView('blog')}
                onAIGallery={() => setView('ai-gallery')}
            />
            <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                {view === 'landing' && <ShedLanding onStart={() => setView('builder')} onHandbook={() => setView('handbook')} onCalculator={() => setView('calculator')} />}
                {view === 'builder' && (
                    <EnterpriseBuilder
                        initialSpec={initialSpecFromURL || undefined}
                        onBack={() => setView('landing')}
                        onCheckout={(spec, costs) => {
                            setCurrentSpec(spec);
                            setCurrentCosts(costs);
                            setView('checkout');
                        }}
                    />
                )}
                {view === 'ai-gallery' && <AIFeatureGallery onBack={() => setView('builder')} />}
                {view === 'blog' && <BlogSystem />}
                {view === 'handbook' && <Handbook />}
                {view === 'calculator' && <ROICalculator />}
                {view === 'contact' && <Contact />}
                {view === 'checkout' && currentSpec && currentCosts && (
                    <CheckoutFlow
                        spec={currentSpec}
                        costs={currentCosts}
                        onCancel={() => setView('builder')}
                        onComplete={() => setView('landing')}
                    />
                )}
            </div>
            <SpeedInsights />
            <Analytics />
        </main>
    );
};
export default App;
