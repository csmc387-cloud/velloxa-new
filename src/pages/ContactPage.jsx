import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Stepper, { Step } from '../components/Stepper';
import PhoneIcon from '../components/PhoneIcon';
import MailSendIcon from '../components/MailSendIcon';
import { submitLeadToApi } from '../utils/excelExporter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Integration',
    budget: '₹5k - ₹10k',
    message: ''
  });
  const [apiSynced, setApiSynced] = useState(false);

  const handleStepChange = (step) => {
    if (step === 4 && !apiSynced) {
      submitLeadToApi(formData);
      setApiSynced(true);
    }
  };

  const handleFinalCompleted = () => {
    if (!apiSynced) {
      submitLeadToApi(formData);
      setApiSynced(true);
    }
  };

  const isStepValid = (step) => {
    if (step === 1) {
      return (
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.email.includes('@') &&
        formData.company.trim() !== ''
      );
    }
    if (step === 2) {
      return formData.service.trim() !== '';
    }
    if (step === 3) {
      return formData.message.trim() !== '';
    }
    return true;
  };

  return (
    <div id="contact-section" className="space-y-12 pb-16 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* 1. HEADER */}
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="font-display flex flex-col items-center justify-center -space-y-1 sm:-space-y-3 leading-none">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest text-white uppercase">
            Let's Build Something
          </span>
          <span className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] leading-none">
            EXTRAORDINARY<span className="text-lime drop-shadow-[0_0_25px_rgba(186,255,122,0.7)]">.</span>
          </span>
        </h2>
      </section>

      {/* 2. MINIMALIST STEPPER CONTACT FORM */}
      <Stepper
        initialStep={1}
        isStepValid={isStepValid}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalCompleted}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        {/* STEP 1: IDENTITY */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-medium text-white">Client Identification</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Provide your name, Gmail / Insta Handle, and business name.</p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/50 text-sm transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Gmail / Insta Handle"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none text-sm transition-all ${
                    formData.email.length > 0 && !formData.email.includes('@')
                      ? 'border-red-500/50 focus:border-red-500'
                      : formData.email.includes('@')
                      ? 'border-lime/50 focus:border-lime'
                      : 'border-white/10 focus:border-lime/50'
                  }`}
                />
                {formData.email.length > 0 && !formData.email.includes('@') && (
                  <p className="text-red-400 text-[11px] font-mono mt-1 pl-1 flex items-center space-x-1">
                    <span>⚠️ Must include '@' symbol (e.g. user@gmail.com or @instahandle)</span>
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Business / Company Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/50 text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 2: SERVICE SELECTION */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-medium text-white">Target Service Domain</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Select the area that fits your objectives.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                { name: 'AI Integration', desc: 'Automate internal operations, customer intake & custom AI workflows' },
                { name: 'Web Engineering', desc: 'High-converting performance Web apps' },
                { name: 'Passion Marketing', desc: 'Top-tier SEO, social media marketing & putting your SME out there' },
                { name: 'Full Scale Suite', desc: 'Complete digital transformation' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setFormData({ ...formData, service: item.name })}
                  className={`p-3.5 rounded-xl text-left border transition-all ${formData.service === item.name
                      ? 'border-lime bg-lime/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                >
                  <span className="block font-medium text-sm text-white mb-0.5">{item.name}</span>
                  <span className="block text-xs text-gray-400">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </Step>

        {/* STEP 3: SCOPE & BUDGET */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-medium text-white">Scope & Budget</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Indicate estimated budget and project requirements.</p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['₹5k - ₹10k', '₹10k - ₹15k', '₹15k - ₹20k', 'Negotiable Price'].map((range) => (
                    <button
                      type="button"
                      key={range}
                      onClick={() => setFormData({ ...formData, budget: range })}
                      className={`py-2 px-3 rounded-lg text-xs font-mono transition-all ${formData.budget === range
                          ? 'bg-lime text-charcoal font-bold'
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline key project objectives or timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/50 text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 4: CONFIRMATION */}
        <Step>
          <div className="space-y-6 py-4 text-center relative pb-8">
            {/* Animated Spring Pop Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.1 }}
              className="size-16 rounded-full bg-lime/10 border-2 border-lime text-lime flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(186,255,122,0.6)]"
            >
              <CheckCircle2 className="size-8 stroke-[2.5]" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">INTAKE TRANSMITTED</h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                Thank you partner, we will reach you thru your email / dm within 24 hours.
              </p>
            </div>

            {/* Lower Left Corner Phone Numbers & Gmail */}
            <div className="absolute -bottom-2.5 left-0 flex flex-col items-start space-y-1 z-20">
              {/* Phone Numbers Row */}
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono text-gray-400">
                <PhoneIcon size={14} className="text-gray-300 hover:text-lime transition-all" />
                <a
                  href="tel:+919266544745"
                  className="text-gray-300 hover:text-lime transition-colors font-medium"
                  title="Call 9266544745"
                >
                  9266544745
                </a>
                <span className="text-lime/70 font-bold">•</span>
                <a
                  href="tel:+919711886700"
                  className="text-gray-300 hover:text-lime transition-colors font-medium"
                  title="Call 9711886700"
                >
                  9711886700
                </a>
              </div>

              {/* Gmail Row */}
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono text-gray-400">
                <a
                  href="mailto:velloxa.agency@gmail.com"
                  className="flex items-center space-x-1.5 text-gray-300 hover:text-lime transition-colors font-medium"
                  title="Send Email to velloxa.agency@gmail.com"
                >
                  <MailSendIcon size={14} className="text-gray-300 hover:text-lime transition-all" />
                  <span>velloxa.agency@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </Step>
      </Stepper>

    </div>
  );
}
