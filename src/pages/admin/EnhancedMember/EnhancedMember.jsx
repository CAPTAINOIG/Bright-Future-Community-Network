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
import { Button, Input, Select, Tooltip } from 'antd';
import { Activity, CalendarPlus, MapPinned, Users as UsersIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
import { MoreFiltersDrawer } from '../components/MoreFiltersDrawer';
import { exportCsv } from '../../../utils/exportCsv';
import { useGetMember, useDeleteMember } from '../../../api/member';
import { JoinForm, EditMemberForm } from '../../../components/forms';
import MemberDetails from './MemberDetails';
import { getStatusBadge, softColor } from './utilsMember';
import { Toaster } from 'sonner';

const EnhancedMember = () => {
  const [filters, setFilters] = useState({
  page: 1,
  limit: 10,
  search: "",
  status: "",
});
  const { data: response = { members: [], pagination: {} }, isPending: membersLoading } = useGetMember(filters);
  const rawMembers = Array.isArray(response?.data?.members) ? response.data?.members : [];
  const apiPagination = response?.data?.pagination;
  const total = apiPagination?.total;

  const [statusFilter, setStatusFilter] = useState('All');
  const [showMemberDrawer, setShowMemberDrawer] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [communityFilter, setCommunityFilter] = useState('All');
  const [interestFilter, setInterestFilter] = useState('All');

  const { mutateAsync: deleteMember, isPending: isDeleteMemberLoading, isError: isDeleteMemberError } = useDeleteMember();

  const filteredMembers = useMemo(
    () => rawMembers.filter((member) => {
      if (statusFilter === 'Active') return member?.isActive === true;
      if (statusFilter === 'Inactive') return member?.isActive === false;
      if (communityFilter !== 'All') return member?.community === communityFilter;
      if (interestFilter !== 'All') return member?.interests?.includes(interestFilter);
      return true;
    }),
    [rawMembers, communityFilter, interestFilter, statusFilter]
  );

  const totalMembers = total ?? rawMembers.length;
  const activeCount = useMemo(() => rawMembers.filter((m) => m?.isActive === true).length, [rawMembers]);
  const newThisMonth = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return rawMembers.filter((m) => m?.createdAt && new Date(m.createdAt) >= start).length;
  }, [rawMembers]);

  const communityOptions = useMemo(
    () => [...new Set(rawMembers.map((m) => m?.community).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [rawMembers]
  );

  const interestOptions = useMemo(
    () => [...new Set(rawMembers.flatMap((m) => (Array.isArray(m?.interests) ? m.interests : [])).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [rawMembers]
  );

  const activeFilterCount = [communityFilter !== 'All', interestFilter !== 'All'].filter(Boolean).length;
  
  const resetMoreFilters = () => {
    setCommunityFilter('All');
    setInterestFilter('All');
  };

  const chip = (value) => {
    if (!value) return <span className="text-xs text-gray-400">—</span>;
    const cls = `inline-flex max-w-[200px] truncate px-2.5 py-0.5 text-xs font-medium rounded-full border ${softColor(String(value))}`;
    return <span className={cls}>{value}</span>;
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowMemberDrawer(true);
  };

  const handleMemberDetails = (member) => {
    setSelectedMember(member);
    setShowDetailsDrawer(true);
  };

  const handleMemberEdit = (member) => {
    setSelectedMember(member);
    setShowDetailsDrawer(false);
    setShowEditDrawer(true);
  };

  const handleCloseMemberDrawer = () => {
    setShowMemberDrawer(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleCloseDetailsDrawer = () => {
    setShowDetailsDrawer(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleCloseEditDrawer = () => {
    setShowEditDrawer(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleDelete = async () => {
    if (!selectedMember?._id) return;
    try {
      const res = await deleteMember(selectedMember._id);
      toast.success(res?.message || 'Member deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedMember(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete member.');
    }
  };

  const ActionMenu = ({ member }) => (
    <div className="flex items-center gap-0.5">
      <Tooltip title="View details">
        <Button type="text" size="small" aria-label="View details" icon={<EyeIcon className="h-4 w-4" />} onClick={() => handleMemberDetails(member)} />
      </Tooltip>
      <Tooltip title="Edit member">
        <Button type="text" size="small" aria-label="Edit member" icon={<PencilIcon className="h-4 w-4" />} onClick={() => handleMemberEdit(member)} />
      </Tooltip>
      <Tooltip title="Delete member">
        <Button
          type="text"
          size="small"
          danger
          aria-label="Delete member"
          icon={<TrashIcon className="h-4 w-4" />}
          onClick={() => {
            setSelectedMember(member);
            setShowDeleteDialog(true);
          }}
        />
      </Tooltip>
    </div>
  );
  const tableColumns = [
    {
      accessorKey: 'fullName',
      header: 'Member',
      cell: (info) => {
        const member = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
              {member?.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'}
            </div>
            <div>
              <p className="m-0 font-semibold text-gray-900">{member?.fullName}</p>
              <p className="m-0 text-xs tabular-nums text-gray-500">ID: #{(member?._id ?? '').toString().slice(-6).toUpperCase()}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Contact',
      cell: (info) => {
        const member = info.row.original;
        return (
          <div>
            <p className="m-0 text-[13px] text-gray-700">{member?.email}</p>
            <p className="m-0 text-xs text-gray-500">{member?.phone}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: (info) => {
        const member = info.row.original;
        return (
          <div>
            <p className="m-0 text-[13px] text-gray-700">{member?.location || '—'}</p>
            <p className="m-0 text-xs text-gray-500">Community: {member?.community || '—'}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'interests',
      header: 'Interests',
      cell: (info) => {
        const member = info.row.original;
        return (
          <div className="flex flex-wrap gap-1 max-w-[240px]">
            {Array.isArray(member?.interests) && member.interests.length > 0
              ? member.interests.map((i) => <span key={i} className={pillClass('success')}>{i}</span>)
              : <span className="text-xs text-gray-400">—</span>}
          </div>
        );
      },
    },
    {
      accessorKey: 'skill',
      header: 'Skill',
      cell: (info) => chip(info.row?.original?.skill || info.getValue?.() || ''),
    },
    {
      accessorKey: 'reason',
      header: 'Reason',
      cell: (info) => chip(info.row?.original?.reason || info.getValue?.() || ''),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      enableSorting: true,
      cell: (info) => {
        const date = info.row?.original?.createdAt || info.getValue?.();
        return date ? new Date(date).toLocaleDateString() : '—';
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: (info) => (
        <span className={getStatusBadge(info.row?.original?.isActive || info.getValue?.())}>
          {(info.row?.original?.isActive || info.getValue?.()) === true ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => <ActionMenu member={info.row.original} />,
    },
  ];
  
  return (
    <div className="space-y-6">
      <Toaster position='top-right'/>
      <PageIntro
        title="Member management"
        description="Manage BFCN community members"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={handleAddMember}>
            Add member
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
          { label: 'Total members', value: totalMembers, change: 'Registered', icon: UsersIcon },
          { label: 'Active members', value: activeCount, change: 'Currently active', icon: Activity },
          { label: 'Communities', value: new Set(rawMembers.map((m) => m.community).filter(Boolean)).size, change: 'Unique', icon: MapPinned, tone: 'accent' },
          { label: 'New this month', value: newThisMonth, change: 'Joined recently', icon: CalendarPlus, tone: 'accent' },
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value.toLocaleString()} hint={stat.change} icon={stat.icon} tone={stat.tone} />
        ))}
      </motion.div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <Input
            allowClear
            size="large"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            placeholder="Search members by name, email, phone, location, community, or interest"
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="min-w-40"
              aria-label="Status"
              options={['All', 'Active', 'Inactive'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button 
              size="large" 
              icon={<FunnelIcon className="h-[18px] w-[18px]" />}
              onClick={() => setFiltersOpen(true)}
            >
              More filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => {
                exportCsv('bfcn-members.csv', filteredMembers);
                toast.success('Members exported as CSV');
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <SimpleTable
          data={filteredMembers}
          columns={tableColumns}
          loading={membersLoading}
          pageSize={filters.limit}
          emptyTitle="No members found"
          emptyDescription="Try adjusting your search or status filter."
          keyField="_id"
        />
      </motion.div>

      <Drawer
        isOpen={showMemberDrawer}
        onClose={handleCloseMemberDrawer}
        destroyOnClose
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              Add new member
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              Add a new member to the BFCN community
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <JoinForm onClose={handleCloseMemberDrawer} />
      </Drawer>

      <Drawer
        isOpen={showDetailsDrawer}
        onClose={handleCloseDetailsDrawer}
        destroyOnClose
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              Member details
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              Full profile for {selectedMember?.fullName || 'this member'}
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <MemberDetails
          member={selectedMember}
          onEdit={() => handleMemberEdit(selectedMember)}
          onClose={handleCloseDetailsDrawer}
        />
      </Drawer>

      <Drawer
        isOpen={showEditDrawer}
        onClose={handleCloseEditDrawer}
        destroyOnClose
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              Edit member
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              Update member details in the directory
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <EditMemberForm
          member={selectedMember}
          onClose={handleCloseEditDrawer}
          onSubmitted={handleCloseEditDrawer}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleDelete}
        title="Delete member"
        message={`Are you sure you want to delete ${selectedMember?.fullName ?? 'this member'}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleteMemberLoading}
      />

      <MoreFiltersDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={[
          {
            key: 'community',
            label: 'Community',
            placeholder: 'All communities',
            options: communityOptions,
            description: 'Filter by member community',
          },
          {
            key: 'interest',
            label: 'Area of interest',
            placeholder: 'All interests',
            options: interestOptions,
            description: 'Filter by member interests',
          },
        ]}
        filterValues={{
          community: communityFilter,
          interest: interestFilter,
        }}
        onFilterChange={(key, value) => {
          if (key === 'community') setCommunityFilter(value);
          if (key === 'interest') setInterestFilter(value);
        }}
        onReset={resetMoreFilters}
        title="Member Filters"
        subtitle="Refine your member search with these filters"
        activeFilterCount={activeFilterCount}
        resultCount={filteredMembers.length}
        resultLabel="members"
      />
    </div>
  );
};

export default EnhancedMember;
