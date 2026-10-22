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
  Check,
  MapPin,
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
  },
  {
    label: 'Communities Reached',
    value: '18',
    hint: 'across Oyo & beyond',
    icon: Users,
  },
  {
    label: 'Ideas Implemented',
    value: '43',
    hint: 'delivering real change',
    icon: CheckCircle2,
  },
  {
    label: 'Avg. Review Time',
    value: '48h',
    hint: 'fast turnaround',
    icon: Clock,
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

const tabClass = (active) =>
  `inline-flex items-center justify-center gap-2 flex-1 sm:flex-none h-11 px-5 sm:px-6 rounded-full border-none text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 ${
    active ? 'bg-white text-primary-800 shadow-[var(--shadow-soft)]' : 'bg-transparent text-gray-600 hover:text-primary-700'
  }`;

const CommunityIdeasManagement = () => {
  const [showTracker, setShowTracker] = useState(false);
  const [showIdeaDrawer, setShowIdeaDrawer] = useState(false);

  const openDrawer = () => setShowIdeaDrawer(true);
  const closeDrawer = () => setShowIdeaDrawer(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-32 -top-32 w-[460px] h-[460px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-6 bg-accent-300" />Your Voice Matters</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Community Ideas
            </h1>
            <p className="text-lg text-white/70 max-w-[620px] leading-relaxed mb-10">
              See a problem? Have a solution? BFCN listens, reviews every submission,
              and turns community ideas into real, measurable action.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="accent"
                size="lg"
                onClick={openDrawer}
                icon={Sparkles}
              >
                Share Your Idea
              </Button>
              <Button
                variant="white-outline"
                size="lg"
                onClick={() => setShowTracker(true)}
                icon={Eye}
              >
                Browse Idea Tracker
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main">
          <ScrollReveal animation="stagger-children" className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {impactStats.map((stat, i) => (
              <div key={stat.label} className={`py-10 md:py-14 px-4 md:px-8 ${i % 2 === 0 ? 'pl-0' : ''} lg:pl-8 lg:first:pl-0 ${i >= 2 ? 'border-t lg:border-t-0 border-gray-100' : ''}`}>
                <span className="block font-serif text-4xl md:text-5xl text-primary-800 leading-none mb-3">{stat.value}</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-800"><stat.icon size={16} className="text-accent-500 shrink-0" />{stat.label}</span>
                <span className="block mt-1 text-[13px] text-gray-500">{stat.hint}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="flex sm:inline-flex gap-1 p-1 mb-12 rounded-full bg-gray-100 border border-gray-200" role="tablist" aria-label="Community ideas views">
            <button
              type="button"
              role="tab"
              aria-selected={!showTracker}
              className={tabClass(!showTracker)}
              onClick={() => setShowTracker(false)}
            >
              <Send size={15} /> Submit an Idea
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={showTracker}
              className={tabClass(showTracker)}
              onClick={() => setShowTracker(true)}
            >
              <Eye size={15} /> Idea Tracker
            </button>
          </div>

          {showTracker ? (
            <div className="max-w-[900px]">
              <SectionHeader
                align="left"
                label="Idea tracker"
                title="Submitted Ideas"
                subtitle="Track the progress of community ideas. Every submission is reviewed and updated here."
              />

              <div className="flex flex-col bg-white rounded-[20px] border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {sampleIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 md:p-7 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="grid place-items-center w-11 h-11 rounded-full bg-primary-50 text-primary-800 font-serif text-lg shrink-0" aria-hidden="true">
                        {idea.name.replace('Mrs. ', '').charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg md:text-xl text-gray-900 mb-1.5 leading-snug">
                          {idea.problem}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium text-gray-500">
                          <span>{idea.name}</span>
                          <span className="inline-flex items-center gap-1"><MapPin size={13} />{idea.community}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pl-15 sm:pl-0 shrink-0"><Badge.Status status={idea.status} /></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <ScrollReveal className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.2fr] gap-10 lg:gap-20 items-start">
                  <div className="lg:sticky lg:top-28">
                    <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" />How the process works</span>
                    <h2 className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.08] text-gray-900 mb-5">
                      From a single idea to community-wide change.
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                      Every submission is read by a real person on the BFCN team. Within
                      48 hours you&apos;ll get acknowledgement, and when your idea
                      moves forward, the whole community can follow its progress on the
                      tracker.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={openDrawer}
                      iconRight={ArrowRight}
                      className="w-full sm:w-auto"
                    >
                      Submit Your Idea Now
                    </Button>
                  </div>
                  <ol className="flex flex-col bg-white rounded-[20px] border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                    {howItWorks.map((item) => (
                      <li
                        key={item.step}
                        className="flex items-start gap-5 p-6 md:p-8"
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700">
                          <item.icon size={22} strokeWidth={1.75} />
                        </span>
                        <div className="flex-1">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-1.5">
                            Step {item.step}
                          </span>
                          <h3 className="font-serif text-[1.35rem] text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-[15px] text-gray-600 leading-relaxed m-0">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="rounded-[28px] bg-white border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-6 sm:p-10 md:p-14">
                      <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" />Why it matters</span>
                      <h3 className="font-serif text-3xl md:text-4xl text-gray-900 leading-[1.1] mb-4">
                        Why BFCN listens to community ideas
                      </h3>
                      <p className="text-[15px] md:text-base text-gray-600 mb-8 leading-relaxed">
                        Sustainable change starts with the people who live the reality
                        every day. Your perspective shapes every BFCN programme, project,
                        and intervention.
                      </p>
                      <ul className="space-y-3.5 mb-10">
                        {ideaBenefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <span className="grid place-items-center w-6 h-6 rounded-full bg-primary-700 text-white shrink-0 mt-0.5" aria-hidden="true">
                              <Check size={14} strokeWidth={2.5} />
                            </span>
                            <span className="text-[15px] text-gray-700 leading-relaxed">
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
                          variant="secondary"
                          size="lg"
                          onClick={() => setShowTracker(true)}
                          icon={Eye}
                        >
                          See Recent Submissions
                        </Button>
                      </div>
                    </div>
                    <div className="relative hidden lg:flex flex-col justify-center p-12 bg-primary-800 overflow-hidden">
                      <div className="absolute -right-24 -top-24 w-[380px] h-[380px] rounded-full bg-primary-700/60 blur-3xl" aria-hidden="true" />
                      <div className="relative rounded-[20px] bg-white p-7 shadow-[var(--shadow-lift)]">
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                          <div className="h-11 w-11 rounded-full bg-accent-50 text-accent-600 grid place-items-center shrink-0">
                            <Lightbulb size={20} strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600 mb-0.5">
                              Recent spotlight
                            </p>
                            <p className="text-[13px] text-gray-500 mb-0">
                              Oke-Elerin · 3 days ago
                            </p>
                          </div>
                          <div className="ml-auto"><Badge.Status status="In Progress" /></div>
                        </div>
                        <p className="font-serif text-xl text-gray-900 mb-3 leading-snug">
                          Clean water for the primary school
                        </p>
                        <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                          &ldquo;The nearest borehole is 45 minutes away on foot.
                          Pupils sometimes miss the first hour of class fetching
                          water. A solar-powered borehole on the school premises
                          would change everything.&rdquo;
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] font-medium text-gray-500 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-1.5">
                            <Users size={14} /> 240+ beneficiaries
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Handshake size={14} /> Community + BFCN partnership
                          </span>
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
        title="Submit a Community Idea"
        subtitle="Your details are safe with us"
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

export default CommunityIdeasManagement;
