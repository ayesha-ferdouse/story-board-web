import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import { MessageCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Organization');
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  const identities = data?.identities || ["NGO Owner", "Author", "Small Business Owner", "Personal Brand"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % identities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [identities]);

  const filteredServices = data?.services?.filter((s: any) => s.category === activeTab) || [];

  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen font-sans selection:bg-brand-primary selection:text-white">
      
      {/* FAB */}
      <a href="mailto:hello@ayeshaferdouse.com" className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-5 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 border-2 border-brand-dark">
        <MessageCircle size={24} />
        <span className="font-bold">Contact Me</span>
      </a>

      {/* HERO SECTION - QATCHUP GLASS CARD */}
      <section className="relative h-[90vh] flex items-center justify-center p-6">
        {data?.heroImage && (
          <img src={urlFor(data.heroImage).url()} className="absolute inset-0 w-full h-full object-cover grayscale opacity-10" alt="Hero" />
        )}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl p-12 md:p-24 rounded-[4rem] border-4 border-brand-dark text-center max-w-5xl shadow-2xl"
        >
          <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-12 uppercase italic">{data?.mainHeading || 'The Narrative Anchor'}</h1>
          <button className="bg-brand-primary text-white border-2 border-brand-dark px-16 py-6 rounded-full text-2xl font-bold hover:shadow-[10px_10px_0px_0px_rgba(28,36,45,1)] transition-all">Get Started</button>
        </motion.div>
      </section>

      {/* NARRATIVE "HEY" SECTION */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-20 items-start">
        <h2 className="text-7xl md:text-[11rem] font-bold leading-[0.8] tracking-tighter sticky top-24">
          Hey, <br />
          <AnimatePresence mode="wait">
            <motion.span key={rotatorIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="font-accent text-brand-secondary inline-block -rotate-2">
              {identities[rotatorIndex]}
            </motion.span>
          </AnimatePresence>!
        </h2>
        <div className="flex flex-col gap-12 justify-center h-full pt-10">
          <p className="text-3xl md:text-5xl font-medium text-brand-body leading-tight">
            {data?.philosophy || "I help you anchor complex ideas into narratives that move people and markets."}
          </p>
          <div className="w-32 h-3 bg-brand-primary rounded-full"></div>
        </div>
      </section>

      {/* BENTO SERVICES */}
      <section className="py-32 px-6 md:px-24 border-y-4 border-brand-dark">
        <div className="flex flex-col items-center mb-24">
          <h3 className="text-6xl font-bold mb-12 italic uppercase tracking-tighter">Strategic Services</h3>
          <div className="bg-brand-dark p-2 rounded-full flex gap-2">
            {['Organization', 'Business', 'Individual'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest transition-all ${activeTab === tab ? 'bg-brand-primary text-white' : 'text-white/50 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service: any) => (
            <div key={service.title} className="bg-white border-4 border-brand-dark p-12 rounded-[3.5rem] shadow-[12px_12px_0px_0px_rgba(28,36,45,1)]">
              <h4 className="text-5xl font-bold mb-10 tracking-tighter">{service.title}</h4>
              <div className="space-y-6">
                {service.accordions?.map((acc: any) => (
                  <div key={acc.label} className="border-b-4 border-brand-dark/5">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === acc.label ? null : acc.label)}
                      className="w-full flex justify-between items-center py-6 text-left font-bold text-2xl hover:text-brand-primary transition-colors"
                    >
                      {acc.label}
                      {openAccordion === acc.label ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <p className="pb-8 text-2xl text-brand-body leading-relaxed">{acc.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-10">
        <div className="bg-brand-secondary text-white border-4 border-brand-dark p-16 rounded-[4rem] shadow-[15px_15px_0px_0px_rgba(28,36,45,1)] hover:-rotate-1 transition-transform">
          <h3 className="text-6xl font-bold mb-8 italic tracking-tighter">The Specialist</h3>
          <p className="text-2xl mb-12 opacity-90 font-medium leading-relaxed">Direct strategy, 9 years of global empathy, and high-legibility narratives.</p>
          <Link to="/about" className="inline-flex items-center gap-4 font-bold text-3xl border-b-8 border-white hover:pb-4 transition-all uppercase italic">Meet Ayesha <ArrowRight size={32} /></Link>
        </div>
        <div className="bg-brand-pink border-4 border-brand-dark p-16 rounded-[4rem] flex flex-col justify-center shadow-[15px_15px_0px_0px_rgba(28,36,45,1)]">
          <h3 className="text-6xl font-bold mb-8 tracking-tighter">Large Agency</h3>
          <p className="text-2xl text-brand-body leading-relaxed">Corporate layers, generic templates, and high overhead that dilutes your story.</p>
        </div>
      </section>

      <footer className="py-16 text-center border-t-4 border-brand-dark opacity-40 font-bold uppercase tracking-[0.3em] text-sm">
        © 2026 Story Board | Built for the Narrative
      </footer>
    </div>
  );
};

export default Home;
