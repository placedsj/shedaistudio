
import React from 'react';

export const PaymentOptions = ({ invoiceAmount, projectDetails }: any) => (
    <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 text-center cursor-pointer hover:border-orange-500 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💳</div>
            <h3 className="text-xl font-bold mb-2 text-white">Credit Card</h3>
            <p className="text-zinc-400 text-sm">Secure Stripe Payment</p>
        </div>
        <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 text-center cursor-pointer hover:border-orange-500 transition-all group">
             <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏦</div>
             <h3 className="text-xl font-bold mb-2 text-white">E-Transfer</h3>
             <p className="text-zinc-400 text-sm">Direct Bank Transfer</p>
        </div>
        <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 text-center cursor-pointer hover:border-orange-500 transition-all group">
             <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
             <h3 className="text-xl font-bold mb-2 text-white">Financing</h3>
             <p className="text-zinc-400 text-sm">Apply for Monthly Payments</p>
        </div>
    </div>
);
