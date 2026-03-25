import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  return (
    <div className="bg-[#fff9f5] text-[#1C242D] min-h-screen font-sans p-6 md:p-24">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-32">
          <a href="/" className="text-2xl font-bold uppercase tracking-tighter">Story Board</a>
          <a href="/" className="font-bold border-b-4 border-[#F15425]">Home</a>
        </nav>

        <section className="grid md:grid-cols-2 gap-20">
          <div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] tracking-tighter mb-12 uppercase">
              Global <br /> <span className="text-[#F15425] italic font-accent">Narrative</span> <br /> Context.
            </h1>
            {data?.heroImage && (
              <div className="border-4 border-[#1C242D] rounded-[3rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,36,45,1)] bg-[#FFD3E2]">
                <img src={urlFor(data.heroImage).url()} className="w-full grayscale h-[500px] object-cover mix-blend-multiply opacity-80" alt="About" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10 pt-10">
            <p className="text-4xl font-bold leading-tight">9 years across 11 countries has taught me that empathy is the only universal language of strategy.</p>
            <div className="text-2xl text-[#696969] leading-relaxed space-y-8">
              <p>I specialize in identifying the core anchor points in complex stories—whether that's for high-impact NGOs or emerging private brands.</p>
              <p>Living and working in Cape Town, I bring a Southern-hemisphere perspective to global problems, helping brands avoid the agency machine.</p>
            </div>
            <button className="bg-[#1C242D] text-white p-10 rounded-[2.5rem] text-3xl font-bold hover:bg-[#F15425] transition-colors flex justify-between items-center">
              Let's Talk <ArrowRight size={40} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
