import { useState } from 'react';
import { HandHelping, Heart, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button, ScrollReveal } from '../../components/ui';
import Drawer from '../../components/ui/Drawer';
import { VolunteerForm } from '../../components/forms';

const volunteerOpportunities = [
  {
    title: 'Education Support',
    description: 'Help teach and mentor children in underserved communities',
    icon: '📚',
    commitment: '4-6 hours/week',
    location: 'Various schools'
  },
  {
    title: 'Community Outreach',
    description: 'Connect with community members and spread awareness',
    icon: '🤝',
    commitment: '3-5 hours/week',
    location: 'Field work'
  },
  {
    title: 'Youth Development',
    description: 'Mentor young people and help them build life skills',
    icon: '🌱',
    commitment: '2-4 hours/week',
    location: 'Youth centers'
  },
  {
    title: 'Media & Communications',
    description: 'Help us tell stories and create engaging content',
    icon: '📱',
    commitment: 'Flexible',
    location: 'Remote/Office'
  },
  {
    title: 'Event Support',
    description: 'Assist with organizing and running community events',
    icon: '🎉',
    commitment: 'Event-based',
    location: 'Various venues'
  },
  {
    title: 'Skills Training',
    description: 'Share your professional skills with community members',
    icon: '⚡',
    commitment: '2-3 hours/week',
    location: 'Training centers'
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

const Volunteer = () => {
  const [showVolunteerDrawer, setShowVolunteerDrawer] = useState(false);

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-green-800 to-green-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-yellow-400 mb-4">
              Make a Difference
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Volunteer with BFCN
            </h1>

            <p className="text-base text-white/85 max-w-[560px] mx-auto mb-8">
              Join our community of changemakers and help build brighter futures in Ogbomoso and beyond.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowVolunteerDrawer(true)}
              icon={HandHelping}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            >
              Become a Volunteer
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

      {/* Why Volunteer Section */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Why Volunteer with Us?
            </h2>
            <p className="text-gray-600">
              Your time and skills can create lasting impact in communities that need it most.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ScrollReveal animation="reveal-left">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Meaningful Impact</h3>
                <p className="text-gray-600">
                  See the direct results of your efforts in improved lives and stronger communities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-up">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Connection</h3>
                <p className="text-gray-600">
                  Build lasting relationships with fellow volunteers and community members.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-right">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Commitment</h3>
                <p className="text-gray-600">
                  Choose opportunities that fit your schedule and availability.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="bg-green-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">What You'll Gain</h3>
                <ul className="space-y-3">
                  {volunteerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowVolunteerDrawer(true)}
                  icon={ArrowRight}
                  className="mt-6"
                >
                  Get Started Today
                </Button>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="text-4xl mb-4">🌟</div>
                  <h4 className="text-xl font-semibold mb-2">Ready to Make a Difference?</h4>
                  <p className="text-gray-600 mb-4">
                    Join over 200+ volunteers who are already creating positive change.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">200+</div>
                      <div className="text-sm text-gray-600">Active Volunteers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">50+</div>
                      <div className="text-sm text-gray-600">Projects Supported</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-gray-600">
              Find the perfect way to contribute your time and talents.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <ScrollReveal key={index} animation="reveal-up">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{opportunity.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Commitment:</span>
                      <span className="font-medium">{opportunity.commitment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{opportunity.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowVolunteerDrawer(true)}
                    className="mt-4"
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
              Ready to Get Started?
            </h2>
            <p className="text-white/85 mb-8">
              Take the first step towards making a meaningful difference in your community.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowVolunteerDrawer(true)}
              icon={HandHelping}
              className="bg-white hover:bg-gray-100 text-green-600 font-semibold"
            >
              Register as Volunteer
            </Button>
          </ScrollReveal>
        </div>
      </section>
      <Drawer
        isOpen={showVolunteerDrawer}
        onClose={() => setShowVolunteerDrawer(false)}
        position="right"
         title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              Register as Volunteer
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
               Your details are safe with us
            </p>
            </div>
          }
      >
        <VolunteerForm onClose={() => setShowVolunteerDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default Volunteer;
