import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Eye,
  Heart,
  Lightbulb,
  MessageSquare,
  Plus,
  UserCheck,
  Users,
  FolderKanban,
} from "lucide-react";
import { useGetOverview } from "../../../api/overview";

// const stats = [
//   { label: 'Total members', value: `${total}`, change: '+12.4%', detail: 'vs. last month', icon: Users, tone: 'green' },
//   { label: 'Active volunteers', value: `${rawMembers.length}`, change: '+5.1%', detail: 'vs. last month', icon: UserCheck, tone: 'gold' },
//   { label: 'Ongoing projects', value: '15', change: '+2', detail: 'new this quarter', icon: FolderKanban, tone: 'blue' },
//   { label: 'Upcoming events', value: '08', change: 'next 30 days', detail: 'across 4 regions', icon: CalendarDays, tone: 'orange' },
// ];

const activityMeta = {
  member_registered: { label: "New member registered", color: "bg-primary-600" },
  volunteer_applied: {
    label: "Volunteer application submitted",
    color: "bg-accent-300",
  },
  project_updated: { label: "Project update posted", color: "bg-primary-300" },
  event_opened: { label: "Event registration opened", color: "bg-accent-500" },
  news_published: { label: "News published", color: "bg-primary-300" },
};

const fallbackActivity = { label: "Activity", color: "bg-gray-400" };

const toneClass = {
  green: "bg-primary-50 text-primary-700",
  gold: "bg-accent-50 text-accent-700",
  blue: "bg-primary-50 text-primary-700",
  orange: "bg-accent-50 text-accent-700",
};

const PanelHead = ({ eyebrow, title, action }) => (
  <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 md:px-6">
    <div className="min-w-0">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">{eyebrow}</p>
      <h3 className="m-0 mt-0.5 text-[15px] font-semibold text-gray-900">{title}</h3>
    </div>
    {action}
  </div>
);

const quickActions = [
  { label: "Add member", path: "/admin/members", icon: Users },
  { label: "Create event", path: "/admin/events", icon: CalendarDays },
  { label: "Publish news", path: "/admin/news", icon: MessageSquare },
  { label: "Review ideas", path: "/admin/ideas", icon: Lightbulb },
];

