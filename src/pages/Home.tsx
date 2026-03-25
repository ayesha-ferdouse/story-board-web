import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../lib/sanity';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [rotatorIndex, setRotatorIndex] = useState(0);

  useEffect(() => {
    // Note: We use the 'storyBoard' type we agreed on!
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  const identities = data?.identities || ["Founder", "Strategist", "Narrative Architect"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % identities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [identities]);

  return (
    <div className="bg-[#F8F7F2] text-[#1A1A1A] min-h-screen font-sans px-6 py-12 lg:px-24">
      {/* HEADER */}
      <nav className="flex justify-between items-center mb-24">
        <span className="text-2xl font-black tracking-tighter uppercase">Story Board</span>
        <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
          Start a Project
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-6xl">
        <h1 className="text-[12vw] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mb-12">
          {data?.title || "STORY BOARD"}
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-4xl lg:text-6xl font-light leading-tight">
            Hey, I'm your <br />
            <span className="italic font-serif text-orange-600 underline">
              {identities[rotatorIndex]}
            </span>
          </div>
          <div className="text-xl lg:text-2xl opacity-80 max-w-lg">
            {data?.description || "I help visionaries anchor their complex ideas into narratives that move people."}
          </div>
        </div>
      </section>

      {/* BENTO GRID (The Qatchup Look) */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
        {/* Large Bento Card */}
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-12 border border-black/5 flex flex-col justify-between shadow-sm">
           <h3 className="text-4xl font-bold">The Narrative <br/> Strategy</h3>
           <p className="text-lg opacity-60">Deep dive into your brand's DNA.</p>
        </div>
        
        {/* Small Accent Card */}
        <div className="bg-orange-500 rounded-[2.5rem] p-12 text-white flex flex-col justify-end">
           <div className="text-6xl font-bold">11</div>
           <p className="font-medium uppercase tracking-widest text-sm">Countries Served</p>
        </div>

        {/* Small Card */}
        <div className="bg-[#1A1A1A] rounded-[2.5rem] p-12 text-white">
           <h3 className="text-2xl font-bold mb-4">Workshops</h3>
           <p className="opacity-50">Team-alignment through storytelling.</p>
        </div>

        {/* Medium Card */}
        <div className="md:col-span-2 bg-yellow-200 rounded-[2.5rem] p-12 border border-black/5">
           <h3 className="text-4xl font-bold mb-4 italic">Story Audit</h3>
           <p className="text-xl text-black/70">Identifying the gaps in your current brand voice.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
