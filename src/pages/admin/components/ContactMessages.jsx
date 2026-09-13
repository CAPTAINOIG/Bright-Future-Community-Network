import { useState } from 'react';
import { Mail, Phone, Eye, Archive, Trash2, Reply, Star, Clock } from 'lucide-react';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const messages = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+234 801 234 5678',
    subject: 'Partnership Opportunity',
    message: 'I represent a local NGO interested in collaborating on community health initiatives. We have resources and expertise that could complement BFCN\'s work in rural healthcare delivery.',
    receivedDate: '2023-06-20T14:30:00',
    status: 'Unread',
    priority: 'High',
    category: 'Partnership',
    isStarred: false
  },
  {
    id: 2,
    name: 'Michael Adebayo',
    email: 'michael.adebayo@gmail.com',
    phone: '+234 802 345 6789',
    subject: 'Volunteer Application',
    message: 'I am a recent graduate with a degree in Environmental Science and would like to volunteer for BFCN\'s environmental conservation projects. I have experience in tree planting and waste management programs.',
    receivedDate: '2023-06-19T10:15:00',
    status: 'Read',
    priority: 'Medium',
    category: 'Volunteer',
    isStarred: true
  },
  {
    id: 3,
    name: 'Dr. Fatima Bello',
    email: 'fatima.bello@hospital.ng',
    phone: '+234 803 456 7890',
    subject: 'Medical Equipment Donation',
    message: 'Our hospital is upgrading equipment and we have several medical devices that are still functional. We would like to donate these to support BFCN\'s health initiatives in underserved communities.',
    receivedDate: '2023-06-18T16:45:00',
    status: 'Replied',
    priority: 'High',
    category: 'Donation',
    isStarred: true
  },
  {
    id: 4,
    name: 'Kemi Ogundimu',
    email: 'kemi.ogundimu@yahoo.com',
    phone: '+234 804 567 8901',
    subject: 'Event Feedback',
    message: 'I attended the recent youth leadership workshop and wanted to share my positive experience. The program was well-organized and the content was very relevant. I would like to suggest some additional topics for future workshops.',
    receivedDate: '2023-06-17T09:20:00',
    status: 'Read',
    priority: 'Low',
    category: 'Feedback',
    isStarred: false
  },
  {
    id: 5,
    name: 'Tunde Bakare',
    email: 'tunde.bakare@example.com',
    phone: '+234 805 678 9012',
    subject: 'Grant Application Support',
    message: 'I am working on a community development project and need guidance on grant applications. Can BFCN provide mentorship or resources to help with the application process for funding opportunities?',
    receivedDate: '2023-06-16T13:10:00',
    status: 'Unread',
    priority: 'Medium',
    category: 'Support',
    isStarred: false
  },
  {
    id: 6,
    name: 'Mrs. Adenike Salako',
    email: 'adenike.salako@school.edu.ng',
    phone: '+234 806 789 0123',
    subject: 'School Partnership Proposal',
    message: 'I am the principal of a local primary school and would like to discuss a partnership with BFCN for educational programs. We are particularly interested in the digital literacy training for our students and teachers.',
    receivedDate: '2023-06-15T11:30:00',
    status: 'Archived',
    priority: 'Medium',
    category: 'Partnership',
    isStarred: false
  }
];

export default function ContactMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || message.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || message.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || message.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Unread': 'bg-blue-100 text-blue-800',
      'Read': 'bg-gray-100 text-gray-800',
      'Replied': 'bg-green-100 text-green-800',
      'Archived': 'bg-purple-100 text-purple-800'
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  const viewMessage = (message) => {
    setSelectedMessage(message);
    setShowDetailsModal(true);
  };

  const replyToMessage = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const updateStatus = (id, newStatus) => {
    console.log(`Update message ${id} to ${newStatus}`);
  };

  const toggleStar = (id) => {
    console.log(`Toggle star for message ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-gray-600">Manage incoming messages and inquiries</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Archive size={18} />
            Archive Selected
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: '142', color: 'bg-blue-500' },
          { label: 'Unread', value: '8', color: 'bg-red-500' },
          { label: 'High Priority', value: '5', color: 'bg-orange-500' },
          { label: 'This Week', value: '23', color: 'bg-green-500' }
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

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search messages..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Unread', 'Read', 'Replied', 'Archived'] }, { key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Partnership', 'Volunteer', 'Donation', 'Feedback', 'Support'] }, { key: 'priority', label: 'priorities', value: priorityFilter, onChange: setPriorityFilter, options: ['All', 'High', 'Medium', 'Low'] }]} />

      {/* Messages List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-gray-50 transition-colors ${message.status === 'Unread' ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => toggleStar(message.id)}
                  className={`p-1 transition-colors ${message.isStarred ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  <Star size={16} fill={message.isStarred ? 'currentColor' : 'none'} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-medium ${message.status === 'Unread' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                          {message.name}
                        </h3>
                        <span className="text-sm text-gray-500">{message.email}</span>
                      </div>
                      <p className={`text-sm mb-1 ${message.status === 'Unread' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className={getStatusBadge(message.status)}>{message.status}</span>
                        <span className={getPriorityBadge(message.priority)}>{message.priority}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatDate(message.receivedDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        {message.phone}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {message.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => viewMessage(message)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => replyToMessage(message)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Reply size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(message.id, 'Archived')}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Archive size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Details Modal */}
      {showDetailsModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                <div className="flex items-center gap-2">
                  <span className={getStatusBadge(selectedMessage.status)}>{selectedMessage.status}</span>
                  <span className={getPriorityBadge(selectedMessage.priority)}>{selectedMessage.priority}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-800 font-medium">
                    {selectedMessage.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedMessage.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <Mail size={14} />
                      {selectedMessage.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} />
                      {selectedMessage.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={14} />
                      Received {formatDate(selectedMessage.receivedDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Message</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                  {selectedMessage.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => updateStatus(selectedMessage.id, 'Archived')}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Archive
              </button>
              <button 
                onClick={() => {
                  setShowDetailsModal(false);
                  replyToMessage(selectedMessage);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Reply to {selectedMessage.name}</h3>
              <p className="text-sm text-gray-600">Re: {selectedMessage.subject}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="email" 
                  value={selectedMessage.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  defaultValue={`Re: ${selectedMessage.subject}`}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" 
                  rows="8"
                  placeholder="Type your reply here..."
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowReplyModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
