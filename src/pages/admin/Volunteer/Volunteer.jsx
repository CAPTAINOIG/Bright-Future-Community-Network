import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Select, Tooltip } from 'antd';
import { Activity, Clock3, MapPinned, UserCheck } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
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

  const VolunteerActions = ({ volunteer }) => (
    <div className="flex items-center gap-0.5">
      <Tooltip title="View details">
        <Button type="text" size="small" aria-label="View details" icon={<EyeIcon className="h-4 w-4" />} onClick={() => handleVolunteerDetails(volunteer)} />
      </Tooltip>
      <Tooltip title="Edit volunteer">
        <Button type="text" size="small" aria-label="Edit volunteer" icon={<PencilIcon className="h-4 w-4" />} onClick={() => handleVolunteerEdit(volunteer)} />
      </Tooltip>
      <Tooltip title="Delete volunteer">
        <Button
          type="text"
          size="small"
          danger
          aria-label="Delete volunteer"
          icon={<TrashIcon className="h-4 w-4" />}
          onClick={() => {
            setSelectedVolunteer(volunteer);
            setShowDeleteDialog(true);
          }}
        />
      </Tooltip>
    </div>
  );

  return (
    <div className="space-y-6">
      <Toaster position='top-right' />
      <PageIntro
        title="Volunteer management"
        description="Manage BFCN volunteers and applications"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddVolunteer}>
            Add volunteer
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
          { label: 'Total volunteers', value: totalVolunteers, change: 'Registered', icon: UserCheck },
          { label: 'Active', value: activeCount, change: 'Currently active', icon: Activity },
          { label: 'Pending review', value: pendingCount, change: 'Applications', icon: Clock3, tone: 'accent' },
          { label: 'Communities', value: communityCount, change: 'Unique', icon: MapPinned, tone: 'accent' },
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value.toLocaleString()} hint={stat.change} icon={stat.icon} tone={stat.tone} />
        ))}
      </motion.div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search volunteers by name, email, community, or skills"
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              open={statusOpen}
              onOpenChange={setStatusOpen}
              className="min-w-40"
              aria-label="Status"
              options={['All', 'Pending', 'Approved', 'Rejected'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Volunteers exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
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
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                      {v?.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'}
                    </div>
                    <div>
                      <p className="m-0 font-semibold text-gray-900">{v?.fullName}</p>
                      <p className="m-0 text-xs text-gray-500">
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
                return <div><p className="m-0 text-[13px] text-gray-700">{v?.email}</p><p className="m-0 text-xs text-gray-500">{v?.phone}</p></div>;
              }
            },
            {
              accessorKey: 'community',
              header: 'Community',
              cell: (info) => {
                const v = info.row?.original;
                return (
                  <div>
                    <p className="m-0 text-[13px] text-gray-700">{v?.community || '—'}</p>
                    <p className="m-0 text-xs text-gray-500">Availability: {v?.availability || '—'}</p>
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
                        <span key={i} className={pillClass('success')}>{s}</span>
                      ))
                      : <span className="text-xs text-gray-400">—</span>}
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
        title={<h2 className="m-0 font-serif text-xl text-gray-900">Volunteer registration</h2>}
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
            <h2 className="m-0 font-serif text-xl text-gray-900">
              Volunteer details
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
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
        title="Remove volunteer"
        message={`Are you sure you want to remove ${selectedVolunteer?.fullName}? This action cannot be undone.`}
        type="danger"
        confirmText="Remove"
        loading={isDeleting}
      />
    </div>
  );
}

export default VolunteerManagement;
