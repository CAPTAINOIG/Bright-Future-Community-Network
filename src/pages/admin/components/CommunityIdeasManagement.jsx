import { useState } from 'react';
import { Filter, Eye, CheckCircle, XCircle, MessageSquare, ThumbsUp, User, Calendar, Lightbulb, Clock3, BadgeCheck, Loader, Trophy } from 'lucide-react';
import { Button, Modal } from 'antd';
import { PageIntro, StatCard, SectionLabel, DetailItem, pillClass } from './AdminUI';
import { EmptyState } from '../../../components/ui';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const ideas = [
  {
    id: 1,
    title: 'Mobile Health Clinic for Rural Areas',
    description: 'Deploy mobile medical units to reach underserved communities in remote areas',
    author: 'Dr. Adebayo Olatunji',
    email: 'adebayo@example.com',
    category: 'Health',
    status: 'Under Review',
    priority: 'High',
    votes: 45,
    comments: 12,
    submittedDate: '2023-06-15T10:30:00',
    tags: ['health', 'mobile', 'rural', 'accessibility'],
    feasibilityScore: 8,
    estimatedBudget: 2500000
  },
  {
    id: 2,
    title: 'Community Solar Power Initiative',
    description: 'Install solar panels to provide renewable energy for community centers and schools',
    author: 'Engr. Folake Adeyemi',
    email: 'folake@example.com',
    category: 'Infrastructure',
    status: 'Approved',
    priority: 'High',
    votes: 78,
    comments: 25,
    submittedDate: '2023-06-10T14:20:00',
    tags: ['solar', 'energy', 'sustainability', 'education'],
    feasibilityScore: 9,
    estimatedBudget: 5000000
  },
  {
    id: 3,
    title: 'Digital Skills Training for Seniors',
    description: 'Computer literacy program specifically designed for older community members',
    author: 'Mrs. Aminat Salako',
    email: 'aminat@example.com',
    category: 'Education',
    status: 'In Progress',
    priority: 'Medium',
    votes: 32,
    comments: 8,
    submittedDate: '2023-06-05T09:15:00',
    tags: ['digital', 'seniors', 'literacy', 'inclusion'],
    feasibilityScore: 7,
    estimatedBudget: 150000
  },
  {
    id: 4,
    title: 'Community Garden Project',
    description: 'Create shared vegetable gardens to promote food security and community bonding',
    author: 'Mr. Tunde Bakare',
    email: 'tunde@example.com',
    category: 'Agriculture',
    status: 'Rejected',
    priority: 'Low',
    votes: 18,
    comments: 5,
    submittedDate: '2023-05-28T16:45:00',
    tags: ['agriculture', 'community', 'food security'],
    feasibilityScore: 5,
    estimatedBudget: 75000
  },
  {
    id: 5,
    title: 'Youth Entrepreneurship Hub',
    description: 'Co-working space and incubator for young entrepreneurs with mentorship programs',
    author: 'Kemi Ogundimu',
    email: 'kemi@example.com',
    category: 'Economic Development',
    status: 'Under Review',
    priority: 'High',
    votes: 67,
    comments: 19,
    submittedDate: '2023-06-20T11:00:00',
    tags: ['youth', 'entrepreneurship', 'business', 'mentorship'],
    feasibilityScore: 8,
    estimatedBudget: 1200000
  }
];

