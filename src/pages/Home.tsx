import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import { MessageCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Organization');
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const iconX = useTransform(scrollYProgress, [0, 1], [0, 500]);

  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex((prev) => (prev + (data?.identities?.length ? 1 : 0)) % (data?.identities?.length || 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [data]);

  const filteredServices = data?.services?.filter((s: any) => s.category === activeTab) || [];

  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen font-sans selection:bg-brand-primary selection:text-white">
      
      {/* FAB */}
      <a href="mailto:hello@ayeshaferdouse.com" className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-5 rounded-full shadow-[6px_6px_0px_0px_rgba(28,36,45,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(28,36,45,1)] transition-all border-2 border-brand-dark">
        <MessageCircle size={24} />
      </a>

      {/* HERO: QATCHUP EDITORIAL GLASS */}
      <section className="relative h-screen flex items-center justify-center p-4">
        {data?.heroImage && (
          <img src={urlFor(data.heroImage).url()} className="absolute inset-0 w-full h-full object-cover grayscale opacity-15" alt="Hero" />
        )}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white/20 backdrop-blur-xl p-10 md:p-24 rounded-[3rem] border-6 border-brand-dark text-center max-w-6xl shadow-2xl"
        >
          <h1 className="text-6xl md:text-[11rem] font-bold tracking-tighter leading-[0.8] mb-12 uppercase italic">{data?.mainHeading || 'The Narrative Anchor'}</h1>
          <button className="bg-brand-primary text-white border-4 border-brand-dark px-16 py-6 rounded-full text-3xl font-bold hover:shadow-[10px_10px_0px_0px_rgba(28,36,45,1)] transition-all">Explore Work</button>
        </motion.div>
      </section>

      {/* NARRATIVE SECTION */}
      <section className="py-40 px-6 md:px-24 grid md:grid-cols-2 gap-24">
        <h2 className="text-7xl md:text-[12rem] font-bold leading-[0.75] tracking-tighter sticky top-32">
          Hey, <br />
          <AnimatePresence mode="wait">
            <motion.span key={rotatorIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-accent text-brand-secondary italic px-4">
              {data?.identities?.[rotatorIndex] || "Partner"}
            </motion.span>
          </AnimatePresence>!
        </h2>
        <div className="flex flex-col gap-10 justify-center">
          <p className="text-3xl md:text-5xl font-medium text-brand-body leading-[1.1]">
            {data?.philosophy || "I build high-legibility strategic narratives for the global context."}
          </p>
          <div className="w-40 h-4 bg-brand-primary border-2 border-brand-dark"></div>
        </div>
      </section>

      {/* BENTO SERVICES */}
      <section className="py-32 px-6 md:px-24 border-y-8 border-brand-dark bg-brand-pink/20">
        <div className="flex flex-col items-center mb-24">
          <h3 className="text-6xl md:text-8xl font-bold mb-12 italic uppercase tracking-tighter">Capabilities</h3>
          <div className="bg-brand-dark p-3 rounded-full flex gap-3 shadow-xl">
            {['Organization', 'Business', 'Individual'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-12 py-5 rounded-full font-bold uppercase text-sm tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-brand-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredServices.map((service: any) => (
            <div key={service.title} className="bg-white border-6 border-brand-dark p-14 rounded-[4rem] shadow-[18px_18px_0px_0px_rgba(28,36,45,1)]">
              <h4 className="text-5xl md:text-6xl font-bold mb-12 tracking-tighter italic">{service.title}</h4>
              <div className="space-y-8">
                {service.accordions?.map((acc: any) => (
                  <div key={acc.label} className="border-b-4 border-brand-dark/10">
                    <button onClick={() => setOpenAccordion(openAccordion === acc.label ? null : acc.label)} className="w-full flex justify-between items-center py-8 text-left font-bold text-3xl hover:text-brand-primary transition-all">
                      {acc.label} {openAccordion === acc.label ? <ChevronUp size={40} /> : <ChevronDown size={40} />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <p className="pb-12 text-2xl text-brand-body font-medium leading-relaxed">{acc.content}</p>
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

      {/* COMPARISON */}
      <section className="py-40 px-6 md:px-24 grid md:grid-cols-2 gap-12 bg-brand-dark text-brand-bg">
        <div className="bg-brand-primary border-4 border-white p-16 rounded-[4rem] shadow-neo">
          <h3 className="text-6xl font-bold mb-10 italic uppercase tracking-tighter">The Specialist</h3>
          <p className="text-3xl mb-12 font-medium leading-tight text-white">Direct empathy. 9 years of global strategy. Zero agency layers.</p>
          <Link to="/about" className="inline-flex items-center gap-4 text-4xl border-b-8 border-white pb-2 font-bold uppercase italic">About Me <ArrowRight size={48} /></Link>
        </div>
        <div className="bg-white/5 border-4 border-white/10 p-16 rounded-[4rem] opacity-40">
          <h3 className="text-6xl font-bold mb-10 uppercase tracking-tighter">The Agency</h3>
          <p className="text-3xl font-medium leading-tight">Middle management, generic templates, and high overhead.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
