import { useState } from 'react';
import { Mail, Phone, Eye, Archive, Trash2, Reply, Star, Clock, Inbox, MailOpen, AlertTriangle, CalendarDays, Send } from 'lucide-react';
import { Button, Input, Modal, Tooltip } from 'antd';
import { PageIntro, StatCard, SectionLabel, pillClass } from './AdminUI';
import { EmptyState } from '../../../components/ui';
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
    const tones = {
      'Unread': 'warning',
      'Read': 'neutral',
      'Replied': 'success',
      'Archived': 'neutral'
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
      <PageIntro
        title="Contact messages"
        description="Manage incoming messages and inquiries"
        actions={
          <Button size="large" icon={<Archive size={17} />}>
            Archive selected
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total messages', value: '142', icon: Inbox },
          { label: 'Unread', value: '8', icon: MailOpen },
          { label: 'High priority', value: '5', icon: AlertTriangle, tone: 'accent' },
          { label: 'This week', value: '23', icon: CalendarDays, tone: 'accent' }
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} icon={stat.icon} tone={stat.tone} />
        ))}
      </div>

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search messages..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Unread', 'Read', 'Replied', 'Archived'] }, { key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Partnership', 'Volunteer', 'Donation', 'Feedback', 'Support'] }, { key: 'priority', label: 'priorities', value: priorityFilter, onChange: setPriorityFilter, options: ['All', 'High', 'Medium', 'Low'] }]} />

      {/* Messages list */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {filteredMessages.length === 0 && (
          <EmptyState icon={Inbox} title="No messages found" description="Try adjusting your search or filters." />
        )}
        <div className="divide-y divide-gray-100">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`relative p-4 transition-colors hover:bg-gray-50 md:px-5 ${message.status === 'Unread' ? 'bg-primary-50/40 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-primary-600' : ''}`}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <Tooltip title={message.isStarred ? 'Unstar' : 'Star'}>
                  <button
                    onClick={() => toggleStar(message.id)}
                    aria-label="Toggle star"
                    className={`mt-0.5 rounded-md p-1 transition-colors ${message.isStarred ? 'text-accent-400' : 'text-gray-300 hover:text-gray-500'}`}
                  >
                    <Star size={16} fill={message.isStarred ? 'currentColor' : 'none'} />
                  </button>
                </Tooltip>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <h3 className={`m-0 text-sm ${message.status === 'Unread' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {message.name}
                        </h3>
                        <span className="truncate text-xs text-gray-500">{message.email}</span>
                      </div>
                      <p className={`m-0 mb-1 text-sm ${message.status === 'Unread' ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </p>
                      <p className="m-0 line-clamp-2 text-sm text-gray-500">{message.message}</p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-2">
                        <span className={getStatusBadge(message.status)}>{message.status}</span>
                        <span className={getPriorityBadge(message.priority)}>{message.priority}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs tabular-nums text-gray-500">
                        <Clock size={12} />
                        {formatDate(message.receivedDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone size={13} />
                        {message.phone}
                      </span>
                      <span className={pillClass('neutral')}>
                        {message.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <Tooltip title="View message">
                        <Button type="text" size="small" aria-label="View message" icon={<Eye size={16} />} onClick={() => viewMessage(message)} />
                      </Tooltip>
                      <Tooltip title="Reply">
                        <Button type="text" size="small" aria-label="Reply" icon={<Reply size={16} />} onClick={() => replyToMessage(message)} />
                      </Tooltip>
                      <Tooltip title="Archive">
                        <Button type="text" size="small" aria-label="Archive" icon={<Archive size={16} />} onClick={() => updateStatus(message.id, 'Archived')} />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button type="text" size="small" danger aria-label="Delete" icon={<Trash2 size={16} />} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message details modal */}
      <Modal
        open={Boolean(showDetailsModal && selectedMessage)}
        onCancel={() => setShowDetailsModal(false)}
        width={680}
        centered
        destroyOnHidden
        title={
          selectedMessage && (
            <div className="pr-8">
              <h3 className="m-0 font-serif text-2xl leading-tight text-gray-900">{selectedMessage.subject}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={getStatusBadge(selectedMessage.status)}>{selectedMessage.status}</span>
                <span className={getPriorityBadge(selectedMessage.priority)}>{selectedMessage.priority}</span>
              </div>
            </div>
          )
        }
        footer={
          selectedMessage && (
            <div className="flex flex-wrap justify-end gap-2">
              <Button onClick={() => setShowDetailsModal(false)}>Close</Button>
              <Button icon={<Archive size={15} />} onClick={() => updateStatus(selectedMessage.id, 'Archived')}>
                Archive
              </Button>
              <Button
                type="primary"
                icon={<Reply size={15} />}
                onClick={() => {
                  setShowDetailsModal(false);
                  replyToMessage(selectedMessage);
                }}
              >
                Reply
              </Button>
            </div>
          )
        }
      >
        {selectedMessage && (
          <div className="space-y-6 py-2">
            <div className="flex items-start gap-4 border-b border-gray-100 pb-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-50 font-semibold text-primary-700">
                {selectedMessage.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="m-0 text-[15px] font-semibold text-gray-900">{selectedMessage.name}</h4>
                <div className="mt-1.5 space-y-1 text-sm text-gray-500">
                  <p className="m-0 flex items-center gap-2">
                    <Mail size={14} />
                    {selectedMessage.email}
                  </p>
                  <p className="m-0 flex items-center gap-2">
                    <Phone size={14} />
                    {selectedMessage.phone}
                  </p>
                  <p className="m-0 flex items-center gap-2">
                    <Clock size={14} />
                    Received {formatDate(selectedMessage.receivedDate)}
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-3">
              <SectionLabel>Message</SectionLabel>
              <p className="m-0 rounded-xl bg-gray-50 p-4 text-[15px] leading-relaxed text-gray-700">{selectedMessage.message}</p>
            </section>

            <section className="space-y-3">
              <SectionLabel>Category</SectionLabel>
              <span className={pillClass('success')}>
                {selectedMessage.category}
              </span>
            </section>
          </div>
        )}
      </Modal>

      {/* Reply modal */}
      <Modal
        open={Boolean(showReplyModal && selectedMessage)}
        onCancel={() => setShowReplyModal(false)}
        width={680}
        centered
        destroyOnHidden
        title={
          selectedMessage && (
            <div className="pr-8">
              <h3 className="m-0 font-serif text-2xl leading-tight text-gray-900">Reply to {selectedMessage.name}</h3>
              <p className="m-0 mt-1 text-[13px] font-normal text-gray-500">Re: {selectedMessage.subject}</p>
            </div>
          )
        }
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button onClick={() => setShowReplyModal(false)}>Cancel</Button>
            <Button type="primary" icon={<Send size={15} />}>
              Send reply
            </Button>
          </div>
        }
      >
        {selectedMessage && (
          <div className="space-y-4 py-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">To</label>
              <Input size="large" type="email" value={selectedMessage.email} readOnly className="!bg-gray-50 !text-gray-500" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Subject</label>
              <Input size="large" type="text" defaultValue={`Re: ${selectedMessage.subject}`} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
              <Input.TextArea rows={8} placeholder="Type your reply here..." />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
