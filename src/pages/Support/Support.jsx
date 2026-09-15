import {
  Heart,
  Gift,
  Handshake,
  Building,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button, SectionHeader, ScrollReveal } from "../../components/ui";

const supportWays = [
  {
    icon: Heart,
    title: "Financial Donations",
    description:
      "Your financial contributions fund our programmes and projects. Every donation makes a tangible difference.",
    details: "Contact us for current payment information.",
  },
  {
    icon: Gift,
    title: "In-Kind Support",
    description:
      "Donate learning materials, equipment, medical supplies, or other resources for our programmes.",
    details:
      "We accept books, computers, medical supplies, sports equipment, and more.",
  },
  {
    icon: Building,
    title: "Sponsorship",
    description:
      "Sponsor specific programmes, events, or projects for sustained support and visibility.",
    details:
      "Programme, event, project, and scholarship sponsorship packages available.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description:
      "Partner with BFCN to combine resources, expertise, and networks for greater impact.",
    details:
      "Programme collaboration, technical assistance, and joint initiative opportunities.",
  },
];

const Support = () => {
  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">
              Partner With Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Support Us
            </h1>
            <p className="text-base text-white/85 max-w-[560px] mx-auto">
              Your support empowers communities and transforms lives.
            </p>
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
          <ScrollReveal>
            <SectionHeader
              label="How to Help"
              title="Ways to Support BFCN"
              subtitle="Every contribution matters. Choose the way that works best for you."
            />
          </ScrollReveal>
          <ScrollReveal
            animation="stagger-children"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {supportWays.map((w) => (
              <div
                key={w.title}
                className="p-8 bg-white border border-gray-200 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-primary-50 text-primary-600 mb-5">
                  <w.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{w.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed mb-4">
                  {w.description}
                </p>
                <div className="p-4 bg-gray-50 rounded-lg border-l-[3px] border-accent-400">
                  <p className="text-sm text-gray-600 m-0 leading-relaxed">
                    {w.details}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary-600">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Support?
            </h2>
            <p className="text-white/85 max-w-[500px] mx-auto mb-8">
              Contact us to learn more about how you can support BFCN.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/contact" variant="white" size="lg" icon={Mail}>
                Contact Us
              </Button>
              <Button
                to="/transparency"
                variant="white-outline"
                size="lg"
                iconRight={ArrowRight}
              >
                View Our Impact
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Support;
