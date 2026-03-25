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

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.identities?.length) {
        setRotatorIndex((prev) => (prev + 1) % data.identities.length);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [data]);

  const filteredServices = data?.services?.filter((s: any) => s.category === activeTab) || [];

  return (
    <div className="bg-[#fff9f5] text-[#1C242D] min-h-screen font-sans selection:bg-[#F15425] selection:text-white">
      
      {/* FAB */}
      <a href="mailto:hello@ayeshaferdouse.com" className="fixed bottom-8 right-8 z-50 bg-[#F15425] text-white p-5 rounded-full shadow-[6px_6px_0px_0px_rgba(28,36,45,1)] border-2 border-[#1C242D] hover:scale-110 transition-transform">
        <MessageCircle size={24} />
      </a>

      {/* HERO: QATCHUP GLASS CARD */}
      <section className="relative h-screen flex items-center justify-center p-4">
        {data?.heroImage && (
          <img src={urlFor(data.heroImage).url()} className="absolute inset-0 w-full h-full object-cover grayscale opacity-15" alt="Hero" />
        )}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl p-10 md:p-24 rounded-[4rem] border-[6px] border-[#1C242D] text-center max-w-6xl shadow-2xl"
        >
          <h1 className="text-6xl md:text-[11rem] font-bold tracking-tighter leading-[0.8] mb-12 uppercase italic">{data?.mainHeading || 'The Narrative Anchor'}</h1>
          <button className="bg-[#F15425] text-white border-4 border-[#1C242D] px-16 py-6 rounded-full text-3xl font-bold hover:shadow-[10px_10px_0px_0px_rgba(28,36,45,1)] transition-all">Explore Work</button>
        </motion.div>
      </section>

      {/* NARRATIVE SECTION */}
      <section className="py-40 px-6 md:px-24 grid md:grid-cols-2 gap-24">
        <h2 className="text-7xl md:text-[12rem] font-bold leading-[0.75] tracking-tighter sticky top-32 uppercase">
          Hey, <br />
          <AnimatePresence mode="wait">
            <motion.span key={rotatorIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-accent text-[#7079DD] italic px-4">
              {data?.identities?.[rotatorIndex] || "Partner"}
            </motion.span>
          </AnimatePresence>!
        </h2>
        <div className="flex flex-col gap-10 justify-center">
          <p className="text-3xl md:text-5xl font-medium text-[#696969] leading-[1.1]">
            {data?.philosophy || "I build high-legibility strategic narratives for the global context."}
          </p>
          <div className="w-40 h-4 bg-[#F15425] border-2 border-[#1C242D]"></div>
        </div>
      </section>

      {/* BENTO SERVICES */}
      <section className="py-32 px-6 md:px-24 border-y-[8px] border-[#1C242D] bg-[#FFD3E2]/20">
        <div className="flex flex-col items-center mb-24 text-center">
          <h3 className="text-6xl md:text-8xl font-bold mb-12 italic uppercase tracking-tighter">Capabilities</h3>
          <div className="bg-[#1C242D] p-3 rounded-full flex gap-3 shadow-xl overflow-x-auto max-w-full">
            {['Organization', 'Business', 'Individual'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 md:px-12 py-5 rounded-full font-bold uppercase text-xs md:text-sm tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#F15425] text-white' : 'text-white/40 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredServices.map((service: any) => (
            <div key={service.title} className="bg-white border-[6px] border-[#1C242D] p-10 md:p-14 rounded-[3.5rem] shadow-[18px_18px_0px_0px_rgba(28,36,45,1)]">
              <h4 className="text-5xl font-bold mb-12 tracking-tighter italic">{service.title}</h4>
              <div className="space-y-8">
                {service.accordions?.map((acc: any) => (
                  <div key={acc.label} className="border-b-4 border-[#1C242D]/10">
                    <button onClick={() => setOpenAccordion(openAccordion === acc.label ? null : acc.label)} className="w-full flex justify-between items-center py-8 text-left font-bold text-2xl md:text-3xl hover:text-[#F15425] transition-all">
                      {acc.label} {openAccordion === acc.label ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.label && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <p className="pb-12 text-xl md:text-2xl text-[#696969] font-medium leading-relaxed">{acc.content}</p>
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
      <section className="py-40 px-6 md:px-24 grid md:grid-cols-2 gap-12 bg-[#1C242D] text-[#fff9f5]">
        <div className="bg-[#F15425] border-4 border-white p-12 md:p-16 rounded-[4rem]">
          <h3 className="text-6xl font-bold mb-10 italic uppercase tracking-tighter">The Specialist</h3>
          <p className="text-3xl mb-12 font-medium leading-tight text-white">Direct empathy. 9 years of global strategy. Zero agency layers.</p>
          <Link to="/about" className="inline-flex items-center gap-4 text-3xl border-b-8 border-white pb-2 font-bold uppercase italic hover:pb-4 transition-all">About Me <ArrowRight size={40} /></Link>
        </div>
        <div className="bg-white/5 border-4 border-white/10 p-12 md:p-16 rounded-[4rem] opacity-30">
          <h3 className="text-6xl font-bold mb-10 uppercase tracking-tighter">The Agency</h3>
          <p className="text-3xl font-medium leading-tight">Middle management, generic templates, and high overhead.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
