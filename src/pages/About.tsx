import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    client.fetch('*[_type == "storyBoard"][0]').then((res) => setData(res));
  }, []);

  return (
    <div className="bg-[#fff9f5] text-[#1C242D] min-h-screen p-8 md:p-32 font-sans">
      <nav className="flex justify-between items-center mb-40">
        <a href="/" className="text-4xl font-bold tracking-tighter uppercase italic">Story Board</a>
        <a href="/" className="text-2xl font-bold border-b-6 border-[#F15425]">Home</a>
      </nav>

      <div className="grid md:grid-cols-2 gap-32">
        <div className="sticky top-32 h-fit">
          <h1 className="text-8xl md:text-[13rem] font-bold leading-[0.8] tracking-tighter uppercase mb-12 italic">
            World <br /> <span className="text-[#7079DD]">Context.</span>
          </h1>
          {data?.heroImage && (
            <div className="border-[6px] border-[#1C242D] rounded-[4rem] overflow-hidden shadow-[20px_20px_0px_0px_#FFD3E2]">
              <img src={urlFor(data.heroImage).url()} className="w-full grayscale h-[600px] object-cover" alt="Narrative Specialist" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-16 pt-12">
          <p className="text-5xl font-bold leading-tight">I bridge the gap between complex global impact and human-centric narratives.</p>
          <div className="text-3xl text-[#696969] font-medium leading-relaxed space-y-12">
            <p>For 9 years, I've lived the stories I tell. From the refugee responses in Bangladesh to the strategic hubs of Cape Town, my perspective is built on ground-truth empathy.</p>
            <p>I architect narratives that anchor organizations to their true mission, ensuring they are heard above the noise.</p>
          </div>
          <button className="bg-[#F15425] text-white p-12 rounded-[3rem] text-4xl font-bold border-4 border-[#1C242D] shadow-[12px_12px_0px_0px_rgba(28,36,45,1)] hover:translate-x-[-4px] transition-all flex justify-between items-center">
            Collaborate <ArrowRight size={48} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
