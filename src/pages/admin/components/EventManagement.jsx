import { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Edit, Eye, Share2, Trash2 } from 'lucide-react';
import { Drawer, Modal, Button, Input, Select, Form, DatePicker, TimePicker, InputNumber } from 'antd';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const events = [
  {
    id: 1,
    title: 'Annual Community Gala',
    description: 'Celebrating community achievements and fundraising for new projects',
    date: '2023-12-15',
    time: '18:00',
    location: 'Ogbomoso Convention Center',
    capacity: 500,
    registered: 342,
    status: 'Published',
    type: 'Fundraising',
    ticketPrice: 5000,
    organizer: 'BFCN Events Team'
  },
  {
    id: 2,
    title: 'Youth Leadership Summit',
    description: 'Empowering young leaders in the community',
    date: '2023-08-20',
    time: '09:00',
    location: 'LAUTECH Auditorium',
    capacity: 200,
    registered: 180,
    status: 'Published',
    type: 'Conference',
    ticketPrice: 0,
    organizer: 'Sarah Johnson'
  },
  {
    id: 3,
    title: 'Health Screening Day',
    description: 'Free health checkups and wellness consultation',
    date: '2023-09-10',
    time: '08:00',
    location: 'BFCN Health Center',
    capacity: 150,
    registered: 89,
    status: 'Draft',
    type: 'Health',
    ticketPrice: 0,
    organizer: 'Dr. Adunni Bello'
  },
  {
    id: 4,
    title: 'Environmental Clean-up Drive',
    description: 'Community-wide environmental conservation initiative',
    date: '2023-07-22',
    time: '07:00',
    location: 'Various Locations',
    capacity: 300,
    registered: 245,
    status: 'Completed',
    type: 'Environmental',
    ticketPrice: 0,
    organizer: 'Green Team BFCN'
  }
];

