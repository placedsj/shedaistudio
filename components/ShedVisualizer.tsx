
import React, { useMemo } from 'react';
import { ShedSpec, WeatherType } from '../types';
import { TERRAINS, NATURE_ASSETS, DOOR_OPTIONS } from '../constants';

interface ShedVisualizerProps {
    spec: ShedSpec;
    weather: WeatherType;
}

const ShedVisualizer: React.FC<ShedVisualizerProps> = ({ spec, weather }) => {
    const isBlueprint = spec.renderMode === 'BLUEPRINT';
    const terrainData = TERRAINS.find(t => t.id === spec.terrain) || TERRAINS[0];
    const isNight = spec.time > 80 || spec.time < 20;
    
    const sW = spec.width * 15;
    const sD = spec.depth * 15;
    const wTop = -120;
    const wL = -sW / 2;
    const wR = sW / 2;

    const geo = useMemo(() => {
        const roofHeight = sW * (spec.pitch / 24);
        const depthOffset = sD * 0.4;

        if (spec.style === 'Modern Studio') {
            const studioPeak = wTop - (roofHeight * 1.2);
            return {
                walls: `M${wR} 0 L${wR} ${wTop} L${wL} ${wTop} L${wL} 0 Z`,
                walls3D: `M${wR} 0 L${wR + depthOffset} ${-depthOffset} L${wR + depthOffset} ${wTop - depthOffset} L${wR} ${wTop} Z`,
                roof: `M${wL-10} ${wTop} L${wR+10} ${studioPeak} L${wR+depthOffset+10} ${studioPeak-depthOffset} L${wL+depthOffset-10} ${wTop-depthOffset} Z`,
                gable: `M${wL} ${wTop} L${wR} ${studioPeak} L${wR} ${wTop} Z`,
                floor: `M${wL} 0 L${wR} 0 L${wR + depthOffset} ${-depthOffset} L${wL + depthOffset} ${-depthOffset} Z`
            };
        }

        const peak = wTop - roofHeight;
        return {
            walls: `M${wR} 0 L${wR} ${wTop} L${wL} ${wTop} L${wL} 0 Z`,
            walls3D: `M${wR} 0 L${wR + depthOffset} ${-depthOffset} L${wR + depthOffset} ${wTop - depthOffset} L${wR} ${wTop} Z`,
            roof: `M${wL-5} ${wTop} L${wR+5} ${wTop} L0 ${peak} Z`,
            sideRoof: `M0 ${peak} L${wR+5} ${wTop} L${wR+depthOffset+5} ${wTop-depthOffset} L${depthOffset} ${peak-depthOffset} Z`,
            gable: `M${wL} ${wTop} L0 ${peak} L${wR} ${wTop} Z`,
            floor: `M${wL} 0 L${wR} 0 L${wR + depthOffset} ${-depthOffset} L${wL + depthOffset} ${-depthOffset} Z`
        };
    }, [spec.style, spec.pitch, sW, sD, wL, wR, wTop]);

    const wallColor = isBlueprint ? '#1e3a8a' : spec.wallColor;
    const trimColor = isBlueprint ? 'white' : spec.trimColor;
    const roofColor = isBlueprint ? 'none' : (weather === 'snow' ? '#f8fafc' : '#1e293b');
    const lineColor = isBlueprint ? 'white' : '#020617';
    const shadowSkew = spec.time < 50 ? 60 - (spec.time / 50) * 60 : -((spec.time - 50) / 50) * 60;

    return (
        <svg viewBox="0 0 500 500" className="w-full max-w-[850px] h-auto transition-all duration-700 overflow-visible drop-shadow-2xl">
            <defs>
                <filter id="blurShadow"><feGaussianBlur in="SourceGraphic" stdDeviation="5" /></filter>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="cb"/><feMerge><feMergeNode in="cb"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <pattern id="lapSiding" width="100" height="15" patternUnits="userSpaceOnUse">
                    <rect width="100" height="15" fill={wallColor} />
                    <rect width="100" height="1.5" y="13.5" fill="black" fillOpacity="0.1" />
                </pattern>
                <pattern id="boardSiding" width="24" height="100" patternUnits="userSpaceOnUse">
                    <rect width="24" height="100" fill={wallColor} />
                    <rect width="2" height="100" x="22" fill="black" fillOpacity="0.1" />
                </pattern>
            </defs>

            <g transform="translate(250, 360)">
                {!isBlueprint && (
                    <g transform={`skewX(${shadowSkew}) translate(${shadowSkew * -1.5}, 0)`}>
                        <ellipse cx="0" cy="10" rx={sW/1.2} ry="30" fill="#000" opacity={weather === 'clear' ? "0.4" : "0.1"} filter="url(#blurShadow)" />
                    </g>
                )}

                <path d="M-250 10 L0 100 L250 10 L0 -80 Z" fill={terrainData.color} className="transition-colors duration-1000 opacity-80" />

                {spec.landscape.filter(l => l.layer === 'bg').map((p, i) => (
                    <g key={`bg-${i}`} transform={`translate(${p.x}, ${p.y - 10}) scale(${p.scale})`}>
                        <path d={NATURE_ASSETS.find(n => n.id === p.id)?.path} fill="#020617" opacity="0.4" className="animate-[sway_4s_ease-in-out_infinite]" />
                    </g>
                ))}

                <g className="transition-all duration-1000">
                    <path d={geo.walls3D} fill={spec.sidingType === 'lap' ? "url(#lapSiding)" : "url(#boardSiding)"} stroke={lineColor} />
                    <path d={geo.walls3D} fill="black" fillOpacity="0.2" />
                    <path d={geo.walls} fill={spec.sidingType === 'lap' ? "url(#lapSiding)" : "url(#boardSiding)"} stroke={lineColor} />

                    {isNight && !isBlueprint && (
                        <g transform="translate(-40, -80)" filter="url(#glow)">
                            <rect width="20" height="20" fill="#fde047" opacity="0.6" />
                            <rect width="20" height="20" fill="none" stroke="#ca8a04" strokeWidth="1" />
                        </g>
                    )}

                    <path d={geo.roof} fill={roofColor} stroke={lineColor} />
                    <path d={geo.gable} fill={wallColor} stroke={lineColor} />
                    <path d={geo.roof} fill="none" stroke={trimColor} strokeWidth="3" />

                    <g transform={`translate(${spec.doorType === 'double' ? -35 : -20}, -95)`}>
                        {DOOR_OPTIONS.find(d => d.id === spec.doorType)?.path.split('M').slice(1).map((p, i) => (
                            <path key={i} d={`M${p}`} fill={isNight ? '#0f172a' : 'white'} stroke={lineColor} strokeWidth="2" />
                        ))}
                    </g>
                </g>

                {spec.landscape.filter(l => l.layer === 'fg').map((p, i) => (
                    <g key={`fg-${i}`} transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}>
                        <path d={NATURE_ASSETS.find(n => n.id === p.id)?.path} fill={NATURE_ASSETS.find(n => n.id === p.id)?.color} className="animate-[sway_3s_ease-in-out_infinite]" />
                    </g>
                ))}
            </g>
        </svg>
    );
};

export default ShedVisualizer;
