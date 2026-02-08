

import React from 'react';

const RegionalExpansionDashboard = ({ onClose }: { onClose: () => void }) => (
    <div className="min-h-screen bg-slate-950 p-10 pt-32 text-white">
        <div className="max-w-4xl mx-auto">
            <button onClick={onClose} className="mb-8 text-white/50 hover:text-white">← Back</button>
            <h1 className="text-4xl font-black uppercase mb-4">Regional Expansion</h1>
            <p className="text-white/50">View active fabrication nodes across the Atlantic region.</p>
        </div>
    </div>
);
export default RegionalExpansionDashboard;