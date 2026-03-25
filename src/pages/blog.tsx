import React from 'react';

const Blog = () => {
  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen p-8 md:p-32">
      <h1 className="text-8xl md:text-[10rem] font-bold tracking-tighter uppercase mb-32 italic">Unpopular <br /> Opinions.</h1>
      <div className="max-w-5xl space-y-24">
        {[1, 2, 3].map(i => (
          <article key={i} className="group cursor-pointer border-t-6 border-brand-dark pt-12 pb-24 hover:pl-8 transition-all">
            <span className="text-brand-primary font-bold uppercase tracking-widest text-xl mb-4 block">0{i} // Strategy</span>
            <h2 className="text-6xl font-bold leading-none mb-8 group-hover:italic transition-all">Why empathy is a metric, not a mood.</h2>
            <p className="text-3xl text-brand-body font-medium leading-snug">Read the full perspective on Substack &rarr;</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
