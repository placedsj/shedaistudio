
import React, { useState } from 'react';
import { Header, Footer } from './RoofingShared';
import { ProjectService } from '../services/projectService';

export default function ExteriorInspectionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const result = await ProjectService.createLead({
        ...formData,
        type: 'Inspection Request',
        source: 'inspection_page'
    });

    if (result.success) {
        setStatus('success');
    } else {
        console.error(result.error);
        setStatus('error');
        // Fallback demo
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
             setTimeout(() => setStatus('success'), 1000);
        }
    }
  };

  if (status === 'success') {
      return (
        <div className="bg-zinc-900 min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-2xl bg-white rounded-3xl p-12 text-center shadow-2xl mx-4">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 text-white shadow-lg">✓</div>
                    <h2 className="text-4xl font-black text-zinc-900 mb-4 uppercase">Request Received</h2>
                    <p className="text-zinc-600 text-lg mb-8">We've received your inspection request. Our scheduling team will call you at <strong>{formData.phone}</strong> within 24 hours.</p>
                    <button onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', phone: '', address: '', message: '' }); }} className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800">Return to Form</button>
                </div>
            </main>
            <Footer />
        </div>
      );
  }

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-32 bg-zinc-800 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1628135896350-008316281358?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight uppercase">Professional Exterior Inspection</h1>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">Comprehensive assessment of your roof, siding, and gutters — zero obligation.</p>
            <a href="#schedule" className="inline-block px-10 py-4 text-lg font-bold rounded-full transition-all duration-300 shadow-xl bg-orange-600 text-white hover:bg-orange-500 hover:scale-105">
              SCHEDULE AERIAL INSPECTION
            </a>
          </div>
        </div>

        <section id="schedule" className="py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-2xl">
                <h2 className="text-3xl font-black text-zinc-900 mb-8 uppercase tracking-tight text-center">Request Audit</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Name</label>
                            <input required className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-zinc-900 font-bold outline-none focus:border-orange-500" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Phone</label>
                            <input required className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-zinc-900 font-bold outline-none focus:border-orange-500" placeholder="(506) 555-0123" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Email (Optional)</label>
                        <input type="email" className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-zinc-900 font-bold outline-none focus:border-orange-500" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Property Address</label>
                        <input required className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-zinc-900 font-bold outline-none focus:border-orange-500" placeholder="123 Main St" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Notes / Concerns</label>
                        <textarea className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-zinc-900 font-bold outline-none focus:border-orange-500 h-32" placeholder="Leaking near chimney, missing shingles..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <button disabled={status === 'submitting'} className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex justify-center items-center">
                        {status === 'submitting' ? <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></span> : 'Submit Request'}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-center font-bold text-xs">An error occurred. Please call us directly.</p>}
                </form>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
