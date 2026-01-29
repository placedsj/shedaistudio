
import React from 'react';
import PaulsRoofingLogo from './PaulsRoofingLogo';

export const Header = () => (
    <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="w-40 h-12"><PaulsRoofingLogo /></div>
            <nav className="hidden md:flex gap-6 text-zinc-300 text-sm font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Process</a>
                <a href="#" className="hover:text-white transition-colors">Inspection</a>
                <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors">Call Now</a>
            </nav>
        </div>
    </header>
);

export const Footer = () => (
    <footer className="bg-zinc-950 text-zinc-500 py-10 px-6 text-center text-xs uppercase tracking-widest">
        © 2025 Paul's Roofing. All Rights Reserved.
    </footer>
);

export const ContactForm = () => (
    <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700">
        <h3 className="text-white text-xl font-bold mb-4">Quick Contact</h3>
        <input className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded mb-3 text-white outline-none focus:border-orange-500 transition-colors" placeholder="Email" />
        <textarea className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded mb-3 text-white outline-none focus:border-orange-500 transition-colors" placeholder="Message" rows={3} />
        <button className="bg-orange-600 text-white w-full py-3 rounded font-bold uppercase hover:bg-orange-500 transition-colors">Send</button>
    </div>
);

// UI Components
export const Card = ({ children, className }: any) => <div className={`bg-white rounded-xl shadow-sm border border-zinc-200 ${className || ''}`}>{children}</div>;
export const CardHeader = ({ children, className }: any) => <div className={`p-6 border-b border-zinc-100 ${className || ''}`}>{children}</div>;
export const CardTitle = ({ children, className }: any) => <h3 className={`text-lg font-bold ${className || ''}`}>{children}</h3>;
export const CardContent = ({ children, className }: any) => <div className={`p-6 ${className || ''}`}>{children}</div>;
export const Badge = ({ children, className }: any) => <span className={`px-2 py-1 rounded-full text-xs font-bold ${className || ''}`}>{children}</span>;

// Icon Mocks
export const Phone = ({className}: any) => <span className={className}>📞</span>;
export const Calendar = ({className}: any) => <span className={className}>📅</span>;
export const Search = ({className}: any) => <span className={className}>🔍</span>;
export const FileText = ({className}: any) => <span className={className}>📄</span>;
export const Palette = ({className}: any) => <span className={className}>🎨</span>;
export const Truck = ({className}: any) => <span className={className}>🚛</span>;
export const Hammer = ({className}: any) => <span className={className}>🔨</span>;
export const CheckCircle = ({className}: any) => <span className={className}>✅</span>;
export const Clock = ({className}: any) => <span className={className}>⏰</span>;
export const Shield = ({className}: any) => <span className={className}>🛡️</span>;
export const Camera = ({className}: any) => <span className={className}>📸</span>;
export const Users = ({className}: any) => <span className={className}>👥</span>;
export const Star = ({className}: any) => <span className={className}>⭐</span>;
export const ArrowRight = ({className}: any) => <span className={className}>→</span>;
export const MapPin = ({className}: any) => <span className={className}>📍</span>;
export const DollarSign = ({className}: any) => <span className={className}>💲</span>;
export const AlertCircle = ({className}: any) => <span className={className}>⚠️</span>;
export const Award = ({className}: any) => <span className={className}>🏆</span>;
