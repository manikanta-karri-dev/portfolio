import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Terminal,
} from 'lucide-react';

// Self-contained Brand SVGs (avoids lucide-react deprecation errors)
const GithubIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const emailAddress = 'manikantakarri634@gmail.com';
  const web3formsAccessKey = '2c0d5dc9-60c3-43b2-bb71-f15b1bea7eea';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Inquiry',
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.warn('API submission failed, using mailto fallback:', error);
      // Seamless mail client fallback
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Hi Manikanta,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full bg-[#121212] py-28 px-6 md:px-12 lg:px-20 text-white overflow-hidden selection:bg-emerald-500/30 selection:text-white"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Let’s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Exceptional Together.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-400 font-light leading-relaxed">
            Looking for an opportunity to start my career in software development, contribute to real-world projects, and grow with a team. Open to immediate joining.
            </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Availability Badge */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                  Available for opportunities
                </span>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Focused on React.js, high-performance web graphics, full-stack architectures, and Machine Learning applications.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                Direct Contact
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-white/5 bg-zinc-950/60">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-mono text-zinc-200 truncate">
                    {emailAddress}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white hover:border-emerald-500/40 hover:bg-zinc-800 transition-all flex-shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Meta & Profiles */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 py-1 border-b border-white/5">
                <span className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </span>
                <span className="text-zinc-200">India</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 py-1 border-b border-white/5">
                <span className="flex items-center gap-2 text-zinc-500">
                  <Clock className="h-3.5 w-3.5" /> Timezone
                </span>
                <span className="text-zinc-200">IST (UTC+05:30)</span>
              </div>

              {/* Verified Profiles */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                  Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/manikanta-karri-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-zinc-950/60 hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-all text-xs font-mono text-zinc-300 hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="h-4 w-4 text-zinc-400" /> GitHub
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/manikanta-karri-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-zinc-950/60 hover:border-cyan-500/40 hover:bg-zinc-900/60 transition-all text-xs font-mono text-zinc-300 hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="h-4 w-4 text-zinc-400" /> LinkedIn
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Web3Forms Transmission Interface (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-zinc-950/70 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6">
                <Terminal className="h-4 w-4 text-emerald-400" /> Dispatch Communication
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="h-12 w-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Dispatched!</h3>
                  <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6">
                    Thank you for reaching out. Your transmission has been sent straight to my inbox, and I will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs font-mono text-emerald-400 hover:underline"
                  >
                    Send another message &rarr;
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Please Enter your Name"
                        className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500/60 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Please Enter Email"
                        className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500/60 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Role Opportunity / Project Discussion"
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500/60 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the role, technical scope, or timeline..."
                      className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-emerald-500/60 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Spinning Conic Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex w-full items-center justify-center p-[1px] overflow-hidden rounded-xl transition-all duration-300 disabled:opacity-60"
                    >
                      <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#06b6d4_50%,#10b981_100%)] opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-xs font-mono font-medium uppercase tracking-widest text-white group-hover:bg-zinc-900 transition-colors">
                        {isSubmitting ? (
                          'Dispatching Transmission...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}