
export type WeatherType = 'clear' | 'rain' | 'snow';
export type MaterialType = 'Vinyl' | 'Cedar' | 'Metal';
export type ShedStyleType = 'A-Frame' | 'Modern Studio' | 'Gable' | 'Quaker' | 'Lofted Barn' | 'Utility';
export type TerrainType = 'grass' | 'gravel' | 'concrete';
export type ViewMode = 'exterior' | 'interior';
export type RenderMode = '3D' | 'BLUEPRINT';
export type SidingType = 'lap' | 'board';
export type DoorType = 'single' | 'double' | 'french';

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  advice?: string; // New: LUNAI's architectural reasoning
}

export interface LandscapeItem {
  id: string;
  x: number;
  y: number;
  scale: number;
  layer: 'bg' | 'fg'; // New: Parallax layering
}

export interface ShedAddons {
  ramp: boolean;
  solar: boolean;
  ac: boolean;
  loft: boolean;
  workbench: boolean;
  shedLoo: boolean;
  power_20a?: boolean;
  power_30a?: boolean;
  power_50a?: boolean;
  shedcare?: boolean;
}

export interface ShedSpec {
  style: ShedStyleType;
  material: MaterialType;
  terrain: TerrainType;
  time: number;
  weather: WeatherType;
  viewMode: ViewMode;
  renderMode: RenderMode;
  inventory: any[];
  landscape: LandscapeItem[];
  addons: ShedAddons;
  pitch: number;
  wallColor: string;
  trimColor: string;
  sidingType: SidingType;
  doorType: DoorType;
  width: number;
  depth: number;
  electricalTier?: string | null;
  audioEnabled: boolean; // New: Atmosphere toggle
}

export interface CostEstimate {
  material: number;
  labor: number;
  total: number;
}

// Added missing interfaces for project-wide consistency
export interface ShedData {
  price: number;
  rVal: number;
  baseArea: number;
  walls: string;
  roof: string;
  gable: string;
  floor: string;
}

export interface NatureAsset {
  id: string;
  name: string;
  type: string;
  color: string;
  path: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}

export interface UpgradeItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
  description: string;
}

export interface RoofingJoke {
  icon: string;
  question: string;
  answer: string;
}
