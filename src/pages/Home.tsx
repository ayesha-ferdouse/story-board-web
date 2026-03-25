import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import { MessageCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Feedback');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  return (
    <div className="bg-q-white text-q-black min-h-screen font-sans selection:bg-q-red selection:text-white">
      
      {/* 1. HERO SECTION (QATCHUP COPY) */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 border-b-8 border-q-black bg-[#F9FAFB]">
        <div className="z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-8 border-q-black p-12 md:p-24 rounded-[4rem] shadow-[20px_20px_0px_0px_rgba(28,36,45,1)]"
          >
            <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-12 uppercase italic">
              BECAUSE UNDERSTANDING YOUR USERS ISN'T OPTIONAL.
            </h1>
            <p className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16 opacity-80">
              IT'S EVERYTHING.
            </p>
            <button className="bg-q-red text-white border-4 border-q-black px-16 py-6 rounded-full text-3xl font-bold shadow-[8px_8px_0px_0px_rgba(28,36,45,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all uppercase italic">
              Try Qatchup Free
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. NARRATIVE SECTION (QATCHUP COPY) */}
      <section className="py-48 px-10 md:px-32 border-b-8 border-q-black grid md:grid-cols-2 gap-32 bg-white">
        <div>
          <h2 className="text-8xl md:text-[12rem] font-bold leading-[0.8] tracking-tighter uppercase mb-12">
            YOUR USERS ARE YOUR <span className="text-q-blue italic">NORTH STAR.</span>
          </h2>
          <div className="h-[12px] w-full bg-q-black"></div>
        </div>
        <div className="flex flex-col justify-center pt-20">
          <p className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tighter uppercase mb-10">
            THEY'LL TELL YOU WHAT'S WORKING, WHAT'S NOT, AND WHAT THEY HOPE YOU'LL CREATE NEXT.
          </p>
          <p className="text-2xl md:text-3xl text-[#696969] font-medium leading-relaxed">
            Every piece of feedback is a map to your product’s best version. Qatchup makes it easy to stay connected, so you can focus on building something amazing.
          </p>
        </div>
      </section>

      {/* 3. CAPABILITIES / FEATURES (QATCHUP BENTO) */}
      <section className="py-48 px-10 md:px-32 bg-[#F9FAFB]">
        <div className="text-center mb-32">
          <h3 className="text-7xl md:text-9xl font-bold mb-16 uppercase italic tracking-tighter">Everything you need.</h3>
          
          <div className="inline-flex bg-q-black p-3 rounded-full border-4 border-q-black">
            {['Feedback', 'Bug Reports', 'Feature Requests', 'Ratings'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest transition-all ${activeTab === tab ? 'bg-q-red text-white' : 'text-white/40 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card Example */}
          <div className="bg-white border-8 border-q-black p-16 rounded-[4rem] shadow-[16px_16px_0px_0px_rgba(28,36,45,1)]">
            <h4 className="text-6xl font-bold mb-10 tracking-tighter italic uppercase underline decoration-q-blue decoration-8">{activeTab}</h4>
            <div className="space-y-8">
              <div className="border-b-4 border-q-black/10 py-8">
                <p className="text-4xl font-bold uppercase leading-tight">
                  {activeTab === 'Feedback' ? 'Hear their thoughts in real time.' : 
                   activeTab === 'Bug Reports' ? 'Find and fix issues fast.' : 
                   activeTab === 'Feature Requests' ? 'Co-create with your users.' : 
                   'See the impact of your hard work.'}
                </p>
              </div>
              <button className="flex items-center gap-4 text-2xl font-bold uppercase border-b-4 border-q-black pb-2 hover:gap-8 transition-all">
                Learn more <ArrowRight size={32} />
              </button>
            </div>
          </div>

          <div className="bg-q-yellow border-8 border-q-black p-16 rounded-[4rem] flex flex-col justify-between shadow-[16px_16px_0px_0px_rgba(28,36,45,1)]">
            <h4 className="text-6xl font-bold tracking-tighter uppercase italic leading-none">MISTAKES ARE PART OF THE JOURNEY.</h4>
            <p className="text-3xl font-bold mt-10">BUGS HAPPEN, BUT WHAT MATTERS IS HOW QUICKLY YOU FIX THEM.</p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER / PLANS */}
      <section className="py-48 px-10 md:px-32 bg-q-black text-white text-center">
        <h3 className="text-8xl md:text-[12rem] font-bold uppercase tracking-tighter mb-20 italic">Plans to fit your needs.</h3>
        <button className="bg-q-red text-white border-4 border-white px-20 py-10 rounded-full text-5xl font-bold shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] uppercase italic hover:translate-y-[-10px] transition-all">
          Get Started Now
        </button>
      </section>

      <footer className="py-20 text-center border-t-8 border-q-black bg-white">
        <p className="text-4xl font-bold uppercase tracking-[0.4em] opacity-20">QATCHUP // 2026</p>
      </footer>
    </div>
  );
};

export default Home;
