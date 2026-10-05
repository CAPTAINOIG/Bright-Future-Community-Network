import { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  Send,
  Clock,
  Handshake,
  Rocket,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { Button, ScrollReveal, Badge, SectionHeader } from '../../components/ui';
import Drawer from '../../components/ui/Drawer';
import CommunityIdeasForm from './CommunityIdeasForm';

const sampleIdeas = [
  {
    id: 1,
    name: 'Adeola Ibrahim',
    community: 'Oke-Elerin',
    problem: 'No access to clean drinking water',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Rasheed Afolabi',
    community: 'Isale-Ora',
    problem: 'Youth unemployment and lack of training centres',
    status: 'Under Review',
  },
  {
    id: 3,
    name: 'Mrs. Funke Balogun',
    community: 'Arowomole',
    problem: 'Poor road access to schools',
    status: 'Discussed',
  },
  {
    id: 4,
    name: 'Musa Bello',
    community: 'Oyo township',
    problem: 'Flooding during rainy season damages homes',
    status: 'Under Review',
  },
];

const impactStats = [
  {
    label: 'Ideas Submitted',
    value: '127',
    hint: 'since launch',
    icon: Lightbulb,
    tone: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  {
    label: 'Communities Reached',
    value: '18',
    hint: 'across Oyo & beyond',
    icon: Users,
    tone: 'bg-primary-50 text-primary-700 border-primary-200',
  },
  {
    label: 'Ideas Implemented',
    value: '43',
    hint: 'delivering real change',
    icon: CheckCircle2,
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    label: 'Avg. Review Time',
    value: '48h',
    hint: 'fast turnaround',
    icon: Clock,
    tone: 'bg-blue-50 text-blue-700 border-blue-200',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Share Your Idea',
    body: 'Tell us about the challenge you see and the solution you envision. No idea is too small.',
    icon: Send,
  },
  {
    step: '02',
    title: 'We Review & Discuss',
    body: 'The BFCN team evaluates every submission and follows up with your community for clarity.',
    icon: MessageSquare,
  },
  {
    step: '03',
    title: 'We Take Action',
    body: 'Approved ideas are prioritized, funded, and tracked — with updates posted to the Idea Tracker.',
    icon: Rocket,
  },
];

const ideaBenefits = [
  'Fast acknowledgement within 48 hours of submission',
  'Anonymous option available for sensitive issues',
  'Live status tracking on the Idea Tracker',
  'Follow-up visits from BFCN community reps',
  'Recognition for ideas that drive measurable change',
  'Direct line to project and programme leads',
];

const CommunityIdeas = () => {
  const [showTracker, setShowTracker] = useState(false);
  const [showIdeaDrawer, setShowIdeaDrawer] = useState(false);

  const openDrawer = () => setShowIdeaDrawer(true);
  const closeDrawer = () => setShowIdeaDrawer(false);

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[760px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">
              Your Voice Matters
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Community Ideas
            </h1>

            <p className="text-base text-white/85 max-w-[600px] mx-auto mb-8">
              See a problem? Have a solution? BFCN listens, reviews every submission,
              and turns community ideas into real, measurable action.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={openDrawer}
                icon={Sparkles}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              >
                Share Your Idea
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowTracker(true)}
                icon={Eye}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Browse Idea Tracker
              </Button>
            </div>
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

      <section className="py-14 md:py-18">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {impactStats.map((stat, index) => (
              <ScrollReveal key={stat.label} animation="reveal-up" delay={index * 60}>
                <div className={`rounded-2xl border p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow ${stat.tone}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] opacity-80 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs opacity-80">{stat.hint}</p>
                    </div>
                    <stat.icon size={22} className="opacity-80 shrink-0" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-all cursor-pointer bg-transparent ${!showTracker
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-primary-600'
                }`}
              onClick={() => setShowTracker(false)}
            >
              Submit an Idea
            </button>

            <button
              className={`px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-all cursor-pointer bg-transparent ${showTracker
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-primary-600'
                }`}
              onClick={() => setShowTracker(true)}
            >
              Idea Tracker
            </button>
          </div>

          {showTracker ? (
            <div className="max-w-[900px]">
              <SectionHeader
                align="left"
                title="Submitted Ideas"
                subtitle="Track the progress of community ideas. Every submission is reviewed and updated here."
              />

              {sampleIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <strong className="text-sm">{idea.name}</strong>
                      <span className="text-sm text-primary-600 font-medium">
                        {idea.community}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-0">
                      {idea.problem}
                    </p>
                  </div>

                  <Badge.Status status={idea.status} />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <ScrollReveal className="max-w-5xl mx-auto mb-14">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-5">
                      How the process works
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
                      From a single idea to community-wide change.
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Every submission is read by a real person on the BFCN team. Within
                      48 hours you&apos;ll get acknowledgement, and when your idea
                      moves forward, the whole community can follow its progress on the
                      tracker.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={openDrawer}
                      icon={ArrowRight}
                    >
                      Submit Your Idea Now
                    </Button>
                  </div>
                  <div className="md:col-span-3">
                    <ol className="space-y-4">
                      {howItWorks.map((item, index) => (
                        <li
                          key={item.step}
                          className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
                        >
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 font-bold">
                            <item.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-bold tracking-widest text-primary-700">
                                STEP {item.step}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-0">
                              {item.body}
                            </p>
                          </div>
                          {index < howItWorks.length - 1 ? null : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="rounded-3xl bg-gradient-to-br from-primary-50 via-white to-yellow-50 border border-gray-200 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                        Why BFCN listens to community ideas
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Sustainable change starts with the people who live the reality
                        every day. Your perspective shapes every BFCN programme, project,
                        and intervention.
                      </p>
                      <ul className="space-y-3 mb-8">
                        {ideaBenefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <CheckCircle2
                              size={20}
                              className="text-primary-600 shrink-0 mt-0.5"
                            />
                            <span className="text-gray-700 leading-relaxed">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={openDrawer}
                          icon={Sparkles}
                        >
                          Share an Idea
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setShowTracker(true)}
                          icon={Eye}
                        >
                          See Recent Submissions
                        </Button>
                      </div>
                    </div>
                    <div className="relative hidden lg:block">
                      <div className="absolute inset-0 p-10 flex flex-col justify-center">
                        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-md">
                          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 grid place-items-center">
                              <Lightbulb size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-0.5">
                                Recent spotlight
                              </p>
                              <p className="text-xs text-gray-500 mb-0">
                                Oke-Elerin · 3 days ago
                              </p>
                            </div>
                            <Badge.Status status="In Progress" className="ml-auto" />
                          </div>
                          <p className="text-sm font-semibold mb-1">
                            Clean water for the primary school
                          </p>
                          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            &ldquo;The nearest borehole is 45 minutes away on foot.
                            Pupils sometimes miss the first hour of class fetching
                            water. A solar-powered borehole on the school premises
                            would change everything.&rdquo;
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center gap-1">
                              <Users size={14} /> 240+ beneficiaries
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Handshake size={14} /> Community + BFCN partnership
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

        <Drawer
        isOpen={showIdeaDrawer}
        onClose={closeDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              Submit a Community Idea
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              Your details are safe with us
            </p>
          </div>
        }
        position="right"
      >
        <CommunityIdeasForm
          onClose={closeDrawer}
          onViewTracker={() => setShowTracker(true)}
        />
      </Drawer>
    </div>
  );
};

export default CommunityIdeas;
