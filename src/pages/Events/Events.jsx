import { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button, ScrollReveal, Badge, Drawer } from "../../components/ui";
import EventsForm from "./EventsForm";

const events = [
  {
    id: 1,
    title: "BFCN Community Summit 2026",
    date: "2026-10-15",
    time: "10:00 AM",
    venue: "Ogbomoso Civic Centre",
    description: "Annual summit bringing together leaders, members, and stakeholders.",
    status: "upcoming",
    capacity: "500 attendees",
  },
  {
    id: 2,
    title: "Youth Mentorship Workshop",
    date: "2026-11-05",
    time: "9:00 AM",
    venue: "BFCN Resource Centre",
    description: "Interactive mentorship on career development and leadership.",
    status: "upcoming",
    capacity: "100 attendees",
  },
  {
    id: 3,
    title: "End of Year Celebration",
    date: "2026-12-20",
    time: "4:00 PM",
    venue: "Ogbomoso Town Hall",
    description: "Annual celebration recognizing achievements and outstanding members.",
    status: "upcoming",
    capacity: "300 attendees",
  },
  {
    id: 4,
    title: "Skills Acquisition Workshop",
    date: "2026-07-15",
    time: "9:00 AM",
    venue: "Community Hall",
    description: "Three-day intensive on digital skills, tailoring, and agribusiness.",
    status: "past",
    capacity: "120 attendees",
  },
  {
    id: 5,
    title: "Community Health Fair",
    date: "2026-06-10",
    time: "8:00 AM",
    venue: "Ogbomoso Central",
    description: "Free health screenings, consultations, and health education.",
    status: "past",
    capacity: "200 attendees",
  },
];

const Events = () => {
  const [tab, setTab] = useState("upcoming");
  const [showRegisterDrawer, setShowRegisterDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openRegister = (event) => {
    setSelectedEvent(event);
    setShowRegisterDrawer(true);
  };

  const closeRegister = () => {
    setShowRegisterDrawer(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const filtered = events.filter((e) => e.status === tab);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Join us</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Events</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">
              Community events, workshops, and activities that bring us
              together.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-main">
          <div className="flex gap-2 flex-wrap mb-10" role="tablist" aria-label="Event timeframe">
            {["upcoming", "past"].map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`h-11 px-6 rounded-full border text-sm font-semibold cursor-pointer transition-colors ${
                  tab === t
                    ? "bg-primary-800 text-white border-primary-800"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                }`}
                onClick={() => setTab(t)}
              >
                {t === "upcoming" ? "Upcoming" : "Past"} events
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="flex flex-col bg-white rounded-[20px] border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {filtered.map((event) => (
                <ScrollReveal key={event.id}>
                  <article className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr_auto] items-start md:items-center gap-5 md:gap-8 p-5 md:p-7 hover:bg-gray-50/70 transition-colors">
                    <div className="flex flex-col items-center justify-center aspect-square rounded-2xl bg-primary-50 text-primary-800 text-center">
                      <span className="font-serif text-2xl md:text-3xl leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600">
                        {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                      </span>
                      <span className="hidden md:block mt-0.5 text-[11px] font-medium text-gray-500">
                        {new Date(event.date).getFullYear()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3">
                        <Badge.Status status={event.status === "upcoming" ? "Upcoming" : "Past"} />
                      </div>
                      <h3 className="font-serif text-xl md:text-[1.4rem] text-gray-900 leading-snug mb-1.5">
                        {event.title}
                      </h3>
                      <p className="text-[15px] text-gray-600 leading-relaxed mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {event.venue}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} />
                          {event.capacity}
                        </span>
                      </div>
                    </div>
                    {event.status === "upcoming" && (
                      <div className="col-start-2 md:col-start-auto">
                        <Button
                          variant="primary"
                          onClick={() => openRegister(event)}
                          iconRight={ArrowRight}
                          aria-label={`Register for ${event.title}`}
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 rounded-[20px] border border-dashed border-gray-300 bg-white">
              <span className="grid place-items-center w-14 h-14 mx-auto mb-5 rounded-full bg-primary-50 text-primary-700">
                <Calendar size={24} strokeWidth={1.75} />
              </span>
              <h3 className="font-serif text-2xl text-gray-900 mb-2">No {tab} events</h3>
              <p className="text-[15px] text-gray-600 m-0">Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <Drawer
        isOpen={showRegisterDrawer}
        onClose={closeRegister}
        title={
          <div className="pr-6">
            <h2 className="font-serif text-xl m-0 text-gray-900">
              Register for Event
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-0 leading-relaxed">
              Reserve your seat — we&apos;ll send a confirmation to your email
            </p>
          </div>
        }
        position="right"
      >
        <EventsForm
          event={selectedEvent}
          onClose={closeRegister}
        />
      </Drawer>
    </div>
  );
};

export default Events;
