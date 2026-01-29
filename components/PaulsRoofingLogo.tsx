
import React from 'react';

export default function PaulsRoofingLogo() {
return (
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <circle cx="50" cy="50" r="49" fill="#0d2e57" />
      <circle cx="50" cy="50" r="47" stroke="#38bdf8" strokeWidth="3" fill="none" />
      {/* Background Circle */}
      <circle cx="50" cy="50" r="50" fill="hsl(221 83% 10%)" />

      {/* Roofs */}
      <g transform="translate(0, -5)">
        <path d="M 25 50 L 50 30 L 75 50 L 65 50 L 65 42 L 55 42 L 55 50 Z" fill="#38bdf8" />
        <path d="M 27 48 L 50 32 L 73 48" stroke="white" strokeWidth="1.5" fill="none" />
        
        {/* Windows */}
        <rect x="35" y="44" width="4" height="4" fill="#0d2e57" stroke="white" strokeWidth="0.5" />
        <rect x="41" y="44" width="4" height="4" fill="#0d2e57" stroke="white" strokeWidth="0.5" />
        <rect x="60" y="44" width="4" height="4" fill="#0d2e57" stroke="white" strokeWidth="0.5" />
        <rect x="66" y="44" width="4" height="4" fill="#0d2e57" stroke="white" strokeWidth="0.5" />
      </g>
      
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(206 90% 50%)" strokeWidth="3" />

      {/* Roof Icon Lower */}
      <g transform="translate(0, -2)">
        <path 
          d="M 25 55 L 50 35 L 75 55 L 75 58 L 25 58 Z" 
          fill="hsl(206 90% 50%)" 
          stroke="hsl(221 83% 10%)" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Text: PAUL'S */}
      <text
        x="50"
        y="72"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        letterSpacing="0.5"
      >
          PAUL'S
      </text>

      {/* Line Separators */}
      <line x1="30" y1="78" x2="70" y2="78" stroke="hsl(206 90% 50%)" strokeWidth="1" />
      <line x1="30" y1="75" x2="40" y2="75" stroke="#38bdf8" strokeWidth="1" />
       
      {/* Text: ROOFING */}
      <text
        x="50"
        y="88"
        fontFamily="sans-serif"
        fontSize="7"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        letterSpacing="1"
      >
          ROOFING
      </text>
</svg>
);
}
