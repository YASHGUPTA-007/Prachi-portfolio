"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Database, 
  ShieldCheck, 
  Layout, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  MapPin,
  Download,
  Star,
  Zap
} from "lucide-react";

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax for the hero text vs image
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#1a1a1a] font-sans selection:bg-[#FF5A5F] selection:text-white overflow-x-hidden">
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-stone-200 py-4" : "py-8 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-3xl font-serif font-black tracking-tighter hover:text-[#FF5A5F] transition-colors">
            PG.
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['Expertise', 'Work', 'Contact'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest hover:text-[#FF5A5F] transition-colors relative group">
                 {item}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5A5F] transition-all group-hover:w-full"></span>
               </a>
            ))}
            <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white font-bold rounded-full hover:bg-[#FF5A5F] hover:scale-105 transition-all shadow-xl shadow-[#FF5A5F]/20">
              Let's Talk <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Warm Gradient Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FF9F1C] rounded-full blur-[120px] opacity-20 -z-10 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#FF5A5F] rounded-full blur-[100px] opacity-20 -z-10 mix-blend-multiply animate-blob animation-delay-2000"></div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: yText }}
            className="lg:col-span-7 relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-[#FF5A5F]"></span>
                <span className="text-[#FF5A5F] font-bold uppercase tracking-widest text-sm">ServiceNow CSA Certified</span>
              </div>

              <h1 className="text-7xl md:text-9xl font-serif font-black leading-[0.85] mb-8 text-[#1a1a1a]">
                Prachi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] to-[#FF9F1C]">Gupta</span>
              </h1>

              <p className="text-xl md:text-2xl text-stone-600 font-medium leading-relaxed max-w-xl mb-10">
                I design <span className="underline decoration-[#FF5A5F] decoration-4 underline-offset-4 decoration-skip-ink-none">beautifully efficient</span> workflows. 
                ServiceNow Administrator optimizing HR operations for <span className="font-bold text-[#1a1a1a]">Bank of America</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#FF5A5F] text-white font-bold text-lg rounded-full hover:bg-[#ff4247] transition-all shadow-xl shadow-[#FF5A5F]/30 flex items-center gap-3 hover:-translate-y-1">
                   Download CV <Download className="w-5 h-5" />
                </button>
                <a href="#work" className="px-8 py-4 bg-white text-[#1a1a1a] border border-stone-200 font-bold text-lg rounded-full hover:border-[#1a1a1a] transition-all flex items-center gap-2">
                  See My Work
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Content - Arch Shape */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-t-[200px] rounded-b-[40px] overflow-hidden border-[6px] border-white shadow-2xl shadow-stone-200 group">
              <motion.img 
                style={{ scale: scaleImg }}
                src="prachi.jpeg" 
                alt="Prachi Gupta" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating "Stamp" */}
              <div className="absolute top-8 right-8 w-24 h-24 bg-[#FF9F1C] rounded-full flex items-center justify-center text-[#1a1a1a] font-black text-xs uppercase tracking-tighter text-center leading-none shadow-lg rotate-12 animate-spin-slow">
                Open To <br/> Work
              </div>
            </div>
            
            {/* Location Tag */}
            <div className="absolute bottom-10 -left-10 bg-white p-5 rounded-xl shadow-xl border border-stone-100 flex items-center gap-4 animate-bounce-slow">
               <div className="bg-stone-100 p-3 rounded-full">
                 <MapPin className="w-6 h-6 text-[#FF5A5F]" />
               </div>
               <div>
                 <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Relocating To</p>
                 <p className="text-lg font-bold text-[#1a1a1a]">UAE / Dubai</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Statistics / Highlights Strip --- */}
      <section className="py-12 bg-[#1a1a1a] text-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-4">
               <h3 className="text-5xl font-serif font-black text-[#FF9F1C]">3+</h3>
               <p className="text-sm font-bold uppercase tracking-widest text-stone-400">Years <br/> Experience</p>
            </div>
            <div className="h-12 w-[1px] bg-stone-700 hidden md:block"></div>
            <div className="flex items-center gap-4">
               <h3 className="text-5xl font-serif font-black text-[#FF5A5F]">100%</h3>
               <p className="text-sm font-bold uppercase tracking-widest text-stone-400">Audit <br/> Compliance</p>
            </div>
            <div className="h-12 w-[1px] bg-stone-700 hidden md:block"></div>
            <div className="flex items-center gap-4">
               <h3 className="text-5xl font-serif font-black text-white">CSA</h3>
               <p className="text-sm font-bold uppercase tracking-widest text-stone-400">Certified <br/> Admin</p>
            </div>
         </div>
      </section>

      {/* --- Skills Section (Asymmetrical Grid) --- */}
      <section id="expertise" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[#FF5A5F] font-bold uppercase tracking-widest text-sm mb-2 block">My Arsenal</span>
          <h2 className="text-5xl md:text-6xl font-serif font-black text-[#1a1a1a]">
            Technical <span className="italic font-serif text-stone-400">Mastery</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Big Card 1 */}
          <div className="lg:col-span-2 p-10 bg-white rounded-[2rem] shadow-lg shadow-stone-100 border border-stone-100 hover:shadow-2xl transition-all duration-300 group">
             <div className="w-16 h-16 bg-[#FFF0F0] rounded-2xl flex items-center justify-center text-[#FF5A5F] mb-8 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8" />
             </div>
             <h3 className="text-3xl font-bold mb-4">ServiceNow Administration</h3>
             <p className="text-stone-500 text-lg leading-relaxed mb-6">
                I don't just maintain systems; I optimize them. Expert navigation of Forms, Lists, and Tables. 
                Proficient in building <span className="text-[#1a1a1a] font-bold bg-[#FF9F1C]/20 px-1">Business Rules</span> and <span className="text-[#1a1a1a] font-bold bg-[#FF9F1C]/20 px-1">UI Policies</span> that reduce manual errors.
             </p>
          </div>

          {/* Tall Card */}
          <div className="lg:row-span-2 p-10 bg-[#FF5A5F] text-white rounded-[2rem] shadow-lg shadow-[#FF5A5F]/20 flex flex-col justify-between group hover:-translate-y-2 transition-transform">
             <div>
               <ShieldCheck className="w-12 h-12 mb-8 text-white/80" />
               <h3 className="text-3xl font-bold mb-4">Compliance & Audit</h3>
               <p className="text-white/80 text-lg leading-relaxed">
                  Managing high-stakes audits for Bank of America taught me one thing: <br/> <strong className="text-white border-b-2 border-white">Zero Tolerance for Errors.</strong>
               </p>
             </div>
             <div className="mt-8 pt-8 border-t border-white/20">
               <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-70">Tools</div>
               <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">Workday</span>
                 <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">Excel</span>
               </div>
             </div>
          </div>

          {/* Standard Card */}
          <div className="p-10 bg-[#FFFBF7] rounded-[2rem] border-2 border-stone-100 hover:border-[#FF9F1C] transition-colors group">
             <Layout className="w-12 h-12 text-[#FF9F1C] mb-6 group-hover:rotate-12 transition-transform" />
             <h3 className="text-2xl font-bold mb-3">ITSM & Reporting</h3>
             <p className="text-stone-500">Creating dashboards that turn raw data into executive decisions. Incident & Change management workflows.</p>
          </div>

          {/* Standard Card */}
          <div className="p-10 bg-white rounded-[2rem] shadow-lg shadow-stone-100 border border-stone-100 group">
             <Star className="w-12 h-12 text-[#1a1a1a] mb-6 group-hover:text-[#FF5A5F] transition-colors" />
             <h3 className="text-2xl font-bold mb-3">User Management</h3>
             <p className="text-stone-500">Secure Role-Based Access Control (RBAC), Group hierarchies, and ACL configuration.</p>
          </div>

        </div>
      </section>

      {/* --- Experience Section (Sticky Layout) --- */}
      <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200">
         <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Sticky Title */}
            <div className="lg:col-span-4">
               <div className="sticky top-32">
                  <h2 className="text-5xl md:text-7xl font-serif font-black text-[#1a1a1a] mb-6">
                     Career <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] to-[#FF9F1C]">Timeline</span>
                  </h2>
                  <p className="text-stone-500 text-lg">
                     A progressive journey from HR Operations to System Administration in the banking sector.
                  </p>
                  
                  <div className="mt-12 p-6 bg-[#FF9F1C]/10 rounded-2xl border border-[#FF9F1C]/20">
                     <p className="font-bold text-[#b36b00] flex items-center gap-2">
                       <Zap className="w-4 h-4 fill-current" /> Highlight
                     </p>
                     <p className="mt-2 text-sm font-medium text-[#b36b00]">
                       Reduced onboarding delays by implementing strict validation logic in ServiceNow workflows.
                     </p>
                  </div>
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="lg:col-span-8 space-y-16">
               
               {/* Job 1 */}
               <div className="relative pl-8 md:pl-12 border-l-4 border-stone-200 hover:border-[#FF5A5F] transition-colors duration-500 group">
                  <div className="absolute -left-[11px] top-2 w-5 h-5 bg-[#FFFBF7] border-4 border-stone-300 group-hover:border-[#FF5A5F] rounded-full transition-colors"></div>
                  
                  <span className="inline-block px-4 py-1 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    Jul 2024 — Present
                  </span>
                  <h3 className="text-4xl font-bold mb-2">Compliance Manager</h3>
                  <p className="text-xl text-[#FF5A5F] font-bold mb-6">Pyramid Consulting Inc. (Bank of America)</p>
                  
                  <div className="bg-white p-8 rounded-3xl shadow-xl shadow-stone-100 border border-stone-100">
                    <ul className="space-y-4">
                      {['Ensured 100% compliance with client-mandated regulatory policies.', 'Managed end-to-end background checks & eligibility verification.', 'Streamlined compliance workflows to minimize audit risks.'].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-2 h-2 rounded-full bg-[#FF9F1C] mt-2.5 shrink-0"></span>
                          <span className="text-stone-600 font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               {/* Job 2 */}
               <div className="relative pl-8 md:pl-12 border-l-4 border-stone-200 hover:border-[#FF9F1C] transition-colors duration-500 group">
                  <div className="absolute -left-[11px] top-2 w-5 h-5 bg-[#FFFBF7] border-4 border-stone-300 group-hover:border-[#FF9F1C] rounded-full transition-colors"></div>
                  
                  <span className="inline-block px-4 py-1 bg-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    Feb 2022 — Jun 2024
                  </span>
                  <h3 className="text-4xl font-bold mb-2">HR Executive</h3>
                  <p className="text-xl text-[#FF9F1C] font-bold mb-6">Pyramid Consulting Inc.</p>
                  
                  <p className="text-stone-600 text-lg leading-relaxed mb-6">
                     Specialized in US HR Onboarding & Documentation. Managed complex tax paperwork (W2, C2C, 1099) and background verification processes for high-volume hiring.
                  </p>
               </div>

            </div>
         </div>
      </section>

      {/* --- Footer / Contact --- */}
      <footer id="contact" className="relative bg-[#1a1a1a] text-white pt-24 pb-12 overflow-hidden">
         {/* Decorative Circle */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-stone-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 mb-20">
               <div>
                  <h2 className="text-6xl md:text-8xl font-serif font-black mb-8 leading-none">
                     Let's <span className="text-[#FF5A5F]">Work</span> <br/> Together.
                  </h2>
                  <p className="text-stone-400 text-xl max-w-md mb-12 leading-relaxed">
                     Ready to bring my bags (and my brain) to the UAE. Let's optimize your ServiceNow operations.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                     <a href="mailto:Prachi.gupta.connect@gmail.com" className="group flex items-center gap-4 text-2xl font-bold hover:text-[#FF9F1C] transition-colors">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FF9F1C] group-hover:text-black transition-all">
                           <Mail className="w-5 h-5" />
                        </div>
                        Prachi.gupta.connect@gmail.com
                     </a>
                     <div className="group flex items-center gap-4 text-2xl font-bold">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                           <MapPin className="w-5 h-5" />
                        </div>
                        +91-8435151778
                     </div>
                  </div>
               </div>

               <div className="bg-[#2a2a2a] p-10 rounded-[2.5rem] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#FF9F1C]">Education & Credentials</h3>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                           <GraduationCap className="w-6 h-6 text-stone-400" />
                           <span className="font-bold">MBA (Finance)</span>
                        </div>
                        <span className="text-sm text-stone-500">2020</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                           <Briefcase className="w-6 h-6 text-stone-400" />
                           <span className="font-bold">Bachelor of Commerce</span>
                        </div>
                        <span className="text-sm text-stone-500">2018</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm font-medium">
               <p>© {new Date().getFullYear()} Prachi Gupta.</p>
               <p>Designed with ❤️ & Code.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}