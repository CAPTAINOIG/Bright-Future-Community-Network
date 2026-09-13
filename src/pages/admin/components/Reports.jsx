import { useState } from 'react';
import { Calendar, Download, Filter, TrendingUp, Users, DollarSign, Target, BarChart3, PieChart, Activity } from 'lucide-react';
import { Button, DatePicker, Progress, Select, Tooltip } from 'antd';

export default function Reports() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  const summaryStats = [
    { label: 'New Members', value: '156', change: '+23%', trend: 'up', icon: Users, color: 'text-blue-600' },
    { label: 'Active Projects', value: '12', change: '+2', trend: 'up', icon: Target, color: 'text-green-600' },
    { label: 'Funds Raised', value: '₦2.4M', change: '+18%', trend: 'up', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Events Held', value: '8', change: '+3', trend: 'up', icon: Activity, color: 'text-orange-600' }
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
    { status: 'Active', count: 8, percentage: 53, color: 'bg-green-500' },
    { status: 'Planning', count: 4, percentage: 27, color: 'bg-yellow-500' },
    { status: 'Completed', count: 3, percentage: 20, color: 'bg-blue-500' }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Track performance and generate insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onChange={setDateRange} options={[{ value: 'last-7-days', label: 'Last 7 days' }, { value: 'last-30-days', label: 'Last 30 days' }, { value: 'last-90-days', label: 'Last 90 days' }, { value: 'last-year', label: 'Last year' }, { value: 'custom', label: 'Custom range' }]} />
          {dateRange === 'custom' && <DatePicker.RangePicker />}
          <Button type="primary" icon={<Download size={18} />}>Export All</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Growth */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Membership Growth</h3>
            <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
              View Details
            </button>
          </div>
          <div className="h-64">
            <div className="flex items-end justify-center gap-3 h-full">
              {membershipData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative flex flex-col items-center justify-end h-48">
                    <div
                      className="w-8 bg-primary-500 rounded-t"
                      style={{ height: `${(data.total / 300) * 100}%` }}
                    ></div>
                    <div className="absolute -top-6 text-xs font-medium text-gray-900">
                      {data.total}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Project Status Distribution</h3>
            <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {projectStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip title={`${item.percentage}% of projects`}><Progress percent={item.percentage} showInfo={false} size="small" className="w-24" /></Tooltip>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'membership', label: 'Membership Report', icon: Users, description: 'Member statistics and growth' },
            { type: 'financial', label: 'Financial Report', icon: DollarSign, description: 'Revenue and expenses' },
            { type: 'projects', label: 'Project Report', icon: Target, description: 'Project progress and impact' },
            { type: 'engagement', label: 'Engagement Report', icon: BarChart3, description: 'Website and social metrics' }
          ].map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.label}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <button 
                  onClick={() => generateReport(report.type)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  <Download size={14} />
                  Generate
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports & Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reports</h3>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{report.type}</span>
                    <span>{report.size}</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {report.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Content</h3>
          <div className="space-y-4">
            {topPerformingContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{content.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{content.views.toLocaleString()} views</span>
                    <span>{content.engagement} engagement</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {content.category}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <div className="text-sm font-medium text-gray-900">{content.engagement}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-primary-500 h-1 rounded-full"
                      style={{ width: content.engagement }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          >
            <option value="overview">Overview</option>
            <option value="members">Members</option>
            <option value="projects">Projects</option>
            <option value="events">Events</option>
            <option value="finances">Finances</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Member Retention Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₦4.2M</div>
            <div className="text-sm text-gray-600">Total Funds Raised YTD</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12,500</div>
            <div className="text-sm text-gray-600">People Impacted</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Key Performance Indicators</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Project Success Rate</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Volunteer Engagement</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Community Reach</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fundraising Efficiency</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}