import { useState } from 'react';
import { UserPlus, Users, Award, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Button, ScrollReveal } from '../../components/ui';
import Drawer from '../../components/ui/Drawer';
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
    icon: '🌟',
    features: ['Voting rights', 'Committee participation', 'Leadership opportunities', 'Full benefits access']
  },
  {
    title: 'Associate Member',
    description: 'Participate in programs with limited administrative rights',
    icon: '🤝',
    features: ['Program participation', 'Event access', 'Networking opportunities', 'Resource access']
  },
  {
    title: 'Youth Member',
    description: 'Special membership for young people under 25',
    icon: '🌱',
    features: ['Youth programs', 'Mentorship access', 'Skill development', 'Career guidance']
  }
];

const Join = () => {
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);

  return (
    <div>
     <Toaster position="top-right" />
      <section className="relative py-24 bg-gradient-to-br from-green-800 to-green-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-yellow-400 mb-4">
              Become a Member
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Join the BFCN Family
            </h1>

            <p className="text-base text-white/85 max-w-[560px] mx-auto mb-8">
              Be part of a growing community of changemakers committed to building stronger, more prosperous communities.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowJoinDrawer(true)}
              icon={UserPlus}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            >
              Apply for Membership
            </Button>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Why Join BFCN?
            </h2>
            <p className="text-gray-600">
              Become part of a community that's making real change happen.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ScrollReveal animation="reveal-left">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
                <p className="text-gray-600">
                  Work together with like-minded individuals to create lasting positive change in our communities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-up">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personal Growth</h3>
                <p className="text-gray-600">
                  Develop leadership skills, expand your network, and gain valuable experience in community development.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-right">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Meaningful Purpose</h3>
                <p className="text-gray-600">
                  Contribute to projects that matter and see the direct impact of your involvement in improving lives.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="bg-green-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Membership Benefits</h3>
                <ul className="space-y-3">
                  {membershipBenefits.slice(0, 6).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowJoinDrawer(true)}
                  icon={ArrowRight}
                  className="mt-6"
                >
                  Start Your Application
                </Button>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="text-4xl mb-4">👥</div>
                  <h4 className="text-xl font-semibold mb-2">Join Our Growing Community</h4>
                  <p className="text-gray-600 mb-4">
                    Be part of an organization that's making real difference.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">500+</div>
                      <div className="text-sm text-gray-600">Active Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">25+</div>
                      <div className="text-sm text-gray-600">Ongoing Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Membership Types
            </h2>
            <p className="text-gray-600">
              Choose the membership level that best fits your availability and interests.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTypes.map((type, index) => (
              <ScrollReveal key={index} animation="reveal-up">
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowJoinDrawer(true)}
                  >
                    Apply Now
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-green-600">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/85 mb-8">
              Join hundreds of community members who are already creating positive change.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowJoinDrawer(true)}
              icon={UserPlus}
              className="bg-white hover:bg-gray-100 text-green-600 font-semibold"
            >
              Submit Your Application
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Drawer
        isOpen={showJoinDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              Join Bright Future Community Network
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              Your details are safe with us
            </p>
          </div>
        }
        onClose={() => setShowJoinDrawer(false)}
        position="right"
      >
        <JoinForm onClose={() => setShowJoinDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Join;