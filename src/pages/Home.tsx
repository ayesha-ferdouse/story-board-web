import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import { MessageCircle } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Organization');
  const [rotatorIndex, setRotatorIndex] = useState(0);

  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  const identities = ["NGO Owner", "Author", "Small Business Owner", "Personal Brand"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % identities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen font-sans">
      
      {/* FLOATING ACTION BUTTON */}
      <button className="fixed bottom-8 right-8 z-50 bg-brand-secondary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold">
        <MessageCircle size={24} />
        <span>Contact Me</span>
      </button>

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b-4 border-brand-text">
        {data?.heroImage && (
          <img 
            src={urlFor(data.heroImage).url()} 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
            alt="Hero background"
          />
        )}
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 backdrop-blur-md bg-white/30 border-4 border-brand-text p-12 max-w-4xl mx-6 rounded-[2rem] shadow-2xl text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            THE NARRATIVE ANCHOR
          </h1>
          <button className="bg-brand-primary border-2 border-brand-text px-10 py-4 rounded-full text-xl font-bold hover:shadow-[8px_8px_0px_0px_rgba(28,36,45,1)] transition-all">
            View My Work
          </button>
        </motion.div>
      </section>

      {/* THE "HEY" SECTION */}
      <section className="py-24 px-6 md:px-24 grid md:grid-cols-2 gap-16 items-center">
        <h2 className="text-7xl md:text-9xl font-bold leading-tight">
          Hey, <br />
          <span className="font-accent text-brand-secondary">
            {identities[rotatorIndex]}
          </span>!
        </h2>
        <div className="text-2xl md:text-3xl font-medium leading-relaxed opacity-90">
          {data?.description || "You have a complex story. I help you anchor it into a narrative that moves people and markets."}
        </div>
      </section>

      {/* BENTO SERVICES WITH SWITCHER */}
      <section className="py-24 px-6 md:px-24 bg-white/50 border-y-4 border-brand-text">
        <div className="flex justify-center mb-16">
          <div className="bg-brand-text p-2 rounded-full flex gap-2">
            {['Organization', 'Business', 'Individual'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === tab ? 'bg-brand-primary text-brand-text' : 'text-white hover:opacity-70'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card Example */}
          <div className="md:col-span-2 bg-brand-primary border-4 border-brand-text p-10 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(28,36,45,1)]">
            <h3 className="text-4xl font-bold mb-4 italic underline">Narrative Audit</h3>
            <p className="text-xl">A deep dive into your current messaging for your {activeTab}.</p>
          </div>
          <div className="bg-brand-secondary text-white border-4 border-brand-text p-10 rounded-[3rem] flex flex-col justify-end">
            <div className="text-6xl font-bold">01</div>
            <p className="uppercase tracking-widest font-bold">Strategy Session</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
