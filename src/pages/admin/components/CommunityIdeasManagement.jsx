import { useState } from 'react';
import { Filter, Eye, CheckCircle, XCircle, MessageSquare, ThumbsUp, User, Calendar } from 'lucide-react';
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
    const colors = {
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Ideas Management</h2>
          <p className="text-gray-600">Review and manage community-submitted project ideas</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Ideas', value: '84', color: 'bg-blue-500' },
          { label: 'Under Review', value: '12', color: 'bg-yellow-500' },
          { label: 'Approved', value: '28', color: 'bg-green-500' },
          { label: 'In Progress', value: '15', color: 'bg-purple-500' },
          { label: 'Completed', value: '18', color: 'bg-emerald-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
            </div>
          </div>
        ))}
      </div>

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search ideas..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Under Review', 'Approved', 'In Progress', 'Completed', 'Rejected'] }, { key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Health', 'Education', 'Infrastructure', 'Agriculture', 'Economic Development'] }, { key: 'priority', label: 'priorities', value: priorityFilter, onChange: setPriorityFilter, options: ['All', 'High', 'Medium', 'Low'] }]} />

      {/* Ideas List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                  <User size={24} className="text-primary-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{idea.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{idea.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {idea.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(idea.submittedDate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span className={getStatusBadge(idea.status)}>{idea.status}</span>
                      <span className={getPriorityBadge(idea.priority)}>{idea.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-gray-900">{idea.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Budget</p>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(idea.estimatedBudget)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Community Support</p>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm">
                          <ThumbsUp size={14} className="text-green-600" />
                          {idea.votes}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageSquare size={14} className="text-blue-600" />
                          {idea.comments}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Feasibility Score</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${idea.feasibilityScore * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{idea.feasibilityScore}/10</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {idea.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {idea.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{idea.tags.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => viewDetails(idea)}
                        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                      
                      {idea.status === 'Under Review' && (
                        <>
                          <button 
                            onClick={() => updateStatus(idea.id, 'Approved')}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </button>
                          <button 
                            onClick={() => updateStatus(idea.id, 'Rejected')}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
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

      {/* Idea Details Modal */}
      {showDetailsModal && selectedIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{selectedIdea.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={getStatusBadge(selectedIdea.status)}>{selectedIdea.status}</span>
                  <span className={getPriorityBadge(selectedIdea.priority)}>{selectedIdea.priority}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedIdea.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Submitter Information</h4>
                  <p className="text-sm text-gray-600">Name: {selectedIdea.author}</p>
                  <p className="text-sm text-gray-600">Email: {selectedIdea.email}</p>
                  <p className="text-sm text-gray-600">Submitted: {formatDate(selectedIdea.submittedDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Project Details</h4>
                  <p className="text-sm text-gray-600">Category: {selectedIdea.category}</p>
                  <p className="text-sm text-gray-600">Budget: {formatCurrency(selectedIdea.estimatedBudget)}</p>
                  <p className="text-sm text-gray-600">Feasibility: {selectedIdea.feasibilityScore}/10</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Community Engagement</h4>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} className="text-green-600" />
                    <span className="text-sm text-gray-600">{selectedIdea.votes} votes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-600">{selectedIdea.comments} comments</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIdea.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Feasibility Assessment</h4>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-primary-500 h-3 rounded-full"
                    style={{ width: `${selectedIdea.feasibilityScore * 10}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Score: {selectedIdea.feasibilityScore}/10</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedIdea.status === 'Under Review' && (
                <>
                  <button 
                    onClick={() => updateStatus(selectedIdea.id, 'Rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedIdea.id, 'Approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
