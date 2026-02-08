

import React from 'react';
import { ShedSpec, CostEstimate } from '../types';

const AdvancedAnalyticsDashboard = ({ onClose }: { spec: ShedSpec, costs: CostEstimate, onClose: () => void }) => (
    <div className="min-h-screen bg-slate-950 p-10 pt-32 text-white">
        <div className="max-w-4xl mx-auto">
            <button onClick={onClose} className="mb-8 text-white/50 hover:text-white">← Back</button>
            <h1 className="text-4xl font-black uppercase mb-4">Financial Analytics</h1>
            <p className="text-white/50">Deep dive into ROI and asset depreciation schedules.</p>
        </div>
    </div>
);
export default AdvancedAnalyticsDashboard;