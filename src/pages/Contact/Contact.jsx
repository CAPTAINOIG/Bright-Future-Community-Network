import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, HeadphonesIcon } from 'lucide-react';
import { Button, ScrollReveal } from '../../components/ui';
import Drawer from '../../components/ui/Drawer';
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
      <section className="relative py-24 bg-gradient-to-br from-green-800 to-green-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-yellow-400 mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-base text-white/85 max-w-[560px] mx-auto mb-8">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowContactDrawer(true)}
              icon={Send}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            >
              Send Message
            </Button>
          </ScrollReveal>
        </div>
        
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              How Can We Help?
            </h2>
            <p className="text-gray-600">
              Choose the best way to reach us. We're committed to responding quickly and helpfully.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <ScrollReveal key={index} animation="reveal-up">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="space-y-2">
                    {method.href ? (
                      <a 
                        href={method.href}
                        className="inline-block text-green-600 font-medium hover:text-green-700"
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {method.action}
                      </a>
                    ) : (
                      <span className="text-green-600 font-medium">{method.action}</span>
                    )}
                    <div className="text-sm text-gray-500">{method.available}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center">
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Prefer to Send a Message?</h3>
              <p className="text-gray-600 mb-6">
                Fill out our contact form and we'll get back to you within 24 hours.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowContactDrawer(true)}
                icon={Send}
              >
                Open Contact Form
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-gray-600">Come see us in person. We're located in the heart of Ogbomoso.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="reveal-left">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Our Location</h4>
                    <p className="text-gray-600">Ogbomoso, Oyo State</p>
                    <p className="text-gray-600">Nigeria</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right">
              <div className="relative h-[300px] bg-gray-200 rounded-2xl overflow-hidden">
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
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
        position="right"
         title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
             Contact Us
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              Your details are safe with us
            </p>
            </div>
          }
      >
        <ContactForm onClose={() => setShowContactDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Contact;