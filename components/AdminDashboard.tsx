

import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-10 pt-32">
            <h1 className="text-4xl font-black uppercase mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Orders</h3>
                    <div className="text-3xl font-black">1,248</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Revenue</h3>
                    <div className="text-3xl font-black">$4.2M</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Active Builds</h3>
                    <div className="text-3xl font-black">15</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;