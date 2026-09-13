import { useState } from 'react';
import { Plus, Calendar, Users, Target, Edit, Eye, MoreVertical } from 'lucide-react';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const projects = [
  { 
    id: 1, 
    title: 'Clean Water Initiative', 
    description: 'Providing clean water access to rural communities',
    status: 'Active', 
    progress: 75, 
    startDate: '2023-01-15', 
    endDate: '2023-12-31',
    budget: 500000,
    spent: 375000,
    team: 12,
    beneficiaries: 2500,
    category: 'Infrastructure'
  },
  { 
    id: 2, 
    title: 'Youth Empowerment Program', 
    description: 'Skills training and mentorship for young adults',
    status: 'Active', 
    progress: 60, 
    startDate: '2023-03-01', 
    endDate: '2024-02-29',
    budget: 200000,
    spent: 120000,
    team: 8,
    beneficiaries: 150,
    category: 'Education'
  },
  { 
    id: 3, 
    title: 'Community Health Fair', 
    description: 'Annual health screening and awareness campaign',
    status: 'Completed', 
    progress: 100, 
    startDate: '2023-02-01', 
    endDate: '2023-02-28',
    budget: 75000,
    spent: 72000,
    team: 15,
    beneficiaries: 800,
    category: 'Health'
  },
  { 
    id: 4, 
    title: 'Digital Literacy Training', 
    description: 'Computer and internet skills for adults',
    status: 'Planning', 
    progress: 15, 
    startDate: '2023-06-01', 
    endDate: '2023-11-30',
    budget: 150000,
    spent: 22500,
    team: 6,
    beneficiaries: 300,
    category: 'Education'
  },
  { 
    id: 5, 
    title: 'Environmental Conservation', 
    description: 'Tree planting and waste management initiative',
    status: 'Active', 
    progress: 40, 
    startDate: '2023-04-01', 
    endDate: '2024-03-31',
    budget: 100000,
    spent: 40000,
    team: 20,
    beneficiaries: 5000,
    category: 'Environment'
  }
];

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-yellow-100 text-yellow-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const viewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-600">Track and manage BFCN projects</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '15', color: 'bg-blue-500' },
          { label: 'Active', value: '8', color: 'bg-green-500' },
          { label: 'Completed', value: '5', color: 'bg-purple-500' },
          { label: 'Total Budget', value: '₦2.5M', color: 'bg-orange-500' }
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

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search projects..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Active', 'Completed', 'Planning', 'On Hold'] }]} />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <span className={getStatusBadge(project.status)}>{project.status}</span>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={14} />
                  <span>{project.team} team</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Target size={14} />
                  <span>{project.beneficiaries} people</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} />
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-600">
                  Budget: {formatCurrency(project.budget)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => viewDetails(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Eye size={14} />
                  View
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  <Edit size={14} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {showDetailsModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProject.title}</h3>
                <span className={getStatusBadge(selectedProject.status)}>{selectedProject.status}</span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Timeline</h4>
                  <p className="text-sm text-gray-600">Start: {new Date(selectedProject.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">End: {new Date(selectedProject.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Budget</h4>
                  <p className="text-sm text-gray-600">Total: {formatCurrency(selectedProject.budget)}</p>
                  <p className="text-sm text-gray-600">Spent: {formatCurrency(selectedProject.spent)}</p>
                  <p className="text-sm text-gray-600">Remaining: {formatCurrency(selectedProject.budget - selectedProject.spent)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Impact</h4>
                  <p className="text-sm text-gray-600">Team: {selectedProject.team} members</p>
                  <p className="text-sm text-gray-600">Beneficiaries: {selectedProject.beneficiaries} people</p>
                  <p className="text-sm text-gray-600">Category: {selectedProject.category}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Progress</h4>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Completion</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getProgressColor(selectedProject.progress)}`}
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Edit Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Project</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" rows="3"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Beneficiaries</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
