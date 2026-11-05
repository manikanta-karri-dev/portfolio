import React from 'react';
import CertificateCard from './CertificateCard';
import { Award } from 'lucide-react';

const CERTIFICATES = [
  {
    id: 'ai-ml_internship',
    title: 'AI-ML Internship',
    issuer: 'EDUNET Foundation',
    date: '2025',
    file: 'ai-ml_internship.pdf',
  },
  {
    id: 'aiml_virtual_internship',
    title: 'AI-ML Virtual Internship',
    issuer: 'AICTE - EduSkills',
    date: '2025',
    file: 'AI-ML-Virtual_internship.pdf',
  },
  {
    id: 'gen-ai-apsche',
    title: 'ChatGPT & Generative AI Internship',
    issuer: 'APSCHE & IIDT Tirupati',
    date: '2024',
    file: 'generative_ai_apsche.pdf',
  },
  {
    id: 'mern-blackbucks',
    title: 'Full Stack Web Development with MERN',
    issuer: 'Blackbuck Engineers',
    date: 'Jul 2025',
    file: 'mern_full_stack_internship.pdf',
  },
  {
    id: 'ibm-ai',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Jul 2025',
    file: 'ibm_ai_fundamentals.pdf',
  },
  {
    id: 'aicte-ethical-hacking',
    title: 'Ethical Hacking Virtual Internship',
    issuer: 'AICTE - EduSkills',
    date: 'Mar 2025',
    file: 'aicte_ethical_hacking.pdf',
  },
  {
    id: 'infosys-web-dev',
    title: 'Website Development Tutorial',
    issuer: 'Infosys Springboard',
    date: 'May 2025',
    file: 'infosys_website_dev.pdf',
  },
  {
    id: 'cisco-python',
    title: 'PCAP: Programming Essentials in Python',
    issuer: 'Cisco Networking Academy',
    date: 'Jul 2021',
    file: 'cisco_python_essentials.pdf',
  },
  {
    id: 'hackerrank-java',
    title: 'Java (Basic) Skill Certification',
    issuer: 'HackerRank',
    date: 'Aug 2025',
    file: 'hackerrank_java_basic.pdf',
  },
  {
    id: 'hackerrank-python',
    title: 'Python (Basic) Skill Certification',
    issuer: 'HackerRank',
    date: 'Dec 2024',
    file: 'hackerrank_python_basic.pdf',
  },
];

export default function Certifications() {
  const duplicatedList = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <section
      id="certifications"
      className="relative z-20 w-full bg-[#121212] py-28 text-white overflow-hidden selection:bg-violet-500/30 selection:text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-violet-600/10 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-mono text-xs tracking-widest uppercase mb-4">
          <Award className="w-3.5 h-3.5 text-violet-400" />
          CERTIFICATIONS & CREDENTIALS
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Learning,  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-indigo-300"> one step at a time.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm md:text-base text-zinc-400 font-light">
          A collection of courses, internships, and certifications I've completed along the way. Hover to pause, click to view the full certificate.
        </p>
      </div>

      <div className="relative w-full pause-on-hover">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-[#121212] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-32 bg-gradient-to-l from-[#121212] to-transparent z-20" />

        <div className="animate-infinite-scroll flex gap-6 px-6 py-4">
          {duplicatedList.map((cert, index) => (
            <CertificateCard key={`${cert.id}-${index}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}