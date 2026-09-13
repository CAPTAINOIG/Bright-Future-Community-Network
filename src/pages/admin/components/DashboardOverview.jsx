import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Eye, Heart, Lightbulb, MessageSquare, Plus, UserCheck, Users, FolderKanban } from 'lucide-react';

const stats = [
  { label: 'Total members', value: '1,234', change: '+12.4%', detail: 'vs. last month', icon: Users, tone: 'green' },
  { label: 'Active volunteers', value: '89', change: '+5.1%', detail: 'vs. last month', icon: UserCheck, tone: 'gold' },
  { label: 'Ongoing projects', value: '15', change: '+2', detail: 'new this quarter', icon: FolderKanban, tone: 'blue' },
  { label: 'Upcoming events', value: '08', change: 'next 30 days', detail: 'across 4 regions', icon: CalendarDays, tone: 'orange' },
];

const activities = [
  { label: 'New member registered', name: 'John Doe', time: '2 min ago', color: 'bg-[#427456]' },
  { label: 'Volunteer application submitted', name: 'Jane Smith', time: '15 min ago', color: 'bg-[#d68e42]' },
  { label: 'Project update posted', name: 'Clean Water Initiative', time: '1 hr ago', color: 'bg-[#6487a0]' },
  { label: 'Event registration opened', name: 'Community Health Fair', time: '3 hrs ago', color: 'bg-[#a27058]' },
];

const quickActions = [
  { label: 'Add member', path: '/admin/members', icon: Users },
  { label: 'Create event', path: '/admin/events', icon: CalendarDays },
  { label: 'Publish news', path: '/admin/news', icon: MessageSquare },
  { label: 'Review ideas', path: '/admin/ideas', icon: Lightbulb },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[26px] bg-[#1a3326] px-6 py-7 text-white md:px-9 md:py-8">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[28px] border-[#e9b949]/20" />
        <div className="absolute bottom-[-70px] right-24 h-40 w-40 rounded-full border border-white/10" />
        <div className="relative max-w-xl"><p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#e9b949]">Friday, 11 September 2026</p><h2 className="max-w-lg text-3xl font-semibold tracking-[-0.045em] md:text-[38px] md:leading-[1.05]">Good morning, keep the work moving.</h2><p className="mt-4 max-w-md text-sm leading-6 text-white/62">A quick read on the people, programmes, and stories shaping BFCN today.</p></div>
        <Link to="/admin/reports" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#e9b949] px-4 py-2.5 text-xs font-semibold text-[#14251d] no-underline hover:bg-[#f2c966]">View reports <ArrowUpRight size={15} /></Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, detail, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-[#dfe3d9] bg-white/70 p-5 shadow-[0_8px_30px_rgba(38,54,43,0.03)]">
            <div className="mb-7 flex items-start justify-between"><p className="text-xs font-medium text-[#708078]">{label}</p><span className={`grid h-9 w-9 place-items-center rounded-xl ${tone === 'green' ? 'bg-[#d9ece0] text-[#427456]' : tone === 'gold' ? 'bg-[#f7e8bd] text-[#a27018]' : tone === 'blue' ? 'bg-[#dfeaf0] text-[#6487a0]' : 'bg-[#f4e3d8] text-[#a27058]'}`}><Icon size={17} /></span></div>
            <div className="flex items-end justify-between"><p className="text-3xl font-semibold tracking-[-0.05em] text-[#17231d]">{value}</p><div className="text-right"><p className="text-xs font-semibold text-[#427456]">{change}</p><p className="mt-1 text-[10px] text-[#91a097]">{detail}</p></div></div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-[#dfe3d9] bg-white/70 p-6 md:p-7"><div className="mb-8 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#829087]">Momentum</p><h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Community engagement</h3></div><span className="rounded-full bg-[#edf3eb] px-3 py-1.5 text-[11px] font-medium text-[#427456]">Last 7 months</span></div><div className="flex h-48 items-end gap-3 border-b border-[#e7ebe3] pb-0 sm:gap-6">{[42, 56, 49, 73, 65, 88, 76].map((height, index) => <div key={index} className="group flex h-full flex-1 flex-col items-center justify-end gap-2"><div className={`w-full max-w-10 rounded-t-lg transition-all group-hover:bg-[#e9b949] ${index === 5 ? 'bg-[#427456]' : 'bg-[#d9e6da]'}`} style={{ height: `${height}%` }} /><span className="mb-[-25px] text-[10px] text-[#91a097]">{['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}</span></div>)}</div><div className="mt-9 flex items-center gap-2 text-xs text-[#708078]"><span className="h-2 w-2 rounded-full bg-[#427456]" /> 18% more engagement than the previous period</div></section>

        <section className="rounded-2xl border border-[#dfe3d9] bg-[#fffdf8] p-6 md:p-7"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#829087]">Shortcuts</p><h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Quick actions</h3></div><span className="grid h-8 w-8 place-items-center rounded-full border border-[#dfe3d9] text-[#708078]"><Plus size={15} /></span></div><div className="space-y-2">{quickActions.map(({ label, path, icon: Icon }) => <Link key={label} to={path} className="group flex items-center justify-between rounded-xl border border-[#e8ebe4] px-3.5 py-3 text-sm font-medium text-[#34443a] no-underline transition-colors hover:border-[#b9ceb9] hover:bg-[#f2f7f1]"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#edf3eb] text-[#427456]"><Icon size={16} /></span>{label}</span><ArrowUpRight size={15} className="text-[#9aa79e] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}</div></section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-[#dfe3d9] bg-white/70 p-6 md:p-7"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#829087]">Live feed</p><h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Recent activity</h3></div><Link to="/admin/reports" className="text-xs font-semibold text-[#427456] no-underline">See all</Link></div><div className="divide-y divide-[#edf0eb]">{activities.map((activity) => <div key={activity.name} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${activity.color}`} /><div className="min-w-0 flex-1"><p className="text-sm text-[#34443a]">{activity.label}</p><p className="mt-1 truncate text-xs font-semibold text-[#17231d]">{activity.name}</p></div><span className="shrink-0 text-[11px] text-[#91a097]">{activity.time}</span></div>)}</div></section>
        <section className="rounded-2xl border border-[#dfe3d9] bg-white/70 p-6 md:p-7"><div className="mb-6"><p className="text-[10px] uppercase tracking-[0.2em] text-[#829087]">What people are reading</p><h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Top content</h3></div><div className="space-y-5">{['Community clean-up drive', 'Youth leadership workshop', 'Annual fundraising gala'].map((title, index) => <div key={title} className="flex gap-3"><span className="text-sm font-semibold text-[#b3beb5]">0{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-[#34443a]">{title}</p><div className="mt-2 flex gap-4 text-[11px] text-[#91a097]"><span className="flex items-center gap-1"><Eye size={13} /> {1250 - index * 190}</span><span className="flex items-center gap-1"><Heart size={13} /> {89 - index * 13}</span></div></div></div>)}</div></section>
      </div>
    </div>
  );
}
