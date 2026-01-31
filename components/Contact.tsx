'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s build something amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Whether you need a developer for your team or 
                want to collaborate on something exciting, feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-black rounded-xl p-4 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-slate flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white font-medium">devin@voegele.dev</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black rounded-xl p-4 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-slate flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-white font-medium">Zürich, Switzerland</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-black rounded-xl p-8 space-y-6 border border-white/10">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20"
        >
          <div className="w-full h-px bg-white/10 mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Devin</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                IAM Developer at PwC Switzerland. Building secure and beautiful digital experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-gray-500 hover:text-accent transition-colors text-sm">Home</a></li>
                <li><a href="#about" className="text-gray-500 hover:text-accent transition-colors text-sm">About</a></li>
                <li><a href="#projects" className="text-gray-500 hover:text-accent transition-colors text-sm">Projects</a></li>
                <li><a href="#skills" className="text-gray-500 hover:text-accent transition-colors text-sm">Skills</a></li>
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-white font-semibold mb-4">Projects</h4>
              <ul className="space-y-2">
                <li><a href="https://getmoneymap.org" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors text-sm">MoneyMap</a></li>
                <li><a href="#projects" className="text-gray-500 hover:text-accent transition-colors text-sm">AI Framework</a></li>
                <li><a href="#projects" className="text-gray-500 hover:text-accent transition-colors text-sm">Sim Racing Telemetry</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com/devin-voegele" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors text-sm">GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors text-sm">LinkedIn</a></li>
                <li><a href="mailto:devin@voegele.dev" className="text-gray-500 hover:text-accent transition-colors text-sm">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-6" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              Built with <span className="text-accent">Next.js</span> and <span className="text-accent">Tailwind CSS</span>
            </p>
            <p className="text-gray-600 text-sm">
              © 2026 Devin Vögele. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
