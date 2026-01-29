
import React from 'react';
import { ShedSpec, CostEstimate } from '../types';

const InsurancePartnerIntegration = ({ onClose }: { spec: ShedSpec, costs: CostEstimate, onClose: () => void }) => (
    <div className="min-h-screen bg-slate-950 p-10 pt-32 text-white">
        <div className="max-w-4xl mx-auto">
            <button onClick={onClose} className="mb-8 text-white/50 hover:text-white">← Back</button>
            <h1 className="text-4xl font-black uppercase mb-4">Insurance Partners</h1>
            <p className="text-white/50">Connect with our insurance partners to protect your asset.</p>
        </div>
    </div>
);
export default InsurancePartnerIntegration;
