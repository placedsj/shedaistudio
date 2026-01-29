
import { ShedStyleType, ShedData, NatureAsset, Article, RoofingJoke, UpgradeItem } from './types';

export const SHED_DB: Record<ShedStyleType, ShedData> = {
    'A-Frame': { price: 6531, rVal: 12, baseArea: 180, walls: "", roof: "", gable: "", floor: "" },
    'Modern Studio': { price: 6200, rVal: 19, baseArea: 200, walls: "", roof: "", gable: "", floor: "" },
    'Gable': { price: 5100, rVal: 15, baseArea: 160, walls: "", roof: "", gable: "", floor: "" },
    'Quaker': { price: 7975, rVal: 16, baseArea: 160, walls: "", roof: "", gable: "", floor: "" },
    'Lofted Barn': { price: 8436, rVal: 14, baseArea: 240, walls: "", roof: "", gable: "", floor: "" },
    'Utility': { price: 6415, rVal: 15, baseArea: 120, walls: "", roof: "", gable: "", floor: "" }
};

export const COLOR_PALETTE = [
    { name: 'Cloud', hex: '#f8fafc' },
    { name: 'Slate', hex: '#334155' },
    { name: 'Red Barn', hex: '#991b1b' },
    { name: 'Forest', hex: '#166534' },
    { name: 'Midnight', hex: '#0f172a' },
    { name: 'Cedar', hex: '#78350f' }
];

export const NATURE_ASSETS: NatureAsset[] = [
    { id: 'pine-large', name: 'Old Growth Pine', type: 'flora', color: '#064e3b', path: 'M0 0 L-15 30 L15 30 Z M-10 20 L-20 50 L20 50 L10 20 Z' },
    { id: 'juniper', name: 'Juniper', type: 'flora', color: '#065f46', path: 'M-10 10 Q0 -5 10 10 Q20 25 0 25 Q-20 25 -10 10' },
    { id: 'birch', name: 'Paper Birch', type: 'flora', color: '#f8fafc', path: 'M-2 0 L-2 -60 L2 -60 L2 0 Z M0 -40 L15 -55 M0 -25 L-12 -35' }
];

export const DRAFTING_TABLE_POSTS: Article[] = [
    {
        id: 'nb-winter',
        title: "The Saint John Snow Load Paradox",
        subtitle: "Structural Engineering",
        excerpt: "Why standard mainland shed designs fail in the unique micro-climates of the Bay of Fundy.",
        category: "ENGINEERING",
        image: "https://images.unsplash.com/photo-1483344331401-420f8969443d?auto=format&fit=crop&q=80&w=1200",
        isFeatured: true
    },
    {
        id: 'solar-offgrid',
        title: "Micro-Grid Mastery",
        subtitle: "Sustainable Living",
        excerpt: "Sizing your solar array for a 12x16 studio office without breaking the bank.",
        category: "TECH",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 'permit-hacks',
        title: "The 107sqft Loophole",
        subtitle: "Planning & Zoning",
        excerpt: "Navigating New Brunswick building permits for accessory structures.",
        category: "PLANNING",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
    }
];

export const UPGRADES: UpgradeItem[] = [
    { id: 'ramp', name: 'Aluminium Ramp', cost: 450, icon: '🪜', description: 'Heavy-duty 4ft ramp for easy mower access.' },
    { id: 'solar', name: 'Solar Energy Kit', cost: 1200, icon: '☀️', description: 'Off-grid lighting and power station.' },
    { id: 'ac', name: 'Climate Control', cost: 850, icon: '❄️', description: 'Through-wall AC/Heating unit for workshops.' },
    { id: 'loft', name: 'Lofted Storage', cost: 600, icon: '📦', description: 'Built-in overhead storage mezzanine.' },
    { id: 'workbench', name: 'Smart Workbench', cost: 350, icon: '🛠️', description: '8ft custom workbench with tool storage.' },
    { id: 'shedLoo', name: 'The "Loo" Edition', cost: 1500, icon: '🚽', description: 'Self-contained composting system with privacy screen.' }
];

export const TERRAINS = [
    { id: 'grass', name: 'Lush Grass', color: '#14532d', noise: 0.1 },
    { id: 'gravel', name: 'Crushed Rock', color: '#4b5563', noise: 0.8 },
    { id: 'concrete', name: 'Poured Concrete', color: '#94a3b8', noise: 0.2 }
];

export const DOOR_OPTIONS = [
    { id: 'single', name: 'Single Door', path: 'M0 0 L40 0 L40 80 L0 80 Z M5 5 L35 5 L35 75 L5 75 Z' },
    { id: 'double', name: 'Double Barn', path: 'M0 0 L35 0 L35 80 L0 80 Z M40 0 L75 0 L75 80 L40 80 Z' },
    { id: 'french', name: 'French Doors', path: 'M0 0 L35 0 L35 80 L0 80 Z M40 0 L75 0 L75 80 L40 80 Z' }
];

export const SHOWROOM_ITEMS = [
    {
        id: 'lofted-12-28',
        style: 'Lofted Barn' as ShedStyleType,
        title: "12' x 28' Lofted Barn",
        label: "STORAGE SUPERSTAR",
        description: "The ultimate Placed flagship. Massive footprint, double lofts, and Canadian-tough construction.",
        image: "https://images.unsplash.com/photo-1548690312-e3b507d17a12?auto=format&fit=crop&q=80&w=1200",
        badge: "STARTING $14,950"
    },
    {
        id: 'quaker-10-16',
        style: 'Quaker' as ShedStyleType,
        title: "10' x 16' Quaker Shed",
        label: "SHEDLOAD OF AWESOME",
        description: "A fan favorite with saltbox-style asymmetric roof. Perfect for keeping your yard neat.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200",
        badge: "STARTING $7,975"
    }
];

// Added missing constants for feature modules
export const HANDBOOK_ARTICLES: Article[] = DRAFTING_TABLE_POSTS;

export const ROOFING_JOKES: RoofingJoke[] = [
    { icon: '🏠', question: "Why did the shingle join the gymnastics team?", answer: "Because it wanted to do a 'flip' on the roof!" },
    { icon: '🌧️', question: "What do you call a roof that's always cold?", answer: "A 'shiver' shingle!" },
    { icon: '🔨', question: "What's a roofer's favorite type of music?", answer: "Heavy Metal (roofing)!" },
    { icon: '⚖️', question: "Why are roofers so honest?", answer: "They're always on the up and up!" }
];

export const COMPARISON_DATA = {
    model: "10x12 Gable",
    placedPrice: 5100,
    competitorPrice: 6800,
    savings: 1700
};
