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
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-32 -top-32 w-[460px] h-[460px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-6 bg-accent-300" />Partner With Us</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">
              Support Us
            </h1>
            <p className="text-lg text-white/70 max-w-[620px] leading-relaxed m-0">
              Your support empowers communities and transforms lives.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal>
            <SectionHeader
              align="left"
              label="How to Help"
              title="Ways to Support BFCN"
              subtitle="Every contribution matters. Choose the way that works best for you."
            />
          </ScrollReveal>
          <ScrollReveal
            animation="stagger-children"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {supportWays.map((w, i) => (
              <div
                key={w.title}
                className="flex flex-col p-7 md:p-9 bg-white border border-gray-200 rounded-[20px] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700">
                    <w.icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-sm text-gray-400">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-[1.5rem] text-gray-900 mb-3">{w.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-6 flex-1">
                  {w.description}
                </p>
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-sm text-gray-600 m-0 leading-relaxed pl-4 border-l-2 border-accent-400">
                    {w.details}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          <ScrollReveal className="relative overflow-hidden rounded-[28px] bg-primary-800 px-6 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-primary-700/60 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="eyebrow text-accent-300 mb-5"><span className="h-px w-6 bg-accent-300" />Get in touch<span className="h-px w-6 bg-accent-300" /></span>
              <h2 className="font-serif text-4xl md:text-[3.25rem] leading-[1.05] text-white mb-5">
                Ready to Support?
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[520px] mx-auto mb-10">
                Contact us to learn more about how you can support BFCN.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Support;
