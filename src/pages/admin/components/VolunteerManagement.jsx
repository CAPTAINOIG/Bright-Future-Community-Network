import { useState } from 'react';
import { Search, Plus, Filter, Download, Edit, Trash2, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button, Input, Select, Space, Tooltip } from 'antd';
import { exportCsv } from '../../../utils/exportCsv';
import DataTable from '../../../components/admin/DataTable';

const volunteers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+234 801 111 2222', skills: 'Teaching, Event Planning', availability: 'Weekends', status: 'Active', appliedDate: '2023-01-10', hours: 120 },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', phone: '+234 802 222 3333', skills: 'Photography, Social Media', availability: 'Evenings', status: 'Pending', appliedDate: '2023-02-15', hours: 0 },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', phone: '+234 803 333 4444', skills: 'Healthcare, First Aid', availability: 'Flexible', status: 'Active', appliedDate: '2023-03-01', hours: 85 },
  { id: 4, name: 'Daniel Lee', email: 'daniel@example.com', phone: '+234 804 444 5555', skills: 'Construction, Manual Labor', availability: 'Weekdays', status: 'Inactive', appliedDate: '2023-04-20', hours: 45 },
  { id: 5, name: 'Emma Wilson', email: 'emma@example.com', phone: '+234 805 555 6666', skills: 'Graphic Design, Marketing', availability: 'Part-time', status: 'Pending', appliedDate: '2023-05-05', hours: 0 }
];

export default function VolunteerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const handleApprove = (id) => {
    console.log('Approve volunteer:', id);
  };

  const handleReject = (id) => {
    console.log('Reject volunteer:', id);
  };

  const viewDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
          <p className="text-gray-600">Manage volunteer applications and assignments</p>
        </div>
        <Button type="primary" size="large" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)}>Add volunteer</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volunteers', value: '89', color: 'bg-blue-500' },
          { label: 'Active', value: '67', color: 'bg-green-500' },
          { label: 'Pending', value: '12', color: 'bg-yellow-500' },
          { label: 'Total Hours', value: '2,450', color: 'bg-purple-500' }
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

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input allowClear size="large" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search name, email, or skills" prefix={<Search size={18} className="text-gray-400" />} className="flex-1" />
          <Space wrap>
            <Select size="large" value={statusFilter} onChange={setStatusFilter} className="min-w-36" options={['All', 'Active', 'Inactive', 'Pending'].map((value) => ({ value, label: value === 'All' ? 'All statuses' : value }))} />
            <Button size="large" icon={<Filter size={18} />}>Skills filter</Button>
            <Button size="large" icon={<Download size={18} />} onClick={() => exportCsv('bfcn-volunteers.csv', filteredVolunteers)}>Export</Button>
          </Space>
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="shadow-sm">
        <DataTable
          data={filteredVolunteers}
          keyField="id"
          emptyTitle="No volunteers found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            { key: 'volunteer', title: 'Volunteer', render: (volunteer) => <div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#d9ece0] text-sm font-medium text-[#427456]">{volunteer.name.split(' ').map((name) => name[0]).join('')}</div><div><p className="text-sm font-medium text-[#17231d]">{volunteer.name}</p><p className="text-xs text-[#708078]">Available: {volunteer.availability}</p></div></div> },
            { key: 'contact', title: 'Contact', render: (volunteer) => <div><p className="text-sm text-[#34443a]">{volunteer.email}</p><p className="text-xs text-[#708078]">{volunteer.phone}</p></div> },
            { key: 'skills', title: 'Skills', render: (volunteer) => volunteer.skills },
            { key: 'hours', title: 'Hours', sortable: true, render: (volunteer) => <div className="flex items-center gap-2"><Clock size={16} className="text-[#91a097]" /><span>{volunteer.hours}h</span></div> },
            { key: 'status', title: 'Status', render: (volunteer) => <span className={getStatusBadge(volunteer.status)}>{volunteer.status}</span> },
            { key: 'actions', title: 'Actions', render: (volunteer) => <Space size={2}><Tooltip title="View details"><Button type="text" shape="circle" icon={<Eye size={16} />} onClick={() => viewDetails(volunteer)} aria-label={`View ${volunteer.name}`} /></Tooltip>{volunteer.status === 'Pending' && <><Tooltip title="Approve"><Button type="text" shape="circle" icon={<CheckCircle size={16} />} onClick={() => handleApprove(volunteer.id)} aria-label={`Approve ${volunteer.name}`} /></Tooltip><Tooltip title="Reject"><Button danger type="text" shape="circle" icon={<XCircle size={16} />} onClick={() => handleReject(volunteer.id)} aria-label={`Reject ${volunteer.name}`} /></Tooltip></>}<Tooltip title="Edit"><Button type="text" shape="circle" icon={<Edit size={16} />} aria-label={`Edit ${volunteer.name}`} /></Tooltip><Tooltip title="Delete"><Button danger type="text" shape="circle" icon={<Trash2 size={16} />} aria-label={`Delete ${volunteer.name}`} /></Tooltip></Space> },
          ]}
        />
      </div>

      {/* Volunteer Details Modal */}
      {showDetailsModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Volunteer Details</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-primary-800">
                    {selectedVolunteer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{selectedVolunteer.name}</h4>
                  <p className="text-gray-600">{selectedVolunteer.email}</p>
                  <p className="text-gray-600">{selectedVolunteer.phone}</p>
                  <span className={`inline-block mt-2 ${getStatusBadge(selectedVolunteer.status)}`}>
                    {selectedVolunteer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <p className="text-sm text-gray-900">{selectedVolunteer.skills}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <p className="text-sm text-gray-900">{selectedVolunteer.availability}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
                  <p className="text-sm text-gray-900">{new Date(selectedVolunteer.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Hours</label>
                  <p className="text-sm text-gray-900">{selectedVolunteer.hours} hours</p>
                </div>
              </div>

              {selectedVolunteer.status === 'Pending' && (
                <div className="flex gap-3 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-yellow-800 font-medium">Application Pending Review</p>
                    <p className="text-sm text-yellow-700">This volunteer application requires approval.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(selectedVolunteer.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(selectedVolunteer.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Volunteer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Volunteer</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" rows="3" placeholder="List relevant skills..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Part-time">Part-time</option>
                </select>
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
                Add Volunteer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
