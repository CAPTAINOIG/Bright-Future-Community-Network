import { useState } from 'react';
import { HandHelping, Heart, Users, Clock, Check, ArrowRight, BookOpen, Handshake, Sprout, Smartphone, PartyPopper, Zap, MapPin, Star } from 'lucide-react';
import { Button, ScrollReveal, Drawer, SectionHeader } from '../../components/ui';
import { VolunteerForm } from '../../components/forms';

const volunteerOpportunities = [
  {
    title: 'Education Support',
    description: 'Help teach and mentor children in underserved communities',
    icon: BookOpen,
    commitment: '4-6 hours/week',
    community: 'Various schools'
  },
  {
    title: 'Community Outreach',
    description: 'Connect with community members and spread awareness',
    icon: Handshake,
    commitment: '3-5 hours/week',
    community: 'Field work'
  },
  {
    title: 'Youth Development',
    description: 'Mentor young people and help them build life skills',
    icon: Sprout,
    commitment: '2-4 hours/week',
    community: 'Youth centers'
  },
  {
    title: 'Media & Communications',
    description: 'Help us tell stories and create engaging content',
    icon: Smartphone,
    commitment: 'Flexible',
    community: 'Remote/Office'
  },
  {
    title: 'Event Support',
    description: 'Assist with organizing and running community events',
    icon: PartyPopper,
    commitment: 'Event-based',
    community: 'Various venues'
  },
  {
    title: 'Skills Training',
    description: 'Share your professional skills with community members',
    icon: Zap,
    commitment: '2-3 hours/week',
    community: 'Training centers'
  }
];

const volunteerBenefits = [
  'Make a real difference in your community',
  'Develop new skills and gain experience',
  'Meet like-minded people and build networks',
  'Flexible scheduling to fit your lifestyle',
  'Training and ongoing support provided',
  'Recognition and volunteer certificates'
];

const reasons = [
  { icon: Heart, title: 'Meaningful Impact', text: 'See the direct results of your efforts in improved lives and stronger communities.' },
  { icon: Users, title: 'Community Connection', text: 'Build lasting relationships with fellow volunteers and community members.' },
  { icon: Clock, title: 'Flexible Commitment', text: 'Choose opportunities that fit your schedule and availability.' },
];

const Volunteer = () => {
  const [showVolunteerDrawer, setShowVolunteerDrawer] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-32 -top-32 w-[460px] h-[460px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-6 bg-accent-300" />Make a Difference</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Volunteer with BFCN
            </h1>
            <p className="text-lg text-white/70 max-w-[620px] leading-relaxed mb-10">
              Join our community of changemakers and help build brighter futures in Ogbomoso and beyond.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => setShowVolunteerDrawer(true)}
              icon={HandHelping}
            >
              Become a Volunteer
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              align="left"
              label="Why volunteer"
              title="Why Volunteer with Us?"
              subtitle="Your time and skills can create lasting impact in communities that need it most."
            />
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
            {reasons.map((r) => (
              <div key={r.title} className="p-7 md:p-8 rounded-[20px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 mb-6">
                  <r.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-[1.4rem] text-gray-900 mb-3">{r.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed m-0">{r.text}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal className="rounded-[28px] bg-primary-50 border border-primary-100 p-6 sm:p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" />The benefits</span>
                <h3 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1] mb-8">What You'll Gain</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {volunteerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="grid place-items-center w-6 h-6 rounded-full bg-primary-700 text-white shrink-0 mt-0.5" aria-hidden="true">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowVolunteerDrawer(true)}
                  iconRight={ArrowRight}
                  className="mt-10 w-full sm:w-auto"
                >
                  Get Started Today
                </Button>
              </div>
              <div className="bg-white rounded-[20px] border border-gray-200 p-7 md:p-9 shadow-[var(--shadow-soft)]">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-accent-50 text-accent-600 mb-6" aria-hidden="true">
                  <Star size={22} strokeWidth={1.75} />
                </span>
                <h4 className="font-serif text-2xl text-gray-900 mb-2">Ready to Make a Difference?</h4>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
                  Join over 200+ volunteers who are already creating positive change.
                </p>
                <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 pt-6">
                  <div className="pr-4">
                    <div className="font-serif text-4xl text-primary-800 leading-none mb-2">200+</div>
                    <div className="text-sm font-medium text-gray-600">Active Volunteers</div>
                  </div>
                  <div className="pl-6">
                    <div className="font-serif text-4xl text-primary-800 leading-none mb-2">50+</div>
                    <div className="text-sm font-medium text-gray-600">Projects Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              label="Opportunities"
              title="Volunteer Opportunities"
              subtitle="Find the perfect way to contribute your time and talents."
            />
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="flex flex-col bg-white rounded-[20px] border border-gray-200 p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 mb-6">
                  <opportunity.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-[1.4rem] text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-6 flex-1">{opportunity.description}</p>
                <dl className="grid grid-cols-2 gap-4 pt-5 border-t border-gray-100 mb-6">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-1">Time Commitment</dt>
                    <dd className="m-0 flex items-center gap-1.5 text-sm font-medium text-gray-800"><Clock size={14} className="text-gray-400 shrink-0" />{opportunity.commitment}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-1">Community</dt>
                    <dd className="m-0 flex items-center gap-1.5 text-sm font-medium text-gray-800"><MapPin size={14} className="text-gray-400 shrink-0" />{opportunity.community}</dd>
                  </div>
                </dl>
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  onClick={() => setShowVolunteerDrawer(true)}
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-primary-800 relative overflow-hidden">
        <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative">
          <ScrollReveal className="text-center max-w-[680px] mx-auto">
            <span className="eyebrow text-accent-300 mb-5"><span className="h-px w-6 bg-accent-300" />Get involved<span className="h-px w-6 bg-accent-300" /></span>
            <h2 className="font-serif text-4xl md:text-[3.25rem] text-white leading-[1.05] mb-5">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10">
              Take the first step towards making a meaningful difference in your community.
            </p>
            <Button
              variant="white"
              size="lg"
              onClick={() => setShowVolunteerDrawer(true)}
              icon={HandHelping}
            >
              Register as Volunteer
            </Button>
          </ScrollReveal>
        </div>
      </section>
      <Drawer
        title="Volunteer Registration"
        placement="right"
        onClose={() => setShowVolunteerDrawer(false)}
        open={showVolunteerDrawer}
        width={600}
      >
        <VolunteerForm onClose={() => setShowVolunteerDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Volunteer;
