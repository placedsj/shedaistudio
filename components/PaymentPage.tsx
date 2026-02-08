

import React from 'react';
import { PaymentOptions } from './PaymentOptions';
import PaulsRoofingLogo from './PaulsRoofingLogo';

export default function PaymentPage() {
  const sampleProject = {
    projectId: "PAULS-2025-001",
    customerName: "Customer Name",
    customerEmail: "customer@example.com",
    projectDescription: "Metal Roofing Installation"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-700 bg-zinc-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="w-32 h-10"><PaulsRoofingLogo /></div>
            <div className="text-right text-sm">
              <p className="text-zinc-300">
                <strong>Paul:</strong> <a href="tel:+15062714162" className="text-orange-400 hover:text-orange-300 transition-colors">Call Now</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-6">Secure Payment Portal</h1>
          <p className="text-xl text-zinc-300">Choose your preferred payment method to complete your roofing project.</p>
        </div>

        <PaymentOptions 
            invoiceAmount={15500} 
            projectDetails={sampleProject}
        />
        
        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 bg-green-900/20 text-green-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-900/50">
                <span>🔒</span> 256-Bit SSL Secured
            </div>
        </div>
      </main>
    </div>
  );
}