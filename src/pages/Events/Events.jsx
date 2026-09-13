import { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button, ScrollReveal, Badge } from '../../components/ui';

const events = [
  { id: 1, title: 'BFCN Community Summit 2026', date: '2026-10-15', time: '10:00 AM', venue: 'Ogbomoso Civic Centre', description: 'Annual summit bringing together leaders, members, and stakeholders.', status: 'upcoming', capacity: '500 attendees' },
  { id: 2, title: 'Youth Mentorship Workshop', date: '2026-11-05', time: '9:00 AM', venue: 'BFCN Resource Centre', description: 'Interactive mentorship on career development and leadership.', status: 'upcoming', capacity: '100 attendees' },
  { id: 3, title: 'End of Year Celebration', date: '2026-12-20', time: '4:00 PM', venue: 'Ogbomoso Town Hall', description: 'Annual celebration recognizing achievements and outstanding members.', status: 'upcoming', capacity: '300 attendees' },
  { id: 4, title: 'Skills Acquisition Workshop', date: '2026-07-15', time: '9:00 AM', venue: 'Community Hall', description: 'Three-day intensive on digital skills, tailoring, and agribusiness.', status: 'past', capacity: '120 attendees' },
  { id: 5, title: 'Community Health Fair', date: '2026-06-10', time: '8:00 AM', venue: 'Ogbomoso Central', description: 'Free health screenings, consultations, and health education.', status: 'past', capacity: '200 attendees' },
];

export default function Events() {
  const [tab, setTab] = useState('upcoming');
  const [regEvent, setRegEvent] = useState(null);
  const [regForm, setRegForm] = useState({ fullName: '', email: '', phone: '' });
  const [registered, setRegistered] = useState(false);
  const filtered = events.filter(e => e.status === tab);

  const handleRegister = (e) => { e.preventDefault(); setRegistered(true); setTimeout(() => { setRegEvent(null); setRegistered(false); setRegForm({ fullName: '', email: '', phone: '' }); }, 3000); };

  const inputClass = "w-full py-3 px-4 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400";

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10"><ScrollReveal className="text-center max-w-[700px] mx-auto"><span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Join Us</span><h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Events</h1><p className="text-base text-white/85 max-w-[560px] mx-auto">Community events, workshops, and activities that bring us together.</p></ScrollReveal></div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            {['upcoming', 'past'].map(t => <button key={t} className={`px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-all cursor-pointer bg-transparent ${tab === t ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent hover:text-primary-600'}`} onClick={() => setTab(t)}>{t === 'upcoming' ? 'Upcoming' : 'Past'} Events</button>)}
          </div>

          <div className="flex flex-col gap-4">
            {filtered.map((event) => (
              <ScrollReveal key={event.id}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
                  <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 min-w-[72px] px-3 py-3 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shrink-0 text-center">
                    <span className="text-2xl font-bold leading-none">{new Date(event.date).getDate()}</span>
                    <span className="text-xs font-semibold uppercase">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                    <span className="text-xs opacity-70">{new Date(event.date).getFullYear()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge.Status status={event.status === 'upcoming' ? 'Upcoming' : 'Past'} />
                    <h3 className="text-lg font-bold mt-2 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex gap-4 flex-wrap text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1"><Clock size={14} />{event.time}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={14} />{event.venue}</span>
                      <span className="inline-flex items-center gap-1"><Users size={14} />{event.capacity}</span>
                    </div>
                  </div>
                  {event.status === 'upcoming' && <Button variant="primary" size="sm" onClick={() => setRegEvent(event.id)}>Register</Button>}
                </div>

                {regEvent === event.id && (
                  <div className="mt-3 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    {registered ? (
                      <div className="text-center py-4 text-green-700"><h4 className="font-bold">✓ Registered!</h4><p className="text-sm">You&apos;re registered for {event.title}.</p></div>
                    ) : (
                      <form onSubmit={handleRegister}>
                        <h4 className="text-base font-bold mb-4">Register for {event.title}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div><label className="block text-sm font-medium mb-2">Full Name *</label><input required value={regForm.fullName} onChange={(e) => setRegForm({...regForm, fullName: e.target.value})} placeholder="Your name" className={inputClass} /></div>
                          <div><label className="block text-sm font-medium mb-2">Email *</label><input required type="email" value={regForm.email} onChange={(e) => setRegForm({...regForm, email: e.target.value})} placeholder="your@email.com" className={inputClass} /></div>
                        </div>
                        <div className="mb-4"><label className="block text-sm font-medium mb-2">Phone</label><input value={regForm.phone} onChange={(e) => setRegForm({...regForm, phone: e.target.value})} placeholder="+234..." className={inputClass} /></div>
                        <div className="flex gap-3"><Button type="submit" variant="primary" size="sm">Confirm</Button><Button variant="ghost" size="sm" onClick={() => setRegEvent(null)}>Cancel</Button></div>
                      </form>
                    )}
                  </div>
                )}
              </ScrollReveal>
            ))}
            {filtered.length === 0 && <div className="text-center py-16"><Calendar size={48} className="text-gray-300 mx-auto mb-4" /><h3>No {tab} events</h3><p className="text-gray-600">Check back soon.</p></div>}
          </div>
        </div>
      </section>
    </div>
  );
}