export default function EventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Fundraising': 'bg-purple-100 text-purple-800',
      'Conference': 'bg-blue-100 text-blue-800',
      'Health': 'bg-green-100 text-green-800',
      'Environmental': 'bg-emerald-100 text-emerald-800',
      'Social': 'bg-pink-100 text-pink-800'
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

  const getCapacityPercentage = (registered, capacity) => {
    return Math.round((registered / capacity) * 100);
  };

  const viewDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const editEvent = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const deleteEvent = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600">Create and manage community events</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          New Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: '25', color: 'bg-blue-500' },
          { label: 'Published', value: '18', color: 'bg-green-500' },
          { label: 'This Month', value: '6', color: 'bg-purple-500' },
          { label: 'Total Attendees', value: '2,150', color: 'bg-orange-500' }
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

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search events..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Published', 'Draft', 'Completed', 'Cancelled'] }]} />

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const capacityPercentage = getCapacityPercentage(event.registered, event.capacity);
          return (
            <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={getStatusBadge(event.status)}>{event.status}</span>
                      <span className={getTypeBadge(event.type)}>{event.type}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    <span>{event.registered}/{event.capacity} registered ({capacityPercentage}%)</span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary-500"
                      style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(event.ticketPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Organizer</p>
                    <p className="text-sm font-medium text-gray-900">{event.organizer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button 
                    onClick={() => viewDetails(event)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Share2 size={14} />
                  </button>
                  <button 
                    onClick={() => editEvent(event)}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => deleteEvent(event)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Drawer */}
      <Drawer
        title="Event Details"
        placement="right"
        onClose={() => setShowDetailsModal(false)}
        open={showDetailsModal && selectedEvent}
        width={600}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
            <Button 
              type="primary"
              onClick={() => {
                setShowDetailsModal(false);
                editEvent(selectedEvent);
              }}
            >
              Edit Event
            </Button>
          </div>
        }
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={getStatusBadge(selectedEvent.status)}>{selectedEvent.status}</span>
              <span className={getTypeBadge(selectedEvent.type)}>{selectedEvent.type}</span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Event Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                  <p>Time: {selectedEvent.time}</p>
                  <p>Location: {selectedEvent.location}</p>
                  <p>Ticket Price: {formatCurrency(selectedEvent.ticketPrice)}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Registration</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Capacity: {selectedEvent.capacity}</p>
                  <p>Registered: {selectedEvent.registered}</p>
                  <p>Available: {selectedEvent.capacity - selectedEvent.registered}</p>
                  <p>Fill Rate: {getCapacityPercentage(selectedEvent.registered, selectedEvent.capacity)}%</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Organizer</h4>
              <p className="text-gray-600">{selectedEvent.organizer}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Registration Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full bg-green-500"
                  style={{ width: `${Math.min(getCapacityPercentage(selectedEvent.registered, selectedEvent.capacity), 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {selectedEvent.registered} of {selectedEvent.capacity} spots filled
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Event Drawer */}
      <Drawer
        title="Create New Event"
        placement="right"
        onClose={() => setShowAddModal(false)}
        open={showAddModal}
        width={600}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="default">
              Save as Draft
            </Button>
            <Button type="primary">
              Create Event
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Event Title" required>
            <Input 
              size="large"
              placeholder="Enter event title"
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea 
              rows={3}
              placeholder="Event description..."
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Date" required>
              <DatePicker 
                size="large"
                className="w-full"
                placeholder="Select date"
              />
            </Form.Item>
            <Form.Item label="Time" required>
              <TimePicker 
                size="large"
                className="w-full"
                placeholder="Select time"
                format="HH:mm"
              />
            </Form.Item>
          </div>

          <Form.Item label="Location" required>
            <Input 
              size="large"
              placeholder="Event location"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item label="Capacity" required>
              <InputNumber 
                size="large"
                className="w-full"
                placeholder="Max attendees"
                min={1}
              />
            </Form.Item>
            <Form.Item label="Ticket Price (₦)">
              <InputNumber 
                size="large"
                className="w-full"
                placeholder="0 for free"
                min={0}
                formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/₦\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item label="Type" required>
              <Select size="large" placeholder="Select type">
                <Select.Option value="Conference">Conference</Select.Option>
                <Select.Option value="Fundraising">Fundraising</Select.Option>
                <Select.Option value="Health">Health</Select.Option>
                <Select.Option value="Environmental">Environmental</Select.Option>
                <Select.Option value="Social">Social</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Organizer" required>
            <Input 
              size="large"
              placeholder="Event organizer name"
            />
          </Form.Item>

          <Form.Item label="Status" required>
            <Select size="large" placeholder="Select status">
              <Select.Option value="Draft">Draft</Select.Option>
              <Select.Option value="Published">Published</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Edit Event Drawer */}
      <Drawer
        title="Edit Event"
        placement="right"
        onClose={() => setShowEditModal(false)}
        open={showEditModal && selectedEvent}
        width={600}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="default">
              Save as Draft
            </Button>
            <Button type="primary">
              Update Event
            </Button>
          </div>
        }
      >
        {selectedEvent && (
          <Form layout="vertical">
            <Form.Item label="Event Title" required>
              <Input 
                size="large"
                defaultValue={selectedEvent.title}
                placeholder="Enter event title"
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea 
                rows={3}
                defaultValue={selectedEvent.description}
                placeholder="Event description..."
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Date" required>
                <DatePicker 
                  size="large"
                  className="w-full"
                  placeholder="Select date"
                />
              </Form.Item>
              <Form.Item label="Time" required>
                <TimePicker 
                  size="large"
                  className="w-full"
                  placeholder="Select time"
                  format="HH:mm"
                />
              </Form.Item>
            </div>

            <Form.Item label="Location" required>
              <Input 
                size="large"
                defaultValue={selectedEvent.location}
                placeholder="Event location"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item label="Capacity" required>
                <InputNumber 
                  size="large"
                  className="w-full"
                  defaultValue={selectedEvent.capacity}
                  placeholder="Max attendees"
                  min={1}
                />
              </Form.Item>
              <Form.Item label="Ticket Price (₦)">
                <InputNumber 
                  size="large"
                  className="w-full"
                  defaultValue={selectedEvent.ticketPrice}
                  placeholder="0 for free"
                  min={0}
                  formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/₦\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Type" required>
                <Select 
                  size="large" 
                  defaultValue={selectedEvent.type}
                  placeholder="Select type"
                >
                  <Select.Option value="Conference">Conference</Select.Option>
                  <Select.Option value="Fundraising">Fundraising</Select.Option>
                  <Select.Option value="Health">Health</Select.Option>
                  <Select.Option value="Environmental">Environmental</Select.Option>
                  <Select.Option value="Social">Social</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item label="Organizer" required>
              <Input 
                size="large"
                defaultValue={selectedEvent.organizer}
                placeholder="Event organizer name"
              />
            </Form.Item>

            <Form.Item label="Status" required>
              <Select 
                size="large" 
                defaultValue={selectedEvent.status}
                placeholder="Select status"
              >
                <Select.Option value="Draft">Draft</Select.Option>
                <Select.Option value="Published">Published</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Drawer>

      {/* Delete Event Modal */}
      <Modal
        title="Delete Event"
        open={showDeleteModal}
        onOk={() => {
          // Handle delete logic here
          setShowDeleteModal(false);
          setSelectedEvent(null);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedEvent(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this event?</p>
        {selectedEvent && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{selectedEvent.title}</p>
            <p className="text-sm text-gray-600">{selectedEvent.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">
                {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{selectedEvent.registered} registered</span>
            </div>
          </div>
        )}
        <p className="mt-3 text-sm text-gray-500">This action cannot be undone and will affect all registered participants.</p>
      </Modal>
    </div>
  );
}
