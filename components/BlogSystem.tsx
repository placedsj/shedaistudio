

import React, { useState } from 'react';
import { DRAFTING_TABLE_POSTS } from '../constants';

const BlogSystem: React.FC = () => {
    const [filter, setFilter] = useState('ALL');
    const categories = ['ALL', 'ENGINEERING', 'TECH', 'PLANNING'];
    const featured = DRAFTING_TABLE_POSTS.find(p => p.isFeatured);
    const posts = DRAFTING_TABLE_POSTS.filter(p => filter === 'ALL' || p.category === filter);

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-40 pb-40 px-6 md:px-10 overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6 block">The Drafting Table</span>
                        <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase">
                            Design <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Discourse.</span>
                        </h1>
                    </div>
                    <div className="flex gap-4 border-b border-white/10 pb-4">
                        {categories.map(c => (
                            <button 
                                key={c} 
                                onClick={() => setFilter(c)}
                                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${filter === c ? 'text-blue-500' : 'text-white/30 hover:text-white'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Featured Piece */}
                {featured && filter === 'ALL' && (
                    <section className="mb-32 relative group cursor-pointer overflow-hidden rounded-[4rem] border border-white/10 bg-white/5">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={featured.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 grayscale group-hover:grayscale-0" alt={featured.title} />
                            </div>
                            <div className="p-16 md:p-24 flex flex-col justify-center">
                                <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6 block">Feature Piece // {featured.category}</span>
                                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">{featured.title}</h2>
                                <p className="text-white/40 text-xl font-medium leading-relaxed mb-10">{featured.excerpt}</p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/60">
                                    READ FULL BLUEPRINT <span className="text-2xl">→</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map(post => (
                        <article key={post.id} className="group cursor-pointer">
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 border border-white/10 relative">
                                <img src={post.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700" alt={post.title} />
                                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest">{post.category}</div>
                            </div>
                            <h3 className="text-3xl font-black mb-4 group-hover:text-blue-400 transition-colors uppercase leading-[0.95] tracking-tighter">{post.title}</h3>
                            <p className="text-white/40 text-sm font-medium leading-relaxed mb-6">{post.excerpt}</p>
                            <div className="h-[1px] w-full bg-white/10 group-hover:bg-blue-500/50 transition-colors" />
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSystem;