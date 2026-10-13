import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag, Badge, Progress } from 'antd';
import EventForm from './EventForm';

const events = [
  { id: 1, title: 'Annual Youth Leadership Summit', category: 'Training', date: '2026-02-15', time: '09:00', venue: 'BFCN Community Hall', city: 'Abuja', capacity: 300, registrations: 189, cost: 0, status: 'Upcoming' },
  { id: 2, title: 'Free Medical Outreach', category: 'Outreach', date: '2025-12-10', time: '08:00', venue: 'Lagos Mainland Stadium', city: 'Lagos', capacity: 500, registrations: 520, cost: 0, status: 'Ongoing' },
  { id: 3, title: 'Community Town Hall Meeting', category: 'Meeting', date: '2025-11-25', time: '17:00', venue: 'Port Harcourt Civic Center', city: 'Port Harcourt', capacity: 250, registrations: 198, cost: 0, status: 'Completed' },
  { id: 4, title: 'Womens Day Celebration', category: 'Celebration', date: '2026-03-08', time: '12:00', venue: 'Sheraton Hotel', city: 'Abuja', capacity: 400, registrations: 112, cost: 5000, status: 'Upcoming' },
  { id: 5, title: 'Fundraising Gala Dinner', category: 'Fundraiser', date: '2026-01-31', time: '18:00', venue: 'Eko Hotels & Suites', city: 'Lagos', capacity: 600, registrations: 245, cost: 50000, status: 'Upcoming' },
];

const getStatusBadge = (status) => {
  const map = {
    Upcoming: { className: 'bg-blue-100 text-blue-800' },
    Ongoing: { className: 'bg-green-100 text-green-800' },
    Completed: { className: 'bg-gray-100 text-gray-800' },
    Cancelled: { className: 'bg-red-100 text-red-800' },
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${map[status]?.className ?? ''}`;
};

export default function EventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showEventDrawer, setShowEventDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return events.filter((e) => {
      const matchesSearch =
        !term ||
        e.title.toLowerCase().includes(term) ||
        e.venue.toLowerCase().includes(term) ||
        e.city.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const totalEvents = events.length;
  const upcomingCount = events.filter((e) => e.status === 'Upcoming').length;
  const ongoingCount = events.filter((e) => e.status === 'Ongoing').length;
  const totalRegistrations = events.reduce((sum, e) => sum + e.registrations, 0);

  const openAddEvent = () => {
    setSelectedEvent(null);
    setShowEventDrawer(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEventDrawer(true);
  };

  const closeEventDrawer = () => {
    setShowEventDrawer(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const handleFormSubmitted = () => {
    closeEventDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Event deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedEvent(null);
    } catch {
      toast.error('Failed to delete event.');
    } finally {
      setIsDeleting(false);
    }
  };

  const eventActions = (event) => [
    { label: 'View Details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${event.title}`) },
    { label: 'Edit Event', icon: PencilIcon, onClick: () => handleEdit(event) },
    {
      label: 'Delete Event',
      icon: TrashIcon,
      onClick: () => {
        setSelectedEvent(event);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ event }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition-colors hover:border-[#427456] hover:bg-[#f0f7f2] hover:text-[#427456] focus:outline-none focus:ring-2 focus:ring-[#427456]/20"
        >
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
        {open && (
          <div className="absolute right-0 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
            {eventActions(event).map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
              >
                <action.icon className="h-4 w-4" /> {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600">Manage BFCN events and registrations</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddEvent}>
            New Event
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Events', value: totalEvents, change: 'scheduled', color: 'bg-blue-500' },
          { label: 'Ongoing', value: ongoingCount, change: 'live now', color: 'bg-green-500' },
          { label: 'Upcoming', value: upcomingCount, change: 'next up', color: 'bg-purple-500' },
          { label: 'Registrations', value: totalRegistrations.toLocaleString(), change: 'total signups', color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search events by title, venue, or city..."
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {categoryFilter === 'All' ? 'All categories' : categoryFilter}
              </button>
              {categoryOpen && (
                <div className="absolute top-full mt-1 left-0 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Community', 'Training', 'Workshop', 'Meeting', 'Celebration', 'Fundraiser', 'Outreach'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setCategoryFilter(option);
                        setCategoryOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        categoryFilter === option
                          ? 'bg-[#427456] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {option === 'All' ? 'All categories' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setStatusOpen(!statusOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {statusFilter === 'All' ? 'All statuses' : statusFilter}
              </button>
              {statusOpen && (
                <div className="absolute top-full mt-1 left-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatusFilter(option);
                        setStatusOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        statusFilter === option
                          ? 'bg-[#427456] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {option === 'All' ? 'All statuses' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button size="large" icon={<FunnelIcon className="h-5 w-5" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              onClick={() => toast.success('Events exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
        <SimpleTable
          data={filteredEvents}
          keyField="id"
          emptyTitle="No events found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            {
              accessorKey: 'title',
              header: 'Event',
              cell: (info) => {
                const e = info.row?.original;
                return (
                  <div>
                    <p className="font-medium text-[#17231d]">{e?.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Tag color="geekblue" style={{ margin: 0 }}>{e?.category}</Tag>
                      <p className="text-xs text-[#708078] m-0">
                        {new Date(e?.date).toLocaleDateString()} · {e?.time}
                      </p>
                    </div>
                  </div>
                );
              },
            },
            { 
              accessorKey: 'venue',
              header: 'Location', 
              cell: (info) => {
                const e = info.row?.original;
                return <div><p className="text-sm text-[#34443a]">{e?.venue}</p><p className="text-xs text-[#708078]">{e?.city}</p></div>;
              }
            },
            {
              accessorKey: 'registrations',
              header: 'Registrations',
              cell: (info) => {
                const e = info.row?.original;
                const pct = Math.round((e?.registrations / Math.max(e?.capacity || 1, 1)) * 100);
                const color = pct >= 90 ? 'red' : pct >= 60 ? 'orange' : 'green';
                return (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#708078]">{e?.registrations} / {e?.capacity}</span>
                      <Badge count={`${pct}%`} color={color} showZero />
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              },
            },
            { 
              accessorKey: 'cost', 
              header: 'Cost', 
              cell: (info) => {
                const e = info.row?.original;
                return e?.cost === 0 ? <Tag color="green">Free</Tag> : `₦${e?.cost.toLocaleString()}`;
              }
            },
            { 
              accessorKey: 'status', 
              header: 'Status', 
              cell: (info) => <span className={getStatusBadge(info.row?.original?.status)}>{info.row?.original?.status}</span> 
            },
            {
              id: 'actions',
              header: 'Actions',
              cell: (info) => <ActionMenu event={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showEventDrawer}
        onClose={closeEventDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              {selectedEvent ? 'Update event details' : 'Schedule a new BFCN community event'}
            </p>
          </div>
        }
        position="right"
        width={720}
      >
        <EventForm
          event={selectedEvent}
          onClose={closeEventDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedEvent(null);
        }}
        onConfirm={handleDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"? All registrations and attendee records will be removed. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