export default function CommunityIdeasManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || idea.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || idea.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || idea.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusBadge = (status) => {
    const tones = {
      'Under Review': 'warning',
      'Approved': 'success',
      'In Progress': 'success',
      'Completed': 'neutral',
      'Rejected': 'danger'
    };
    return pillClass(tones[status]);
  };

  const getPriorityBadge = (priority) => {
    const tones = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'neutral'
    };
    return pillClass(tones[priority]);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const viewDetails = (idea) => {
    setSelectedIdea(idea);
    setShowDetailsModal(true);
  };

  const updateStatus = (id, newStatus) => {
    console.log(`Update idea ${id} to ${newStatus}`);
    // Implementation for status update
  };

  return (
    <div className="space-y-6">
      <PageIntro
        title="Community ideas management"
        description="Review and manage community-submitted project ideas"
        actions={
          <Button size="large" icon={<Filter size={17} />}>
            Export report
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[
          { label: 'Total ideas', value: '84', icon: Lightbulb },
          { label: 'Under review', value: '12', icon: Clock3, tone: 'accent' },
          { label: 'Approved', value: '28', icon: BadgeCheck },
          { label: 'In progress', value: '15', icon: Loader },
          { label: 'Completed', value: '18', icon: Trophy, tone: 'accent' }
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} tone={stat.tone} />
        ))}
      </div>

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search ideas..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Under Review', 'Approved', 'In Progress', 'Completed', 'Rejected'] }, { key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Health', 'Education', 'Infrastructure', 'Agriculture', 'Economic Development'] }, { key: 'priority', label: 'priorities', value: priorityFilter, onChange: setPriorityFilter, options: ['All', 'High', 'Medium', 'Low'] }]} />

      {/* Ideas list */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {filteredIdeas.length === 0 && (
          <EmptyState icon={Lightbulb} title="No ideas found" description="Try adjusting your search or filters." />
        )}
        <div className="divide-y divide-gray-100">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="p-5 transition-colors hover:bg-gray-50 md:p-6">
              <div className="flex items-start gap-4 md:gap-5">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 sm:flex">
                  <User size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="m-0 mb-1 text-[15px] font-semibold text-gray-900">{idea.title}</h3>
                      <p className="m-0 mb-2 line-clamp-2 text-sm text-gray-500">{idea.description}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={13} />
                          {idea.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {formatDate(idea.submittedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <span className={getStatusBadge(idea.status)}>{idea.status}</span>
                      <span className={getPriorityBadge(idea.priority)}>{idea.priority}</span>
                    </div>
                  </div>

                  <dl className="m-0 mb-4 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 md:grid-cols-4">
                    <div>
                      <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Category</dt>
                      <dd className="m-0 text-sm font-medium text-gray-900">{idea.category}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Estimated budget</dt>
                      <dd className="m-0 text-sm font-medium tabular-nums text-gray-900">{formatCurrency(idea.estimatedBudget)}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Community support</dt>
                      <dd className="m-0 flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm tabular-nums text-gray-900">
                          <ThumbsUp size={14} className="text-primary-600" />
                          {idea.votes}
                        </span>
                        <span className="flex items-center gap-1 text-sm tabular-nums text-gray-900">
                          <MessageSquare size={14} className="text-gray-400" />
                          {idea.comments}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Feasibility score</dt>
                      <dd className="m-0 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-primary-100">
                          <div
                            className="h-1.5 rounded-full bg-primary-600"
                            style={{ width: `${idea.feasibilityScore * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium tabular-nums text-gray-900">{idea.feasibilityScore}/10</span>
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      {idea.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className={pillClass('neutral')}>
                          {tag}
                        </span>
                      ))}
                      {idea.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{idea.tags.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button icon={<Eye size={15} />} onClick={() => viewDetails(idea)}>
                        View details
                      </Button>

                      {idea.status === 'Under Review' && (
                        <>
                          <Button danger icon={<XCircle size={15} />} onClick={() => updateStatus(idea.id, 'Rejected')}>
                            Reject
                          </Button>
                          <Button type="primary" icon={<CheckCircle size={15} />} onClick={() => updateStatus(idea.id, 'Approved')}>
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Idea details modal */}
      <Modal
        open={Boolean(showDetailsModal && selectedIdea)}
        onCancel={() => setShowDetailsModal(false)}
        width={760}
        centered
        destroyOnHidden
        title={
          selectedIdea && (
            <div className="pr-8">
              <h3 className="m-0 font-serif text-2xl leading-tight text-gray-900">{selectedIdea.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={getStatusBadge(selectedIdea.status)}>{selectedIdea.status}</span>
                <span className={getPriorityBadge(selectedIdea.priority)}>{selectedIdea.priority}</span>
              </div>
            </div>
          )
        }
        footer={
          selectedIdea && (
            <div className="flex flex-wrap justify-end gap-2">
              <Button onClick={() => setShowDetailsModal(false)}>Close</Button>
              {selectedIdea.status === 'Under Review' && (
                <>
                  <Button danger onClick={() => updateStatus(selectedIdea.id, 'Rejected')}>
                    Reject
                  </Button>
                  <Button type="primary" onClick={() => updateStatus(selectedIdea.id, 'Approved')}>
                    Approve
                  </Button>
                </>
              )}
            </div>
          )
        }
      >
        {selectedIdea && (
          <div className="space-y-6 py-2">
            <section className="space-y-3">
              <SectionLabel>Description</SectionLabel>
              <p className="m-0 text-[15px] leading-relaxed text-gray-700">{selectedIdea.description}</p>
            </section>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section className="space-y-4">
                <SectionLabel>Submitter information</SectionLabel>
                <dl className="m-0 space-y-4">
                  <DetailItem label="Name" value={selectedIdea.author} />
                  <DetailItem label="Email" value={selectedIdea.email} />
                  <DetailItem label="Submitted" value={formatDate(selectedIdea.submittedDate)} />
                </dl>
              </section>
              <section className="space-y-4">
                <SectionLabel>Project details</SectionLabel>
                <dl className="m-0 space-y-4">
                  <DetailItem label="Category" value={selectedIdea.category} />
                  <DetailItem label="Budget" value={formatCurrency(selectedIdea.estimatedBudget)} />
                  <DetailItem label="Feasibility" value={`${selectedIdea.feasibilityScore}/10`} />
                </dl>
              </section>
            </div>

            <section className="space-y-3">
              <SectionLabel>Community engagement</SectionLabel>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} className="text-primary-600" />
                  <span className="text-sm text-gray-700">{selectedIdea.votes} votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{selectedIdea.comments} comments</span>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <SectionLabel>Tags</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {selectedIdea.tags.map((tag, index) => (
                  <span key={index} className={pillClass('neutral')}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <SectionLabel>Feasibility assessment</SectionLabel>
              <div className="h-2 w-full rounded-full bg-primary-100">
                <div
                  className="h-2 rounded-full bg-primary-600"
                  style={{ width: `${selectedIdea.feasibilityScore * 10}%` }}
                ></div>
              </div>
              <p className="m-0 text-sm text-gray-500">Score: {selectedIdea.feasibilityScore}/10</p>
            </section>
          </div>
        )}
      </Modal>
    </div>
  );
}
