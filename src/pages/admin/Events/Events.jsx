import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Progress, Select, Tooltip } from 'antd';
import { CalendarClock as CalendarClockIcon, CalendarDays as CalendarDaysIcon, Radio as RadioIcon, Ticket as TicketIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
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
    Upcoming: { className: 'bg-accent-50 text-accent-700 ring-accent-200' },
    Ongoing: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    Completed: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Cancelled: { className: 'bg-red-50 text-red-700 ring-red-200' },
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset whitespace-nowrap ${map[status]?.className ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export default function EventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showEventDrawer, setShowEventDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    { label: 'View details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${event.title}`) },
    { label: 'Edit event', icon: PencilIcon, onClick: () => handleEdit(event) },
    {
      label: 'Delete event',
      icon: TrashIcon,
      onClick: () => {
        setSelectedEvent(event);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ event }) => (
    <div className="flex items-center gap-0.5">
      {eventActions(event).map((action, idx) => (
        <Tooltip key={idx} title={action.label}>
          <Button
            type="text"
            size="small"
            danger={action.label.startsWith('Delete')}
            aria-label={action.label}
            icon={<action.icon className="h-4 w-4" />}
            onClick={action.onClick}
          />
        </Tooltip>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageIntro
        title="Event management"
        description="Manage BFCN events and registrations"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddEvent}>
            New event
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          { label: 'Total events', value: totalEvents, change: 'Scheduled', icon: CalendarDaysIcon },
          { label: 'Ongoing', value: ongoingCount, change: 'Live now', icon: RadioIcon },
          { label: 'Upcoming', value: upcomingCount, change: 'Next up', icon: CalendarClockIcon, tone: 'accent' },
          { label: 'Registrations', value: totalRegistrations.toLocaleString(), change: 'Total signups', icon: TicketIcon, tone: 'accent' },
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value.toLocaleString()} hint={stat.change} icon={stat.icon} tone={stat.tone} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search events by title, venue, or city..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="min-w-44"
              aria-label="Categories"
              options={['All', 'Community', 'Training', 'Workshop', 'Meeting', 'Celebration', 'Fundraiser', 'Outreach'].map((option) => ({ value: option, label: option === 'All' ? 'All categories' : option }))}
            />
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="min-w-44"
              aria-label="Statuses"
              options={['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Events exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
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
                    <p className="m-0 font-semibold text-gray-900">{e?.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={pillClass('neutral')}>{e?.category}</span>
                      <p className="m-0 text-xs text-gray-500">
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
                return <div><p className="m-0 text-[13px] text-gray-700">{e?.venue}</p><p className="m-0 text-xs text-gray-500">{e?.city}</p></div>;
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
                    <div className="mb-1 flex min-w-[140px] items-center justify-between gap-3 text-xs">
                      <span className="tabular-nums text-gray-500">{e?.registrations} / {e?.capacity}</span>
                      <span className={`font-semibold tabular-nums ${color === 'red' ? 'text-red-600' : color === 'orange' ? 'text-accent-600' : 'text-primary-700'}`}>{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-100">
                      <div
                        className={`h-full rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-accent-300' : 'bg-primary-600'}`}
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
                return e?.cost === 0 ? <span className={pillClass('success')}>Free</span> : `₦${e?.cost.toLocaleString()}`;
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
            <h2 className="m-0 font-serif text-xl text-gray-900">
              {selectedEvent ? 'Edit event' : 'Create new event'}
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
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
        title="Delete event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"? All registrations and attendee records will be removed. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
