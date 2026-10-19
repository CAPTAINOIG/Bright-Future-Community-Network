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
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag } from 'antd';
import { Toaster, toast } from 'sonner';
import { VolunteerForm } from '../../../components/forms';
import { getStatusBadge } from './utilsVolunteer';
import {
  useGetVolunteers,
  useUpdateVolunteer,
  useDeleteVolunteer,
} from '../../../api/volunteer';
import VolunteerDetails from './VolunteerDetails';

const VolunteerManagement = () => {
  const { data: response, isPending: volunteersLoading } = useGetVolunteers({ limit: 1000 });
  const rawVolunteers = Array.isArray(response?.data?.volunteers) ? response.data.volunteers : [];
  const total = response?.data?.pagination?.total;

  const { mutateAsync: updateVolunteer } = useUpdateVolunteer();
  const { mutateAsync: deleteVolunteer, isPending: isDeleting } = useDeleteVolunteer();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showVolunteerDrawer, setShowVolunteerDrawer] = useState(false);
  const [showVolunteerDetailsDrawer, setShowVolunteerDetailsDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredVolunteers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return rawVolunteers.filter((v) => {
      const skills = Array.isArray(v?.skills) ? v.skills.join(' ') : '';
      const matchesSearch =
        !term ||
        v?.fullName?.toLowerCase()?.includes(term) ||
        v?.email?.toLowerCase()?.includes(term) ||
        v?.community?.toLowerCase()?.includes(term) ||
        skills.toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'All' || v?.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rawVolunteers, searchTerm, statusFilter]);

  const totalVolunteers = total ?? rawVolunteers.length;
  const activeCount = useMemo(() => rawVolunteers.filter((v) => v?.isActive === true).length, [rawVolunteers]);
  const pendingCount = useMemo(() => rawVolunteers.filter((v) => v?.status === 'Pending').length, [rawVolunteers]);
  const communityCount = useMemo(
    () => new Set(rawVolunteers.map((v) => v?.community).filter(Boolean)).size,
    [rawVolunteers]
  );

  const openAddVolunteer = () => {
    setSelectedVolunteer(null);
    setShowVolunteerDrawer(true);
  };
  
  const closeVolunteerDrawer = () => {
    setShowVolunteerDrawer(false);
    setTimeout(() => setSelectedVolunteer(null), 300);
  };

  const handleVolunteerDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowVolunteerDetailsDrawer(true);
  };  

  const handleCloseVolunteerDetailsDrawer = () => {
    setShowVolunteerDetailsDrawer(false);
    setTimeout(() => setSelectedVolunteer(null), 300);
  };

  const handleVolunteerEdit = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowVolunteerDrawer(true);
  };


  const handleFormSubmitted = () => {
    closeVolunteerDrawer();
  };

  const handleVolunteerDelete = async () => {
    if (!selectedVolunteer?._id) return;
    try {
      const res = await deleteVolunteer(selectedVolunteer._id);
      toast.success(res?.message || 'Volunteer removed successfully!');
      setShowDeleteDialog(false);
      setSelectedVolunteer(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove volunteer.');
    }
  };

  // const changeStatus = async (volunteer, status) => {
  //   try {
  //     const res = await updateVolunteer({ id: volunteer._id, status });
  //     toast.success(res?.message || `Volunteer ${status.toLowerCase()}`);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Failed to update volunteer.');
  //   }
  // };

  const VolunteerActions = ({ volunteer }) => {
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
            <button onClick={() => { handleVolunteerDetails(volunteer); setOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg transition-colors flex items-center gap-2"
            >
              <EyeIcon className="h-4 w-4" /> View Details
            </button>
            <button onClick={() => { handleVolunteerEdit(volunteer); setOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" /> Edit volunteer
            </button>
            <button
              onClick={() => {
                setSelectedVolunteer(volunteer);
                setShowDeleteDialog(true);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 last:rounded-b-lg transition-colors flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" /> Delete volunteer
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position='top-right' />
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
          { label: 'Communities', value: communityCount, change: 'unique', color: 'bg-purple-500' },
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
            placeholder="Search volunteers by name, email, community, or skills"
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
                  {['All', 'Pending', 'Approved', 'Rejected'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatusFilter(option);
                        setStatusOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${statusFilter === option
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
          loading={volunteersLoading}
          keyField="_id"
          emptyTitle="No volunteers found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            {
              accessorKey: 'fullName',
              header: 'Volunteer',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456]">
                      {v?.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'}
                    </div>
                    <div>
                      <p className="font-medium text-[#17231d]">{v?.fullName}</p>
                      <p className="text-xs text-[#708078]">
                        Applied: {v?.createdAt ? new Date(v.createdAt).toLocaleDateString() : '—'}
                      </p>
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
              accessorKey: 'community',
              header: 'Community',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div>
                    <p className="text-sm text-[#34443a]">{v?.community || '—'}</p>
                    <p className="text-xs text-[#708078]">Availability: {v?.availability || '—'}</p>
                  </div>
                );
              },
            },
            {
              accessorKey: 'skills',
              header: 'Skills',
              cell: (info) => {
                const skills = info.row?.original?.skills;
                return (
                  <div className="flex flex-wrap gap-1 max-w-[240px]">
                    {Array.isArray(skills) && skills.length > 0
                      ? skills.slice(0, 3).map((s, i) => (
                        <Tag key={i} color="green" style={{ margin: 2 }}>{s}</Tag>
                      ))
                      : <span className="text-xs text-[#708078]">—</span>}
                  </div>
                );
              },
            },
            {
              accessorKey: 'status',
              header: 'Status',
              cell: (info) => {
                const status = info.row?.original?.status;
                return <span className={getStatusBadge(status)}>{status}</span>;
              }
            },
            {
              id: 'actions',
              header: 'Actions',
              cell: (info) => <VolunteerActions volunteer={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showVolunteerDrawer}
        onClose={closeVolunteerDrawer}
        title="Volunteer Registration"
        position="right"
        width={600}
      >
        <VolunteerForm
          volunteer={selectedVolunteer}
          onClose={closeVolunteerDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <Drawer
        isOpen={showVolunteerDetailsDrawer}
        onClose={handleCloseVolunteerDetailsDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              Volunteer Details
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              Full profile for {selectedVolunteer?.fullName || 'this volunteer'}
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <VolunteerDetails
          volunteer={selectedVolunteer}
          onEdit={() => handleVolunteerEdit(selectedVolunteer)}
          onClose={handleCloseVolunteerDetailsDrawer}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedVolunteer(null);
        }}
        onConfirm={handleVolunteerDelete}
        title="Remove Volunteer"
        message={`Are you sure you want to remove ${selectedVolunteer?.fullName}? This action cannot be undone.`}
        type="danger"
        confirmText="Remove"
        loading={isDeleting}
      />
    </div>
  );
}

export default VolunteerManagement;
