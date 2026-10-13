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
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag, Badge, Progress } from 'antd';
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
    Upcoming: { className: 'bg-blue-100 text-blue-800' },
    Ongoing: { className: 'bg-green-100 text-green-800' },
    Completed: { className: 'bg-gray-100 text-gray-800' },
    Cancelled: { className: 'bg-red-100 text-red-800' },
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${map[status]?.className ?? ''}`;
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
    { label: 'View Details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${programme.title}`) },
    { label: 'Edit Programme', icon: PencilIcon, onClick: () => handleEdit(programme) },
    {
      label: 'Delete Programme',
      icon: TrashIcon,
      onClick: () => {
        setSelectedProgramme(programme);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ programme }) => {
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
            {programmeActions(programme).map((action, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900">Programme Management</h2>
          <p className="text-gray-600">Plan and manage BFCN programmes</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddProgramme}>
            New Programme
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
          { label: 'Total Programmes', value: totalProgrammes, change: 'listed', color: 'bg-blue-500' },
          { label: 'Ongoing', value: ongoingCount, change: 'in progress', color: 'bg-green-500' },
          { label: 'Upcoming', value: upcomingCount, change: 'scheduled', color: 'bg-purple-500' },
          { label: 'Total Enrolled', value: totalEnrolled, change: 'participants', color: 'bg-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
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
            placeholder="Search programmes by title, coordinator, location..."
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setTypeOpen(!typeOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {typeFilter === 'All' ? 'All types' : typeFilter}
              </button>
              {typeOpen && (
                <div className="absolute top-full mt-1 left-0 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Training', 'Workshop', 'Seminar', 'Conference', 'Outreach', 'Mentorship'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTypeFilter(option);
                        setTypeOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        typeFilter === option
                          ? 'bg-[#427456] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {option === 'All' ? 'All types' : option}
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
              onClick={() => toast.success('Programmes exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
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
                    <p className="font-medium text-[#17231d]">{p?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Tag color="blue" style={{ margin: 0 }}>{p?.type}</Tag>
                      <p className="text-xs text-[#708078] m-0 inline-flex items-center gap-1">
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
              cell: (info) => <p className="text-sm text-[#34443a] max-w-[200px] truncate">{info.row?.original?.location}</p> 
            },
            {
              accessorKey: 'enrolled',
              header: 'Enrollment',
              cell: (info) => {
                const p = info.row?.original;
                const pct = Math.round((p?.enrolled / Math.max(p?.targetParticipants || 1, 1)) * 100);
                return (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#708078]">{p?.enrolled} / {p?.targetParticipants}</span>
                      <Badge count={`${pct}%`} color={pct >= 90 ? '#52c41a' : pct >= 60 ? '#1677ff' : '#faad14'} showZero />
                    </div>
                    <Progress percent={pct} size="small" showInfo={false} strokeColor={pct >= 90 ? '#52c41a' : pct >= 60 ? '#1677ff' : '#faad14'} />
                  </div>
                );
              },
            },
            { 
              accessorKey: 'fee', 
              header: 'Fee', 
              cell: (info) => {
                const p = info.row?.original;
                return p?.fee === 0 ? <Tag color="green">Free</Tag> : `₦${p?.fee.toLocaleString()}`;
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
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedProgramme ? 'Edit Programme' : 'Create New Programme'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
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
        title="Delete Programme"
        message={`Are you sure you want to delete "${selectedProgramme?.title}"? This will remove all related enrollment data and cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
