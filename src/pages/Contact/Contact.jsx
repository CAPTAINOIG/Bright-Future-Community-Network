import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, HeadphonesIcon, ArrowUpRight } from 'lucide-react';
import { Button, ScrollReveal, Drawer, SectionHeader } from '../../components/ui';
import { ContactForm } from '../../components/forms';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us during business hours for immediate assistance',
    action: '+234 800 000 0000',
    href: 'tel:+2348000000000',
    available: 'Mon-Fri 9AM-5PM'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    action: 'info@bfcn.org',
    href: 'mailto:info@bfcn.org',
    available: 'Always available'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat with us directly for quick questions',
    action: 'Chat Now',
    href: 'https://wa.me/2348000000000',
    available: 'Mon-Fri 9AM-6PM'
  }
];

const Contact = () => {
  const [showContactDrawer, setShowContactDrawer] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-32 -top-32 w-[460px] h-[460px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-6 bg-accent-300" />Get in Touch</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white/70 max-w-[620px] leading-relaxed mb-10">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => setShowContactDrawer(true)}
              icon={Send}
            >
              Send Message
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              align="left"
              label="Reach us"
              title="How Can We Help?"
              subtitle="Choose the best way to reach us. We're committed to responding quickly and helpfully."
            />
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
            {contactMethods.map((method, index) => {
              const external = method.href?.startsWith('http');
              return (
                <div key={index} className="flex flex-col p-7 md:p-8 bg-white rounded-[20px] border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 mb-6">
                    <method.icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-serif text-[1.4rem] text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-6 flex-1">{method.description}</p>
                  <div className="pt-5 border-t border-gray-100 space-y-1.5">
                    {method.href ? (
                      <a
                        href={method.href}
                        className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary-700 no-underline hover:text-primary-800"
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                      >
                        {method.action}
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <span className="text-[15px] font-semibold text-primary-700">{method.action}</span>
                    )}
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500"><Clock size={14} />{method.available}</div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

          <ScrollReveal className="relative overflow-hidden rounded-[28px] bg-accent-50 border border-accent-100 px-6 py-12 md:px-14 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-start gap-5 max-w-[560px]">
                <span className="hidden sm:grid place-items-center w-12 h-12 rounded-full bg-white text-accent-600 shrink-0 border border-accent-100" aria-hidden="true">
                  <HeadphonesIcon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-serif text-3xl md:text-[2.25rem] leading-[1.1] text-gray-900 mb-3">Prefer to Send a Message?</h3>
                  <p className="text-base text-gray-600 leading-relaxed m-0">
                    Fill out our contact form and we'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowContactDrawer(true)}
                icon={Send}
                className="w-full md:w-auto shrink-0"
              >
                Open Contact Form
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="reveal-left">
              <SectionHeader
                align="left"
                label="Our office"
                title="Visit Our Office"
                subtitle="Come see us in person. We're located in the heart of Ogbomoso."
                className="!mb-10"
              />
              <div className="flex items-start gap-4 p-6 rounded-[20px] bg-white border border-gray-200">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 shrink-0">
                  <MapPin size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-2">Our Location</h4>
                  <p className="font-serif text-xl text-gray-900 m-0 leading-snug">Ogbomoso, Oyo State</p>
                  <p className="text-[15px] text-gray-600 m-0 mt-0.5">Nigeria</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right">
              <div className="relative aspect-[4/3] bg-gray-200 rounded-[20px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&auto=format&fit=crop&q=80"
                  alt="Ogbomoso, Oyo State"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {/* Contact Form Drawer */}
      <Drawer
        title="Contact Us"
        placement="right"
        onClose={() => setShowContactDrawer(false)}
        open={showContactDrawer}
        width={600}
      >
        <ContactForm onClose={() => setShowContactDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Contact;
