
import React from 'react';
import PaulsRoofingLogo from './PaulsRoofingLogo';

export default function PaymentSuccessPage({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-12 text-center">
        <div className="w-48 h-16 mx-auto mb-10"><PaulsRoofingLogo /></div>
        
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-5xl text-white mx-auto mb-8 shadow-2xl shadow-green-900/50">
            ✓
        </div>
        
        <h1 className="text-4xl font-bold text-zinc-50 mb-6">
          Payment Successful!
        </h1>
        <p className="text-xl text-zinc-300 mb-12">
          Thank you for choosing Paul's Roofing. A receipt has been sent to your email.
        </p>

        <button onClick={onHome} className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-colors">
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
