import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button, ScrollReveal, FormField, toast } from '../../components/ui';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev) => { ev.preventDefault(); const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } setErrors({}); setSubmitted(true); };
  const handleChange = (ev) => { setForm({ ...form, [ev.target.name]: ev.target.value }); if (errors[ev.target.name]) setErrors({ ...errors, [ev.target.name]: '' }); };

  const inputClass = (field) => `w-full py-3 px-4 border ${errors[field] ? 'border-red-500' : 'border-gray-200'} rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Reach Out</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-base text-white/85 max-w-[560px] mx-auto">Have a question? We&apos;d love to hear from you.</p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-start">
            {/* Form */}
            <ScrollReveal animation="reveal-left">
              <h2 className="font-serif text-2xl mb-2">Send Us a Message</h2>
              <p className="text-sm text-gray-600 mb-6">Fill out the form and we&apos;ll respond as soon as possible.</p>

              {submitted ? (
                <div className="text-center p-10 bg-green-50 rounded-xl">
                  <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full bg-green-700 text-white mb-4"><Send size={32} /></div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-600 mb-6">We&apos;ll respond within 24–48 hours.</p>
                  <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass('name')} />{errors.name && <span className="text-sm text-red-600 mt-1 block">{errors.name}</span>}</div>
                    <div><label className="block text-sm font-medium text-gray-900 mb-2">Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass('email')} />{errors.email && <span className="text-sm text-red-600 mt-1 block">{errors.email}</span>}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-gray-900 mb-2">Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." className={inputClass('phone')} /></div>
                    <div><label className="block text-sm font-medium text-gray-900 mb-2">Subject *</label><input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={inputClass('subject')} />{errors.subject && <span className="text-sm text-red-600 mt-1 block">{errors.subject}</span>}</div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-900 mb-2">Message *</label><textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us more..." rows={5} className={`${inputClass('message')} resize-y min-h-[120px]`} />{errors.message && <span className="text-sm text-red-600 mt-1 block">{errors.message}</span>}</div>
                  <Button type="submit" variant="primary" size="lg" icon={Send}>Send Message</Button>
                </form>
              )}
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal animation="reveal-right">
              <div className="bg-primary-800 text-white rounded-2xl p-8 mb-6">
                <h3 className="font-serif text-xl mb-2">Contact Information</h3>
                <p className="text-sm text-white/70 mb-6">Reach out through any of these channels.</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-5 mb-6">
                  {[
                    { Icon: MapPin, label: 'Address', text: 'Ogbomoso, Oyo State, Nigeria' },
                    { Icon: Phone, label: 'Phone', text: '+234 800 000 0000', href: 'tel:+2348000000000' },
                    { Icon: Mail, label: 'Email', text: 'info@bfcn.org', href: 'mailto:info@bfcn.org' },
                    { Icon: Clock, label: 'Hours', text: 'Mon–Fri: 9:00 AM – 5:00 PM' },
                  ].map(({ Icon, label, text, href }, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 shrink-0"><Icon size={20} /></div>
                      <div><strong className="block text-sm mb-0.5">{label}</strong>{href ? <a href={href} className="text-sm text-white/70 no-underline hover:text-white transition-colors">{text}</a> : <span className="text-sm text-white/70">{text}</span>}</div>
                    </li>
                  ))}
                </ul>
                <h4 className="text-sm mb-3">Follow Us</h4>
                <div className="flex gap-3 mb-6">
                  {[
                    { name: 'Facebook', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                    { name: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                    { name: 'Instagram', path: 'M12.017 0C8.396 0 7.929.01 6.684.048 5.443.085 4.60.204 3.875.43c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.403 4.864.284 5.706.247 6.95.01 8.195 0 8.663 0 12.017s.01 3.821.048 5.067c.037 1.243.156 2.085.382 2.81.306.788.717 1.458 1.384 2.125S3.35 23.065 4.14 23.37c.724.226 1.566.345 2.809.382 1.245.038 1.713.048 5.067.048s3.821-.01 5.067-.048c1.243-.037 2.085-.156 2.81-.382.788-.306 1.458-.717 2.125-1.384s1.078-1.337 1.384-2.126c.226-.724.345-1.566.382-2.809.038-1.245.048-1.713.048-5.067s-.01-3.821-.048-5.067c-.037-1.243-.156-2.085-.382-2.81-.306-.788-.717-1.458-1.384-2.125S20.65.935 19.86.63c-.724-.226-1.566-.345-2.809-.382C15.806.01 15.338 0 12.017 0zM12.017 2.162c3.204 0 3.584.012 4.849.07 1.366.062 2.658.336 3.608 1.286.95.95 1.224 2.242 1.286 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.336 2.658-1.286 3.608-.95.95-2.242 1.224-3.608 1.286-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.658-.336-3.608-1.286-.95-.95-1.224-2.242-1.286-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.336-2.658 1.286-3.608.95-.95 2.242-1.224 3.608-1.286 1.265-.058 1.645-.07 4.849-.07zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162s2.757 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.757-6.162-6.162-6.162zM12.017 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793 0 1.44.646 1.44 1.44z' },
                    { name: 'Youtube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
                  ].map((social, i) => (
                    <a key={i} href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white/70 hover:bg-accent-400 hover:text-white transition-all no-underline" aria-label={social.name}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
                <a href="https://wa.me/2348000000000" className="flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-white rounded-lg font-semibold text-sm no-underline hover:bg-[#1da851] hover:-translate-y-0.5 hover:shadow-md transition-all" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} />Chat on WhatsApp</a>
              </div>
              <div className="relative h-[220px] border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&auto=format&fit=crop&q=80"
                  alt="Ogbomoso, Oyo State"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-gray-400 font-medium">
                  <MapPin size={32} /><span>Ogbomoso, Oyo State</span><span className="text-xs text-gray-400">Map integration coming soon</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;