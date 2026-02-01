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
  Zap,
  CheckCircle2,
  TrendingUp,
  Users,
  FileCheck
} from "lucide-react";

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    { name: "ServiceNow", level: 95 },
    { name: "ITSM", level: 90 },
    { name: "Compliance", level: 98 },
    { name: "Workday", level: 85 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] via-[#FFFFFF] to-[#FFF8F3] text-[#1a1a1a] font-sans selection:bg-[#FF6B6B] selection:text-white antialiased">
      
      {/* --- Enhanced Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/95 backdrop-blur-2xl shadow-lg shadow-black/5 py-4" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-bold tracking-tight hover:text-[#FF6B6B] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] bg-clip-text text-transparent">Prachi</span>
            <span className="text-[#1a1a1a]"> Gupta</span>
          </motion.a>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Expertise', id: 'expertise' },
              { name: 'Experience', id: 'work' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
               <a 
                 key={item.name} 
                 href={`#${item.id}`} 
                 className="text-sm font-semibold text-[#4a4a4a] hover:text-[#FF6B6B] transition-all relative group"
               >
                 {item.name}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] transition-all duration-300 group-hover:w-full"></span>
               </a>
            ))}
            <motion.a 
              href="#contact" 
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] text-white font-semibold rounded-full shadow-lg shadow-[#FF6B6B]/25 hover:shadow-xl hover:shadow-[#FF6B6B]/40 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* Refined Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFE5E5] to-transparent rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: yText, opacity }}
            className="relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-[#FF6B6B] to-transparent"></div>
                <span className="text-[#FF6B6B] font-semibold text-sm tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  ServiceNow CSA Certified
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6 tracking-tight">
                Prachi Gupta
              </h1>

              <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] mb-8 rounded-full"></div>

              <p className="text-xl lg:text-2xl text-[#4a4a4a] leading-relaxed max-w-xl mb-4 font-light">
                ServiceNow Administrator specializing in 
                <span className="font-semibold text-[#1a1a1a] relative inline-block mx-2">
                  HR Operations
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FFE5E5] -z-10"></span>
                </span>
                and
                <span className="font-semibold text-[#1a1a1a] relative inline-block mx-2">
                  Compliance Management
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FFF0E5] -z-10"></span>
                </span>
              </p>

              <p className="text-lg text-[#6a6a6a] mb-10 font-light">
                Currently optimizing workflows at <span className="font-semibold text-[#1a1a1a]">Bank of America</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] text-white font-semibold rounded-full shadow-lg shadow-[#FF6B6B]/30 flex items-center gap-3"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(255, 107, 107, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                   Download Resume <Download className="w-5 h-5" />
                </motion.button>
                <motion.a 
                  href="#work" 
                  className="px-8 py-4 bg-white text-[#1a1a1a] border-2 border-[#e5e5e5] font-semibold rounded-full hover:border-[#FF6B6B] transition-all flex items-center gap-2 shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Experience
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 group border-8 border-white">
              <img 
                src="prachi.jpeg" 
                alt="Prachi Gupta" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Status Badge */}
              <motion.div 
                className="absolute top-6 right-6 px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[#1a1a1a]">Open to Work</span>
              </motion.div>
            </div>
            
            {/* Location Card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#f5f5f5] flex items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
               <div className="bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] p-3 rounded-xl">
                 <MapPin className="w-6 h-6 text-[#FF6B6B]" />
               </div>
               <div>
                 <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-wide">Relocating To</p>
                 <p className="text-lg font-bold text-[#1a1a1a]">UAE / Dubai</p>
               </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF9A6C]/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-16 bg-white border-y border-[#f0f0f0]">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "3+", label: "Years Experience", icon: TrendingUp },
              { value: "100%", label: "Audit Compliance", icon: FileCheck },
              { value: "CSA", label: "Certified Admin", icon: ShieldCheck },
              { value: "500+", label: "Cases Managed", icon: Users }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-[#FF6B6B]" />
                </div>
                <h3 className="text-4xl font-bold text-[#1a1a1a] mb-2">{stat.value}</h3>
                <p className="text-sm font-medium text-[#6a6a6a] tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="expertise" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#FF6B6B] font-semibold text-sm tracking-wide uppercase mb-3 block">Core Competencies</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-[#6a6a6a] max-w-2xl mx-auto font-light">
            Specialized skills in ServiceNow administration, compliance management, and HR operations optimization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Featured Skill Card */}
          <motion.div 
            className="md:col-span-2 p-10 bg-white rounded-3xl shadow-lg shadow-black/5 border border-[#f0f0f0] hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <div className="flex items-start gap-6">
               <div className="w-16 h-16 bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] rounded-2xl flex items-center justify-center text-[#FF6B6B] group-hover:scale-110 transition-transform shrink-0">
                  <Database className="w-8 h-8" />
               </div>
               <div className="flex-1">
                 <h3 className="text-3xl font-bold mb-4 text-[#1a1a1a]">ServiceNow Administration</h3>
                 <p className="text-[#6a6a6a] text-lg leading-relaxed mb-6 font-light">
                    Expert in platform configuration, workflow optimization, and system maintenance. Proficient in building robust 
                    <span className="font-semibold text-[#1a1a1a] mx-1">Business Rules</span>, 
                    <span className="font-semibold text-[#1a1a1a] mx-1">UI Policies</span>, and 
                    <span className="font-semibold text-[#1a1a1a] mx-1">Client Scripts</span> 
                    that reduce manual errors and improve operational efficiency.
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {['Forms & Lists', 'Tables', 'Business Rules', 'UI Policies', 'Workflows', 'ACLs'].map((tag) => (
                     <span key={tag} className="px-4 py-1.5 bg-[#FAFAF9] text-[#4a4a4a] text-sm font-medium rounded-full border border-[#f0f0f0]">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Skill Cards */}
          {[
            {
              icon: ShieldCheck,
              title: "Compliance & Audit Management",
              description: "Managing high-stakes audits with zero tolerance for errors. Ensuring 100% regulatory compliance through meticulous documentation and process control.",
              color: "from-[#FF6B6B] to-[#FF8585]",
              tags: ['Workday', 'Excel', 'Audit Trails']
            },
            {
              icon: Layout,
              title: "ITSM & Reporting",
              description: "Creating insightful dashboards and reports that transform raw data into actionable business intelligence. Expert in incident and change management workflows.",
              color: "from-[#FF9A6C] to-[#FFB088]",
              tags: ['Dashboards', 'KPIs', 'Analytics']
            },
            {
              icon: Users,
              title: "User Management & Security",
              description: "Implementing secure Role-Based Access Control (RBAC), managing group hierarchies, and configuring granular ACLs to maintain data integrity.",
              color: "from-[#FFB088] to-[#FFC299]",
              tags: ['RBAC', 'Groups', 'Security']
            },
            {
              icon: Star,
              title: "Process Optimization",
              description: "Streamlining HR onboarding and compliance workflows to reduce processing time and improve user experience across the organization.",
              color: "from-[#FFC299] to-[#FFD4AA]",
              tags: ['Automation', 'Efficiency', 'Best Practices']
            }
          ].map((skill, i) => (
            <motion.div 
              key={i}
              className="p-8 bg-white rounded-3xl shadow-lg shadow-black/5 border border-[#f0f0f0] hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
               <div className={`inline-flex w-14 h-14 bg-gradient-to-br ${skill.color} rounded-2xl items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <skill.icon className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold mb-3 text-[#1a1a1a]">{skill.title}</h3>
               <p className="text-[#6a6a6a] leading-relaxed mb-6 font-light">{skill.description}</p>
               <div className="flex flex-wrap gap-2">
                 {skill.tags.map((tag) => (
                   <span key={tag} className="px-3 py-1 bg-[#FAFAF9] text-[#4a4a4a] text-xs font-medium rounded-full border border-[#f0f0f0]">
                     {tag}
                   </span>
                 ))}
               </div>
            </motion.div>
          ))}

        </div>

        {/* Proficiency Bars */}
        <motion.div 
          className="mt-16 p-10 bg-gradient-to-br from-white to-[#FAFAF9] rounded-3xl shadow-lg shadow-black/5 border border-[#f0f0f0]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-[#1a1a1a]">Technical Proficiency</h3>
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-[#1a1a1a]">{skill.name}</span>
                  <span className="text-[#6a6a6a] font-medium">{skill.level}%</span>
                </div>
                <div className="h-3 bg-[#f5f5f5] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- Experience Section --- */}
      <section id="work" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
         <motion.div 
           className="text-center mb-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <span className="text-[#FF6B6B] font-semibold text-sm tracking-wide uppercase mb-3 block">Professional Journey</span>
           <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
             Career Experience
           </h2>
           <p className="text-lg text-[#6a6a6a] max-w-2xl mx-auto font-light">
             Progressive journey from HR Operations to System Administration in the banking sector
           </p>
         </motion.div>

         <div className="relative">
           {/* Timeline Line */}
           <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B6B] via-[#FF9A6C] to-transparent"></div>

           <div className="space-y-12">
             {[
               {
                 period: "Jul 2024 — Present",
                 current: true,
                 title: "Compliance Manager",
                 company: "Pyramid Consulting Inc. (Bank of America)",
                 description: "Leading compliance operations and regulatory adherence for a major banking client.",
                 achievements: [
                   "Achieved and maintained 100% compliance with all client-mandated regulatory policies",
                   "Managed end-to-end background verification processes for 200+ new hires",
                   "Implemented automated compliance workflows reducing audit preparation time by 40%",
                   "Coordinated cross-functional teams to ensure seamless regulatory reporting"
                 ]
               },
               {
                 period: "Feb 2022 — Jun 2024",
                 current: false,
                 title: "HR Executive",
                 company: "Pyramid Consulting Inc.",
                 description: "Specialized in US HR Onboarding, Documentation, and ServiceNow administration.",
                 achievements: [
                   "Processed complex tax documentation (W2, C2C, 1099) for 500+ employees",
                   "Reduced onboarding time by 35% through ServiceNow workflow optimization",
                   "Maintained 98% accuracy rate in background verification processes",
                   "Developed comprehensive documentation procedures adopted company-wide"
                 ]
               }
             ].map((job, i) => (
               <motion.div 
                 key={i}
                 className={`relative md:w-[calc(50%-4rem)] ${i % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16'}`}
                 initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
               >
                 {/* Timeline Dot */}
                 <div className={`absolute top-8 w-4 h-4 bg-gradient-to-br from-[#FF6B6B] to-[#FF9A6C] rounded-full border-4 border-white shadow-lg ${i % 2 === 0 ? 'md:-left-[10px]' : 'md:-right-[10px]'} left-[23px]`}></div>
                 
                 <div className="ml-16 md:ml-0 bg-white rounded-3xl shadow-lg shadow-black/5 border border-[#f0f0f0] p-8 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                   <div className="flex items-center gap-3 mb-4">
                     {job.current && (
                       <span className="px-3 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] text-white text-xs font-semibold rounded-full">
                         Current Role
                       </span>
                     )}
                     <span className={`px-3 py-1 ${job.current ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f5f5] text-[#6a6a6a]'} text-xs font-semibold rounded-full`}>
                       {job.period}
                     </span>
                   </div>
                   
                   <h3 className="text-2xl font-bold mb-2 text-[#1a1a1a]">{job.title}</h3>
                   <p className="text-lg font-semibold text-[#FF6B6B] mb-4">{job.company}</p>
                   <p className="text-[#6a6a6a] mb-6 font-light leading-relaxed">{job.description}</p>
                   
                   <div className="space-y-3">
                     {job.achievements.map((achievement, j) => (
                       <div key={j} className="flex items-start gap-3">
                         <CheckCircle2 className="w-5 h-5 text-[#FF9A6C] shrink-0 mt-0.5" />
                         <span className="text-[#4a4a4a] font-light leading-relaxed">{achievement}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* --- Education Section --- */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { degree: "MBA in Finance", year: "2020", icon: Briefcase, institution: "Business School" },
            { degree: "Bachelor of Commerce", year: "2018", icon: GraduationCap, institution: "University" }
          ].map((edu, i) => (
            <motion.div 
              key={i}
              className="p-8 bg-white rounded-3xl shadow-lg shadow-black/5 border border-[#f0f0f0] flex items-center gap-6 hover:shadow-xl hover:shadow-black/10 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] rounded-2xl flex items-center justify-center shrink-0">
                <edu.icon className="w-8 h-8 text-[#FF6B6B]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{edu.degree}</h3>
                <p className="text-[#6a6a6a] font-light">{edu.institution}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#FF6B6B]">{edu.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Contact Section --- */}
      <footer id="contact" className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white pt-24 pb-12 overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF9A6C]/10 rounded-full blur-3xl"></div>

         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                  <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                     Let's Create <br/>
                     <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF9A6C] bg-clip-text text-transparent">
                       Something Great
                     </span>
                  </h2>
                  <p className="text-[#b0b0b0] text-xl mb-12 leading-relaxed font-light max-w-lg">
                     Ready to bring expertise and dedication to optimize your ServiceNow operations in the UAE.
                  </p>
                  
                  <div className="space-y-6">
                     <motion.a 
                       href="mailto:Prachi.gupta.connect@gmail.com" 
                       className="group flex items-center gap-4 text-xl hover:text-[#FF9A6C] transition-colors"
                       whileHover={{ x: 10 }}
                     >
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#FF6B6B] group-hover:to-[#FF9A6C] transition-all">
                           <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-[#b0b0b0] font-light">Email</p>
                          <p className="font-semibold">Prachi.gupta.connect@gmail.com</p>
                        </div>
                     </motion.a>
                     
                     <motion.div 
                       className="flex items-center gap-4 text-xl"
                       whileHover={{ x: 10 }}
                     >
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-[#b0b0b0] font-light">Phone</p>
                          <p className="font-semibold">+91-8435151778</p>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>

               <motion.div 
                 className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10"
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
               >
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-6 h-6 text-[#FF9A6C]" />
                    <h3 className="text-2xl font-bold">Quick Facts</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { label: "Availability", value: "Immediate" },
                      { label: "Work Authorization", value: "Open to Sponsorship" },
                      { label: "Preferred Location", value: "Dubai, UAE" },
                      { label: "Work Mode", value: "On-site / Hybrid" }
                    ].map((fact, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-[#b0b0b0] font-light">{fact.label}</span>
                        <span className="font-semibold">{fact.value}</span>
                      </div>
                    ))}
                  </div>
               </motion.div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#b0b0b0] text-sm font-light">
               <p>© {new Date().getFullYear()} Prachi Gupta. All rights reserved.</p>
               <p>Crafted with precision and passion</p>
            </div>
         </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}