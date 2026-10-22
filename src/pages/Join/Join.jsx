import { useState } from 'react';
import { UserPlus, Users, Award, Target, Check, ArrowRight, Star, Handshake, Sprout } from 'lucide-react';
import { Button, ScrollReveal, Drawer, SectionHeader } from '../../components/ui';
import { JoinForm } from '../../components/forms';
import { Toaster } from 'sonner';

const membershipBenefits = [
  'Access to exclusive training programs and workshops',
  'Networking opportunities with community leaders',
  'Volunteer opportunities in various projects',
  'Access to BFCN resources and facilities',
  'Mentorship from experienced community workers',
  'Recognition and certificates for contributions',
  'Priority access to events and programs',
  'Opportunity to lead community initiatives'
];

const membershipTypes = [
  {
    title: 'Active Member',
    description: 'Full participation in all BFCN activities and programs',
    icon: Star,
    features: ['Voting rights', 'Committee participation', 'Leadership opportunities', 'Full benefits access']
  },
  {
    title: 'Associate Member',
    description: 'Participate in programs with limited administrative rights',
    icon: Handshake,
    features: ['Program participation', 'Event access', 'Networking opportunities', 'Resource access']
  },
  {
    title: 'Youth Member',
    description: 'Special membership for young people under 25',
    icon: Sprout,
    features: ['Youth programs', 'Mentorship access', 'Skill development', 'Career guidance']
  }
];

const reasons = [
  { icon: Users, title: 'Community Impact', text: 'Work together with like-minded individuals to create lasting positive change in our communities.' },
  { icon: Award, title: 'Personal Growth', text: 'Develop leadership skills, expand your network, and gain valuable experience in community development.' },
  { icon: Target, title: 'Meaningful Purpose', text: 'Contribute to projects that matter and see the direct impact of your involvement in improving lives.' },
];

const Join = () => {
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);

  return (
    <div>
     <Toaster position="top-right" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-32 -top-32 w-[460px] h-[460px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-6 bg-accent-300" />Become a Member</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Join the BFCN Family
            </h1>
            <p className="text-lg text-white/70 max-w-[620px] leading-relaxed mb-10">
              Be part of a growing community of changemakers committed to building stronger, more prosperous communities.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => setShowJoinDrawer(true)}
              icon={UserPlus}
            >
              Apply for Membership
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Why join */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              align="left"
              label="Why join"
              title="Why Join BFCN?"
              subtitle="Become part of a community that's making real change happen."
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
                <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" />What you get</span>
                <h3 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1] mb-8">Membership Benefits</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {membershipBenefits.slice(0, 6).map((benefit, index) => (
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
                  onClick={() => setShowJoinDrawer(true)}
                  iconRight={ArrowRight}
                  className="mt-10 w-full sm:w-auto"
                >
                  Start Your Application
                </Button>
              </div>
              <div className="bg-white rounded-[20px] border border-gray-200 p-7 md:p-9 shadow-[var(--shadow-soft)]">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-accent-50 text-accent-600 mb-6" aria-hidden="true">
                  <Users size={22} strokeWidth={1.75} />
                </span>
                <h4 className="font-serif text-2xl text-gray-900 mb-2">Join Our Growing Community</h4>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
                  Be part of an organization that's making real difference.
                </p>
                <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200 pt-6">
                  <div className="pr-4">
                    <div className="font-serif text-4xl text-primary-800 leading-none mb-2">500+</div>
                    <div className="text-sm font-medium text-gray-600">Active Members</div>
                  </div>
                  <div className="pl-6">
                    <div className="font-serif text-4xl text-primary-800 leading-none mb-2">25+</div>
                    <div className="text-sm font-medium text-gray-600">Ongoing Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Membership types */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              label="Choose your path"
              title="Membership Types"
              subtitle="Choose the membership level that best fits your availability and interests."
            />
          </ScrollReveal>

          <ScrollReveal animation="stagger-children" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTypes.map((type, index) => (
              <div key={index} className="flex flex-col bg-white rounded-[20px] border border-gray-200 p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center justify-between mb-8">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700">
                    <type.icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-sm text-gray-400">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-[1.5rem] text-gray-900 mb-3">{type.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-6">{type.description}</p>
                <ul className="space-y-3 mb-8 pt-6 border-t border-gray-100 flex-1">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check size={16} strokeWidth={2.5} className="text-primary-600 shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  onClick={() => setShowJoinDrawer(true)}
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
              Ready to Make a Difference?
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10">
              Join hundreds of community members who are already creating positive change.
            </p>
            <Button
              variant="white"
              size="lg"
              onClick={() => setShowJoinDrawer(true)}
              icon={UserPlus}
            >
              Submit Your Application
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Join Form Drawer */}
      <Drawer
        title="Join Bright Future Community Network"
        placement="right"
        onClose={() => setShowJoinDrawer(false)}
        open={showJoinDrawer}
        width={600}
      >
        <JoinForm onClose={() => setShowJoinDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Join;
