import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import { MessageCircle, ArrowRight, Check, X } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Organization');
  const [rotatorIndex, setRotatorIndex] = useState(0);

  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  const identities = data?.identities || ["NGO Owner", "Author", "Strategist", "34-year-old Creative"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % identities.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [identities]);

  const filteredServices = data?.services?.filter((s: any) => s.category === activeTab) || [];

  return (
    <div className="bg-[#F9FAEB] text-[#1C242D] min-h-screen font-sans selection:bg-[#D1E231]">
      
      {/* FLOATING ACTION BUTTON */}
      <a 
        href="mailto:hello@ayeshaferdouse.com" 
        className="fixed bottom-8 right-8 z-50 bg-[#EC3031] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center gap-2 font-bold border-2 border-[#1C242D]"
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline">Contact Me</span>
      </a>

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b-4 border-[#1C242D]">
        {data?.heroImage && (
          <img 
            src={urlFor(data.heroImage).url()} 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
            alt="Hero Background"
          />
        )}
        
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 glass p-8 md:p-16 max-w-5xl mx-6 rounded-[2.5rem] shadow-2xl text-center border-4 border-[#1C242D]"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
            {data?.mainHeading || "THE NARRATIVE ANCHOR"}
          </h1>
          <button className="bg-[#D1E231] border-2 border-[#1C242D] px-12 py-5 rounded-full text-xl font-bold hover:shadow-[8px_8px_0px_0px_rgba(28,36,45,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all">
            Explore Strategy
          </button>
        </motion.div>
      </section>

      {/* NARRATIVE "HEY" SECTION */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          <h2 className="text-7xl md:text-9xl font-bold leading-[0.8] tracking-tighter">
            Hey, <br />
            <AnimatePresence mode="wait">
              <motion.span 
                key={rotatorIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="font-accent text-[#EC3031] inline-block -rotate-2"
              >
                {identities[rotatorIndex]}
              </motion.span>
            </AnimatePresence>!
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-3xl md:text-4xl font-medium leading-tight opacity-90">
            {data?.philosophy || "You have a complex story. I help you anchor it into a narrative that moves people and markets."}
          </p>
          <div className="w-24 h-2 bg-[#D1E231]"></div>
        </div>
      </section>

      {/* BENTO SERVICES */}
      <section className="py-32 px-6 md:px-24 bg-white/40 border-y-4 border-[#1C242D]">
        <div className="flex flex-col items-center mb-20">
          <h3 className="text-5xl font-bold mb-10 tracking-tight italic uppercase">Expertise</h3>
          <div className="bg-[#1C242D] p-2 rounded-full flex flex-wrap justify-center gap-2">
            {['Organization', 'Business', 'Individual'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-[#D1E231] text-[#1C242D]' : 'text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? filteredServices.map((service: any, idx: number) => (
            <motion.div 
              layout
              key={service.title}
              className={`p-10 rounded-[3rem] border-4 border-[#1C242D] flex flex-col justify-between min-h-[380px] shadow-[10px_10px_0px_0px_rgba(28,36,45,1)] ${
                idx === 0 ? 'md:col-span-2 bg-[#D1E231]' : 'bg-white'
              }`}
            >
              <h4 className="text-4xl font-bold italic underline decoration-4 underline-offset-8 mb-6">{service.title}</h4>
              <p className="text-xl font-medium mb-8 leading-snug">{service.description}</p>
              <ArrowRight className="mt-auto group-hover:translate-x-2 transition-transform" size={40} />
            </motion.div>
          )) : (
            <p className="col-span-3 text-center opacity-40 italic">Add services in Sanity to populate this grid.</p>
          )}
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section id="comparison" className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-8 bg-[#1C242D] text-white overflow-hidden">
        <div className="bg-[#D1E231] text-[#1C242D] border-4 border-white p-12 rounded-[2.5rem] hover:-rotate-1 transition-transform relative group">
          <div className="flex items-center gap-4 mb-6">
            <Check size={40} className="text-[#EC3031]" />
            <h3 className="text-5xl font-bold italic">The Specialist</h3>
          </div>
          <p className="text-2xl font-medium leading-relaxed">
            {data?.comparison?.specialistText || "9 years of global context, zero layers of middle management. Direct access to the strategist who actually builds your story."}
          </p>
          <div className="mt-8 h-2 w-0 group-hover:w-full bg-[#EC3031] transition-all duration-500"></div>
        </div>

        <div className="bg-white/10 border-4 border-white/20 p-12 rounded-[2.5rem] hover:rotate-1 transition-transform">
          <div className="flex items-center gap-4 mb-6">
            <X size={40} className="opacity-30" />
            <h3 className="text-5xl font-bold opacity-30">Large Agency</h3>
          </div>
          <p className="text-2xl opacity-40 leading-relaxed font-light">
            {data?.comparison?.agencyText || "Junior staff, templated solutions, and high overhead. Your unique vision gets diluted in the corporate machine."}
          </p>
        </div>
      </section>

      <footer className="py-16 text-center">
        <div className="text-2xl font-bold uppercase tracking-widest mb-4">Story Board</div>
        <p className="opacity-40 text-xs font-bold uppercase tracking-[0.2em]">© 2026 Cape Town & Global | Narrative Architecture</p>
      </footer>
    </div>
  );
};

export default Home;
