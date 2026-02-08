

import React from 'react';

const ShareModal = ({ onClose, url }: { onClose: () => void, url: string }) => (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white text-slate-900 p-8 rounded-3xl max-w-md w-full relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">✕</button>
            <h3 className="text-2xl font-black uppercase mb-4">Share Design</h3>
            <p className="mb-4 text-slate-500 text-sm">Copy the link below to share your configuration.</p>
            <div className="flex gap-2">
                <input readOnly value={url} className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-xs font-mono" />
                <button onClick={() => { navigator.clipboard.writeText(url); alert('Copied!'); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase">Copy</button>
            </div>
        </div>
    </div>
);
export default ShareModal;