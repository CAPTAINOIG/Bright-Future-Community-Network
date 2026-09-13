import { useState } from 'react';
import { Plus, Calendar, Clock, Users, MapPin, Edit, Eye } from 'lucide-react';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const programmes = [
  { 
    id: 1, 
    title: 'Leadership Development Workshop', 
    description: 'Building leadership skills for community members',
    type: 'Workshop',
    duration: '3 months',
    participants: 50,
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    location: 'BFCN Community Center',
    status: 'Active',
    coordinator: 'Sarah Johnson',
    fee: 15000
  },
  { 
    id: 2, 
    title: 'Digital Skills Training', 
    description: 'Computer literacy and digital marketing skills',
    type: 'Training',
    duration: '6 weeks',
    participants: 30,
    startDate: '2023-07-15',
    endDate: '2023-08-26',
    location: 'Tech Hub Ogbomoso',
    status: 'Active',
    coordinator: 'Michael Chen',
    fee: 25000
  },
  { 
    id: 3, 
    title: 'Youth Entrepreneurship Bootcamp', 
    description: 'Business development and startup skills',
    type: 'Bootcamp',
    duration: '2 weeks',
    participants: 25,
    startDate: '2023-05-01',
    endDate: '2023-05-14',
    location: 'Innovation Center',
    status: 'Completed',
    coordinator: 'David Ola',
    fee: 35000
  },
  { 
    id: 4, 
    title: 'Health and Wellness Program', 
    description: 'Nutrition education and fitness training',
    type: 'Program',
    duration: '4 months',
    participants: 75,
    startDate: '2023-08-01',
    endDate: '2023-11-30',
    location: 'Community Health Center',
    status: 'Planning',
    coordinator: 'Dr. Adunni Bello',
    fee: 0
  }
];

export default function ProgrammeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const filteredProgrammes = programmes.filter(programme => {
    const matchesSearch = programme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         programme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || programme.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Workshop': 'bg-purple-100 text-purple-800',
      'Training': 'bg-blue-100 text-blue-800',
      'Bootcamp': 'bg-orange-100 text-orange-800',
      'Program': 'bg-green-100 text-green-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[type]}`;
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'Free';
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const viewDetails = (programme) => {
    setSelectedProgramme(programme);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Programme Management</h2>
          <p className="text-gray-600">Manage training programs and workshops</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          New Programme
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Programmes', value: '12', color: 'bg-blue-500' },
          { label: 'Active', value: '4', color: 'bg-green-500' },
          { label: 'Participants', value: '450', color: 'bg-purple-500' },
          { label: 'This Month', value: '3', color: 'bg-orange-500' }
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

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search programmes..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Active', 'Completed', 'Planning', 'Cancelled'] }]} />

      {/* Programmes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProgrammes.map((programme) => (
          <div key={programme.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{programme.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{programme.description}</p>
                <div className="flex items-center gap-2">
                  <span className={getStatusBadge(programme.status)}>{programme.status}</span>
                  <span className={getTypeBadge(programme.type)}>{programme.type}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Duration: {programme.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} />
                <span>{programme.participants} participants</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{programme.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(programme.startDate).toLocaleDateString()} - {new Date(programme.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Coordinator</p>
                <p className="text-sm font-medium text-gray-900">{programme.coordinator}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Fee</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(programme.fee)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button 
                onClick={() => viewDetails(programme)}
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
        ))}
      </div>

      {/* Programme Details Modal */}
      {showDetailsModal && selectedProgramme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProgramme.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={getStatusBadge(selectedProgramme.status)}>{selectedProgramme.status}</span>
                  <span className={getTypeBadge(selectedProgramme.type)}>{selectedProgramme.type}</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedProgramme.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Schedule</h4>
                  <p className="text-sm text-gray-600">Start: {new Date(selectedProgramme.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">End: {new Date(selectedProgramme.endDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Duration: {selectedProgramme.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Details</h4>
                  <p className="text-sm text-gray-600">Participants: {selectedProgramme.participants}</p>
                  <p className="text-sm text-gray-600">Location: {selectedProgramme.location}</p>
                  <p className="text-sm text-gray-600">Fee: {formatCurrency(selectedProgramme.fee)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Coordinator</h4>
                <p className="text-gray-600">{selectedProgramme.coordinator}</p>
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
                Edit Programme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Programme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Programme</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Programme Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" rows="3"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option value="Workshop">Workshop</option>
                    <option value="Training">Training</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Program">Program</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input type="text" placeholder="e.g., 3 months, 6 weeks" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fee (₦)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coordinator</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
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
                Create Programme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
