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

  const identities = data?.identities || ["NGO Owner", "Author", "Strategist", "Copywriter"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + 1) % identities.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [identities]);

  const filteredServices = data?.services?.filter((s: any) => s.category === activeTab) || [];

  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen font-sans">
      
      {/* FAB */}
      <a href="mailto:hello@ayeshaferdouse.com" className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-5 rounded-full shadow-neo hover:scale-105 transition-transform flex items-center gap-2 border-2 border-brand-dark">
        <MessageCircle size={24} />
        <span className="font-bold">Contact Me</span>
      </a>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center border-b-4 border-brand-dark overflow-hidden">
        {data?.heroImage && (
          <img src={urlFor(data.heroImage).url()} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" alt="Hero" />
        )}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 glass p-12 md:p-20 rounded-[3rem] border-4 border-brand-dark text-center max-w-4xl mx-4 bg-white/10 backdrop-blur-xl"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-10">{data?.mainHeading || 'The Narrative Anchor'}</h1>
          <button className="bg-brand-primary text-white border-2 border-brand-dark px-12 py-5 rounded-full text-2xl font-bold hover:shadow-neo transition-all">Get Started</button>
        </motion.div>
      </section>

      {/* NARRATIVE "HEY" SECTION */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-16">
        <h2 className="text-7xl md:text-[10rem] font-bold leading-[0.85] tracking-tighter">
          Hey, <br />
          <AnimatePresence mode="wait">
            <motion.span key={rotatorIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="font-accent text-brand-secondary inline-block -rotate-2 italic">
              {identities[rotatorIndex]}
            </motion.span>
          </AnimatePresence>!
        </h2>
        <div className="flex flex-col justify-center">
          <p className="text-2xl md:text-4xl font-medium text-brand-body leading-tight">
            {data?.philosophy || "I help you anchor complex ideas into narratives that move people."}
          </p>
        </div>
      </section>

      {/* BENTO SERVICES */}
      <section className="py-32 px-6 md:px-24 bg-brand-teal/5 border-y-4 border-brand-dark">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold mb-8 italic">What I Do</h3>
          <div className="inline-flex bg-brand-dark p-2 rounded-full">
            {['Organization', 'Business', 'Individual'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${activeTab === tab ? 'bg-brand-primary text-white' : 'text-white/50 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service: any) => (
            <div key={service.title} className="bg-white border-4 border-brand-dark p-10 rounded-[2.5rem] shadow-neo">
              <h4 className="text-4xl font-bold mb-6">{service.title}</h4>
              <div className="space-y-4">
                {service.accordions?.map((acc: any) => (
                  <div key={acc.label} className="border-b-2 border-brand-dark/10">
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === acc.label ? null : acc.label)}
                      className="w-full flex justify-between items-center py-4 text-left font-bold text-xl"
                    >
                      {acc.label}
                      {openAccordion === acc.label ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <p className="pb-6 text-brand-body leading-relaxed">{acc.content}</p>
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
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-8">
        <div className="bg-brand-secondary text-white border-4 border-brand-dark p-12 rounded-[3rem] shadow-neo">
          <h3 className="text-5xl font-bold mb-6 italic">The Specialist</h3>
          <p className="text-xl mb-10 opacity-90 font-medium leading-relaxed">9 years of global experience, direct communication, and a tailored narrative audit.</p>
          <Link to="/about" className="inline-flex items-center gap-2 font-bold text-2xl border-b-4 border-white hover:pb-2 transition-all">Meet Ayesha <ArrowRight /></Link>
        </div>
        <div className="bg-brand-pink border-4 border-brand-dark p-12 rounded-[3rem] flex flex-col justify-center">
          <h3 className="text-5xl font-bold mb-6">Large Agency</h3>
          <p className="text-xl text-brand-body">Account managers, rigid templates, and high overhead. Your vision gets diluted in the machine.</p>
        </div>
      </section>

      <footer className="py-12 text-center border-t-4 border-brand-dark opacity-40 font-bold uppercase tracking-widest text-xs">
        © 2026 Story Board | Built in Cape Town
      </footer>
    </div>
  );
};

export default Home;
