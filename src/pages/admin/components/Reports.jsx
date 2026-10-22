import { useState } from 'react';
import { Download, TrendingUp, Users, DollarSign, Target, BarChart3, Activity } from 'lucide-react';
import { Button, DatePicker, Progress, Select, Tooltip } from 'antd';
import { PageIntro, Panel, StatCard, pillClass } from './AdminUI';

export default function Reports() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  const summaryStats = [
    { label: 'New members', value: '156', change: '+23%', trend: 'up', icon: Users, tone: 'primary' },
    { label: 'Active projects', value: '12', change: '+2', trend: 'up', icon: Target, tone: 'primary' },
    { label: 'Funds raised', value: '₦2.4M', change: '+18%', trend: 'up', icon: DollarSign, tone: 'accent' },
    { label: 'Events held', value: '8', change: '+3', trend: 'up', icon: Activity, tone: 'accent' }
  ];

  const membershipData = [
    { month: 'Jan', regular: 120, premium: 45, total: 165 },
    { month: 'Feb', regular: 135, premium: 52, total: 187 },
    { month: 'Mar', regular: 148, premium: 58, total: 206 },
    { month: 'Apr', regular: 162, premium: 64, total: 226 },
    { month: 'May', regular: 178, premium: 71, total: 249 },
    { month: 'Jun', regular: 195, premium: 78, total: 273 }
  ];

  const projectStatusData = [
    { status: 'Active', count: 8, percentage: 53, color: 'bg-primary-600', stroke: 'var(--color-primary-600)' },
    { status: 'Planning', count: 4, percentage: 27, color: 'bg-accent-300', stroke: 'var(--color-accent-300)' },
    { status: 'Completed', count: 3, percentage: 20, color: 'bg-gray-400', stroke: 'var(--color-gray-400)' }
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Membership Report', type: 'PDF', size: '2.3 MB', date: '2023-06-15', status: 'Ready' },
    { id: 2, name: 'Q2 Financial Summary', type: 'Excel', size: '1.8 MB', date: '2023-06-10', status: 'Ready' },
    { id: 3, name: 'Project Impact Assessment', type: 'PDF', size: '4.1 MB', date: '2023-06-05', status: 'Ready' },
    { id: 4, name: 'Volunteer Activity Report', type: 'PDF', size: '1.5 MB', date: '2023-05-30', status: 'Ready' }
  ];

  const topPerformingContent = [
    { title: 'Youth Leadership Workshop', views: 2450, engagement: '85%', category: 'Education' },
    { title: 'Community Health Fair', views: 1980, engagement: '78%', category: 'Health' },
    { title: 'Environmental Clean-up Drive', views: 1650, engagement: '82%', category: 'Environment' },
    { title: 'Annual Fundraising Gala', views: 1420, engagement: '91%', category: 'Events' }
  ];

  const generateReport = (type) => {
    console.log(`Generating ${type} report for ${dateRange}`);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        title="Reports & analytics"
        description="Track performance and generate insights"
        actions={
          <>
            <Select
              size="large"
              value={dateRange}
              onChange={setDateRange}
              className="min-w-40"
              aria-label="Date range"
              options={[{ value: 'last-7-days', label: 'Last 7 days' }, { value: 'last-30-days', label: 'Last 30 days' }, { value: 'last-90-days', label: 'Last 90 days' }, { value: 'last-year', label: 'Last year' }, { value: 'custom', label: 'Custom range' }]}
            />
            {dateRange === 'custom' && <DatePicker.RangePicker size="large" />}
            <Button type="primary" size="large" icon={<Download size={17} />}>Export all</Button>
          </>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            tone={stat.tone}
            hint={
              <span className="inline-flex items-center gap-1 font-semibold text-primary-700">
                <TrendingUp size={12} /> {stat.change}
              </span>
            }
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Membership growth */}
        <Panel
          title="Membership growth"
          description="Total members per month"
          actions={<Button type="link" size="small" className="!px-0">View details</Button>}
        >
          <div className="flex h-56 items-end justify-between gap-3 border-b border-gray-200 sm:justify-center sm:gap-6">
            {membershipData.map((data, index) => (
              <div key={index} className="group flex h-full flex-1 flex-col items-center justify-end sm:max-w-12">
                <span className="mb-1.5 text-xs font-medium tabular-nums text-gray-700">{data.total}</span>
                <div
                  className={`w-full max-w-10 rounded-t-md transition-colors group-hover:bg-accent-300 ${index === membershipData.length - 1 ? 'bg-primary-600' : 'bg-primary-100'}`}
                  style={{ height: `${(data.total / 300) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between gap-3 sm:justify-center sm:gap-6">
            {membershipData.map((data, index) => (
              <span key={index} className="flex-1 text-center text-[11px] text-gray-400 sm:max-w-12">{data.month}</span>
            ))}
          </div>
        </Panel>

        {/* Project status */}
        <Panel
          title="Project status distribution"
          description="Share of projects by current status"
          actions={<Button type="link" size="small" className="!px-0">View all</Button>}
        >
          <div className="space-y-5">
            {projectStatusData.map((item, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-sm font-medium text-gray-900">{item.status}</span>
                  </div>
                  <span className="text-sm tabular-nums text-gray-500">
                    <span className="font-semibold text-gray-900">{item.count}</span> · {item.percentage}%
                  </span>
                </div>
                <Tooltip title={`${item.percentage}% of projects`}>
                  <Progress percent={item.percentage} showInfo={false} size="small" strokeColor={item.stroke} railColor="var(--color-gray-100)" />
                </Tooltip>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Report generation */}
      <Panel title="Generate reports" description="Create a fresh export for the selected date range">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { type: 'membership', label: 'Membership report', icon: Users, description: 'Member statistics and growth' },
            { type: 'financial', label: 'Financial report', icon: DollarSign, description: 'Revenue and expenses' },
            { type: 'projects', label: 'Project report', icon: Target, description: 'Project progress and impact' },
            { type: 'engagement', label: 'Engagement report', icon: BarChart3, description: 'Website and social metrics' }
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="flex flex-col rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/40">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon size={18} />
                  </span>
                  <h4 className="m-0 text-sm font-semibold text-gray-900">{report.label}</h4>
                </div>
                <p className="m-0 mb-4 flex-1 text-[13px] text-gray-500">{report.description}</p>
                <Button block icon={<Download size={15} />} onClick={() => generateReport(report.type)}>
                  Generate
                </Button>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Recent reports & top content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent reports */}
        <Panel title="Recent reports" bodyClassName="divide-y divide-gray-100 px-5 md:px-6">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <h4 className="m-0 truncate text-sm font-medium text-gray-900">{report.name}</h4>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                  <span>{report.type}</span>
                  <span>{report.size}</span>
                  <span className="tabular-nums">{new Date(report.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={pillClass('success')}>
                  {report.status}
                </span>
                <Tooltip title="Download">
                  <Button type="text" size="small" aria-label="Download" icon={<Download size={16} />} />
                </Tooltip>
              </div>
            </div>
          ))}
        </Panel>

        {/* Top performing content */}
        <Panel title="Top performing content" bodyClassName="divide-y divide-gray-100 px-5 md:px-6">
          {topPerformingContent.map((content, index) => (
            <div key={index} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0 flex-1">
                <h4 className="m-0 truncate text-sm font-medium text-gray-900">{content.title}</h4>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                  <span className="tabular-nums">{content.views.toLocaleString()} views</span>
                  <span>{content.engagement} engagement</span>
                  <span className={pillClass('neutral')}>
                    {content.category}
                  </span>
                </div>
              </div>
              <div className="w-16 shrink-0 text-right">
                <div className="text-sm font-semibold tabular-nums text-gray-900">{content.engagement}</div>
                <div className="mt-1.5 h-1 w-full rounded-full bg-primary-100">
                  <div
                    className="h-1 rounded-full bg-primary-600"
                    style={{ width: content.engagement }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </Panel>
      </div>

      {/* Detailed analytics */}
      <Panel
        title="Detailed analytics"
        actions={
          <Select
            value={reportType}
            onChange={setReportType}
            className="min-w-36"
            aria-label="Report type"
            options={[
              { value: 'overview', label: 'Overview' },
              { value: 'members', label: 'Members' },
              { value: 'projects', label: 'Projects' },
              { value: 'events', label: 'Events' },
              { value: 'finances', label: 'Finances' },
            ]}
          />
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { value: '85%', label: 'Member retention rate' },
            { value: '₦4.2M', label: 'Total funds raised YTD' },
            { value: '12,500', label: 'People impacted' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-gray-50 px-4 py-5 text-center">
              <div className="mb-1 font-serif text-[32px] leading-none text-primary-700 tabular-nums">{item.value}</div>
              <div className="text-[13px] text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <h4 className="m-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">Key performance indicators</h4>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
            {[
              { label: 'Project success rate', value: '92%', bar: 'bg-primary-600' },
              { label: 'Volunteer engagement', value: '78%', bar: 'bg-primary-400' },
              { label: 'Community reach', value: '87%', bar: 'bg-primary-600' },
              { label: 'Fundraising efficiency', value: '94%', bar: 'bg-accent-300' },
            ].map((kpi) => (
              <div key={kpi.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-700">{kpi.label}</span>
                  <span className="font-semibold tabular-nums text-gray-900">{kpi.value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-primary-100">
                  <div className={`h-2 rounded-full ${kpi.bar}`} style={{ width: kpi.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
