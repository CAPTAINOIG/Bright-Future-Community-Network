import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Progress, Select, Tooltip } from 'antd';
import { Activity as ActivityIcon, BookOpen as BookOpenIcon, CalendarClock as CalendarClockIcon, Users as UsersIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
import ProgrammeForm from './ProgrammeForm';

const programmes = [
  { id: 1, title: 'Youth Leadership Programme', type: 'Training', startDate: '2026-01-10', endDate: '2026-02-20', targetParticipants: 50, fee: 0, location: 'BFCN Community Hall', coordinator: 'Amina Garba', status: 'Upcoming', enrolled: 18 },
  { id: 2, title: 'Digital Skills Workshop', type: 'Workshop', startDate: '2025-11-01', endDate: '2025-12-15', targetParticipants: 30, fee: 5000, location: 'Online (Zoom)', coordinator: 'David Okafor', status: 'Ongoing', enrolled: 27 },
  { id: 3, title: 'Women in Tech Summit', type: 'Conference', startDate: '2025-09-15', endDate: '2025-09-17', targetParticipants: 200, fee: 0, location: 'Abuja International Conference Center', coordinator: 'Fatima Hassan', status: 'Completed', enrolled: 189 },
  { id: 4, title: 'Adult Literacy Program', type: 'Outreach', startDate: '2026-02-01', endDate: '2026-06-30', targetParticipants: 80, fee: 0, location: 'Lagos Community Centers', coordinator: 'Samuel Chukwu', status: 'Upcoming', enrolled: 42 },
  { id: 5, title: 'Healthcare Awareness Seminar', type: 'Seminar', startDate: '2025-12-01', endDate: '2025-12-01', targetParticipants: 100, fee: 0, location: 'Port Harcourt Civic Center', coordinator: 'Grace Adeyemi', status: 'Ongoing', enrolled: 96 },
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

export default function ProgrammeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showProgrammeDrawer, setShowProgrammeDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredProgrammes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return programmes.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term) ||
        p.coordinator.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term);
      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const totalProgrammes = programmes.length;
  const upcomingCount = programmes.filter((p) => p.status === 'Upcoming').length;
  const ongoingCount = programmes.filter((p) => p.status === 'Ongoing').length;
  const totalEnrolled = programmes.reduce((sum, p) => sum + p.enrolled, 0);

  const openAddProgramme = () => {
    setSelectedProgramme(null);
    setShowProgrammeDrawer(true);
  };

  const handleEdit = (programme) => {
    setSelectedProgramme(programme);
    setShowProgrammeDrawer(true);
  };

  const closeProgrammeDrawer = () => {
    setShowProgrammeDrawer(false);
    setTimeout(() => setSelectedProgramme(null), 300);
  };

  const handleFormSubmitted = () => {
    closeProgrammeDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Programme deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedProgramme(null);
    } catch {
      toast.error('Failed to delete programme.');
    } finally {
      setIsDeleting(false);
    }
  };

  const programmeActions = (programme) => [
    { label: 'View details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${programme.title}`) },
    { label: 'Edit programme', icon: PencilIcon, onClick: () => handleEdit(programme) },
    {
      label: 'Delete programme',
      icon: TrashIcon,
      onClick: () => {
        setSelectedProgramme(programme);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ programme }) => (
    <div className="flex items-center gap-0.5">
      {programmeActions(programme).map((action, idx) => (
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
        title="Programme management"
        description="Plan and manage BFCN programmes"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddProgramme}>
            New programme
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
          { label: 'Total programmes', value: totalProgrammes, change: 'Listed', icon: BookOpenIcon },
          { label: 'Ongoing', value: ongoingCount, change: 'In progress', icon: ActivityIcon },
          { label: 'Upcoming', value: upcomingCount, change: 'Scheduled', icon: CalendarClockIcon, tone: 'accent' },
          { label: 'Total enrolled', value: totalEnrolled, change: 'Participants', icon: UsersIcon, tone: 'accent' },
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
            placeholder="Search programmes by title, coordinator, location..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={typeFilter}
              onChange={setTypeFilter}
              open={typeOpen}
              onOpenChange={setTypeOpen}
              className="min-w-44"
              aria-label="Types"
              options={['All', 'Training', 'Workshop', 'Seminar', 'Conference', 'Outreach', 'Mentorship'].map((option) => ({ value: option, label: option === 'All' ? 'All types' : option }))}
            />
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              open={statusOpen}
              onOpenChange={setStatusOpen}
              className="min-w-44"
              aria-label="Statuses"
              options={['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Programmes exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <SimpleTable
          data={filteredProgrammes}
          keyField="id"
          emptyTitle="No programmes found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            {
              accessorKey: 'title',
              header: 'Programme',
              cell: (info) => {
                const p = info.row?.original;
                return (
                  <div>
                    <p className="m-0 font-semibold text-gray-900">{p?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={pillClass('neutral')}>{p?.type}</span>
                      <p className="m-0 inline-flex items-center gap-1 text-xs text-gray-500">
                        <CalendarDaysIcon className="h-3 w-3" />
                        {new Date(p?.startDate).toLocaleDateString()} — {new Date(p?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              },
            },
            { accessorKey: 'coordinator', header: 'Coordinator', cell: (info) => info.row?.original?.coordinator },
            { 
              accessorKey: 'location', 
              header: 'Location', 
              cell: (info) => <p className="m-0 text-[13px] text-gray-700 max-w-[200px] truncate">{info.row?.original?.location}</p> 
            },
            {
              accessorKey: 'enrolled',
              header: 'Enrollment',
              cell: (info) => {
                const p = info.row?.original;
                const pct = Math.round((p?.enrolled / Math.max(p?.targetParticipants || 1, 1)) * 100);
                return (
                  <div>
                    <div className="mb-1 flex min-w-[140px] justify-between gap-3 text-xs">
                      <span className="tabular-nums text-gray-500">{p?.enrolled} / {p?.targetParticipants}</span>
                      <span className="font-semibold tabular-nums text-gray-700">{pct}%</span>
                    </div>
                    <Progress percent={pct} size="small" showInfo={false} strokeColor={pct >= 90 ? 'var(--color-primary-600)' : pct >= 60 ? 'var(--color-primary-400)' : 'var(--color-accent-300)'} railColor="var(--color-primary-100)" />
                  </div>
                );
              },
            },
            { 
              accessorKey: 'fee', 
              header: 'Fee', 
              cell: (info) => {
                const p = info.row?.original;
                return p?.fee === 0 ? <span className={pillClass('success')}>Free</span> : `₦${p?.fee.toLocaleString()}`;
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
              cell: (info) => <ActionMenu programme={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showProgrammeDrawer}
        onClose={closeProgrammeDrawer}
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              {selectedProgramme ? 'Edit programme' : 'Create new programme'}
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              {selectedProgramme ? 'Update programme details' : 'Add a new training, workshop, or outreach programme'}
            </p>
          </div>
        }
        position="right"
        width={720}
      >
        <ProgrammeForm
          programme={selectedProgramme}
          onClose={closeProgrammeDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedProgramme(null);
        }}
        onConfirm={handleDelete}
        title="Delete programme"
        message={`Are you sure you want to delete "${selectedProgramme?.title}"? This will remove all related enrollment data and cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
