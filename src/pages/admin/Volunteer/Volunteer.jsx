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
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag } from 'antd';
import VolunteerForm from './VolunteerForm';

const volunteers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+234 801 111 2222', skills: 'Teaching, Event Planning', availability: 'Weekends', status: 'Active', appliedDate: '2023-01-10', hours: 120 },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', phone: '+234 802 222 3333', skills: 'Photography, Social Media', availability: 'Evenings', status: 'Pending', appliedDate: '2023-02-15', hours: 0 },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', phone: '+234 803 333 4444', skills: 'Healthcare, First Aid', availability: 'Flexible', status: 'Active', appliedDate: '2023-03-01', hours: 85 },
  { id: 4, name: 'Daniel Lee', email: 'daniel@example.com', phone: '+234 804 444 5555', skills: 'Construction, Manual Labor', availability: 'Weekdays', status: 'Inactive', appliedDate: '2023-04-20', hours: 45 },
  { id: 5, name: 'Emma Wilson', email: 'emma@example.com', phone: '+234 805 555 6666', skills: 'Graphic Design, Marketing', availability: 'Part-time', status: 'Pending', appliedDate: '2023-05-05', hours: 0 },
];

const getStatusBadge = (status) => {
  const colors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${colors[status] ?? colors.Inactive}`;
};

export default function VolunteerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showVolunteerDrawer, setShowVolunteerDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredVolunteers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return volunteers.filter((v) => {
      const matchesSearch =
        !term ||
        v.name.toLowerCase().includes(term) ||
        v.email.toLowerCase().includes(term) ||
        v.skills.toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalVolunteers = volunteers.length;
  const activeCount = volunteers.filter((v) => v.status === 'Active').length;
  const pendingCount = volunteers.filter((v) => v.status === 'Pending').length;
  const totalHours = volunteers.reduce((sum, v) => sum + v.hours, 0);

  const openAddVolunteer = () => {
    setSelectedVolunteer(null);
    setShowVolunteerDrawer(true);
  };

  const handleEdit = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowVolunteerDrawer(true);
  };

  const closeVolunteerDrawer = () => {
    setShowVolunteerDrawer(false);
    setTimeout(() => setSelectedVolunteer(null), 300);
  };

  const handleFormSubmitted = () => {
    closeVolunteerDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Volunteer removed successfully!');
      setShowDeleteDialog(false);
      setSelectedVolunteer(null);
    } catch {
      toast.error('Failed to remove volunteer.');
    } finally {
      setIsDeleting(false);
    }
  };

  const volunteerActions = (volunteer) => [
    { label: 'View Profile', icon: EyeIcon, onClick: () => toast.info(`Viewing ${volunteer.name}'s profile`) },
    { label: 'Edit Volunteer', icon: PencilIcon, onClick: () => handleEdit(volunteer) },
    ...(volunteer.status === 'Pending'
      ? [
          { label: 'Approve', icon: EyeIcon, onClick: () => toast.success('Volunteer approved') },
          { label: 'Reject', icon: TrashIcon, onClick: () => toast.info('Volunteer rejected') },
        ]
      : []),
    {
      label: 'Remove Volunteer',
      icon: TrashIcon,
      onClick: () => {
        setSelectedVolunteer(volunteer);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ volunteer }) => {
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
            {volunteerActions(volunteer).map((action, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
          <p className="text-gray-600">Manage BFCN volunteers and applications</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddVolunteer}>
            Add Volunteer
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
          { label: 'Total Volunteers', value: totalVolunteers, change: 'registered', color: 'bg-blue-500' },
          { label: 'Active', value: activeCount, change: 'currently active', color: 'bg-green-500' },
          { label: 'Pending Review', value: pendingCount, change: 'applications', color: 'bg-orange-500' },
          { label: 'Hours Logged', value: totalHours, change: 'total hours', color: 'bg-purple-500' },
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
            placeholder="Search volunteers by name, email, or skills"
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setStatusOpen(!statusOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {statusFilter === 'All' ? 'All statuses' : statusFilter}
              </button>
              {statusOpen && (
                <div className="absolute top-full mt-1 left-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Active', 'Pending', 'Inactive'].map((option) => (
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
              onClick={() => toast.success('Volunteers exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
        <SimpleTable
          data={filteredVolunteers}
          keyField="id"
          emptyTitle="No volunteers found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            {
              accessorKey: 'name',
              header: 'Volunteer',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456]">
                      {v?.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[#17231d]">{v?.name}</p>
                      <p className="text-xs text-[#708078]">Applied: {new Date(v?.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              },
            },
            { 
              accessorKey: 'email',
              header: 'Contact', 
              cell: (info) => {
                const v = info.row?.original;
                return <div><p className="text-sm text-[#34443a]">{v?.email}</p><p className="text-xs text-[#708078]">{v?.phone}</p></div>;
              }
            },
            {
              accessorKey: 'skills',
              header: 'Skills',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div className="flex flex-wrap gap-1 max-w-[240px]">
                    {v?.skills.split(',').slice(0, 3).map((s, i) => (
                      <Tag key={i} color="green" style={{ margin: 2 }}>{s.trim()}</Tag>
                    ))}
                  </div>
                );
              },
            },
            {
              accessorKey: 'hours',
              header: 'Hours',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{v?.hours}h</span>
                  </div>
                );
              },
            },
            { 
              accessorKey: 'status', 
              header: 'Status', 
              cell: (info) => <span className={getStatusBadge(info.row?.original?.status)}>{info.row?.original?.status}</span> 
            },
            {
              id: 'actions',
              header: 'Actions',
              cell: (info) => <ActionMenu volunteer={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showVolunteerDrawer}
        onClose={closeVolunteerDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              {selectedVolunteer ? 'Update volunteer profile details' : 'Register a new community volunteer'}
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <VolunteerForm
          volunteer={selectedVolunteer}
          onClose={closeVolunteerDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedVolunteer(null);
        }}
        onConfirm={handleDelete}
        title="Remove Volunteer"
        message={`Are you sure you want to remove ${selectedVolunteer?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Remove"
        loading={isDeleting}
      />
    </div>
  );
}