const DashboardOverview = () => {
  const { data: overviewResponse, isPending: overviewLoading, isError: overviewError} = useGetOverview();
  const rawMembers = overviewResponse?.data?.stats ?? [];
  const totalMembers = rawMembers?.totalMembers
  const activeMembers = rawMembers?.activeMembers
  const ongoingProjects = rawMembers?.ongoingProjects ?? [];
  const upcomingEvents = rawMembers?.upcomingEvents
  const communityEngagement = overviewResponse?.data?.engagement ?? [];
  const engagementMax = Math.max(1, ...communityEngagement.map((item) => item?.count ?? 0));
  const recentActivity = overviewResponse?.data?.recentActivity ?? [];

  const stats = [
    {
      label: "Total members",
      value: overviewLoading ? "—" : totalMembers?.toLocaleString(),  
      change: null,
      detail: "Registered members",
      icon: Users,
      tone: "green",
    },
    {
      label: "Active members",
      value: overviewLoading ? "—" : activeMembers?.toLocaleString(),
      change: null,
      detail: "Currently active",
      icon: UserCheck,
      tone: "gold",
    },
    {
      label: "Ongoing projects",
      value: overviewLoading ? "—" : ongoingProjects?.toLocaleString(),
      change: null,
      detail: "No project data yet",
      icon: FolderKanban,
      tone: "blue",
    },
    {
      label: "Upcoming events",
      value: overviewLoading ? "—" : upcomingEvents?.toLocaleString(),
      change: null,
      detail: "No event data yet",
      icon: CalendarDays,
      tone: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[24px] bg-primary-900 px-6 py-7 text-white md:px-9 md:py-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[28px] border-accent-300/15" />
        <div className="pointer-events-none absolute bottom-[-70px] right-24 h-40 w-40 rounded-full border border-white/10" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-300">
              Friday, 11 September 2026
            </p>
            <h2 className="m-0 max-w-lg font-serif text-3xl leading-[1.1] md:text-[38px]">
              Good morning, keep the work moving.
            </h2>
            <p className="mt-3 mb-0 max-w-md text-sm leading-6 text-white/65">
              A quick read on the people, programmes, and stories shaping BFCN
              today.
            </p>
          </div>
          <Link
            to="/admin/reports"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-accent-300 px-5 py-2.5 text-[13px] font-semibold text-primary-900 no-underline transition-colors hover:bg-accent-200"
          >
            View reports <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, detail, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <p className="m-0 text-[13px] font-medium text-gray-500">{label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${toneClass[tone] ?? toneClass.green}`}>
                <Icon size={18} strokeWidth={1.9} />
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <p className="m-0 font-serif text-3xl leading-none text-gray-900 tabular-nums">
                {value ?? "—"}
              </p>
              <div className="text-right">
                {change && <p className="m-0 text-xs font-semibold text-primary-700">{change}</p>}
                <p className="m-0 mt-1 text-xs text-gray-400">{detail}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-gray-200 bg-white">
          <PanelHead
            eyebrow="Momentum"
            title="Community engagement"
            action={
              <span className="shrink-0 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                Last 7 months
              </span>
            }
          />
          <div className="p-5 md:p-6">
            <div className="flex h-48 items-end gap-3 border-b border-gray-200 sm:gap-6">
              {communityEngagement.map(({ month, count }, index) => (
                <div
                  key={month ?? index}
                  className="group flex h-full flex-1 flex-col items-center justify-end"
                  title={`${month}: ${count ?? 0}`}
                >
                  <div
                    className={`w-full max-w-10 rounded-t-md transition-colors group-hover:bg-accent-300 ${index === 5 ? "bg-primary-600" : "bg-primary-100"}`}
                    style={{ height: `${Math.round(((count ?? 0) / engagementMax) * 100)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3 sm:gap-6">
              {communityEngagement.map(({ month }, index) => (
                <span key={month ?? index} className="flex-1 text-center text-[11px] text-gray-400">
                  {month}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-primary-600" /> 18% more
              engagement than the previous period
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white">
          <PanelHead
            eyebrow="Shortcuts"
            title="Quick actions"
            action={
              <span className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 text-gray-500">
                <Plus size={15} />
              </span>
            }
          />
          <div className="space-y-2 p-5 md:p-6">
            {quickActions.map(({ label, path, icon: Icon }) => (
              <Link
                key={label}
                to={path}
                className="group flex items-center justify-between rounded-xl border border-gray-200 px-3.5 py-3 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-primary-200 hover:bg-primary-50"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon size={16} />
                  </span>
                  {label}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-600"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-gray-200 bg-white">
          <PanelHead
            eyebrow="Live feed"
            title="Recent activity"
            action={
              <Link
                to="/admin/reports"
                className="text-xs font-semibold text-primary-600 no-underline hover:text-primary-700"
              >
                See all
              </Link>
            }
          />
          <div className="divide-y divide-gray-100 px-5 md:px-6">
            {recentActivity.length === 0 && (
              <p className="m-0 py-8 text-center text-sm text-gray-400">No recent activity yet.</p>
            )}
            {recentActivity.map((activity) => {
              const meta = activityMeta[activity.type] ?? fallbackActivity;
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 py-4"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.color}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="m-0 text-sm text-gray-700">{meta.label}</p>
                    <p className="m-0 mt-0.5 truncate text-xs font-semibold text-gray-900">
                      {activity.performedBy}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-gray-400">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        <section className="rounded-2xl border border-gray-200 bg-white">
          <PanelHead eyebrow="What people are reading" title="Top content" />
          <div className="space-y-5 p-5 md:p-6">
            {[
              "Community clean-up drive",
              "Youth leadership workshop",
              "Annual fundraising gala",
            ].map((title, index) => (
              <div key={title} className="flex gap-3">
                <span className="font-serif text-lg leading-5 text-accent-500 tabular-nums">
                  0{index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-sm font-medium text-gray-900">
                    {title}
                  </p>
                  <div className="mt-1.5 flex gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye size={13} /> {1250 - index * 190}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={13} /> {89 - index * 13}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardOverview;
