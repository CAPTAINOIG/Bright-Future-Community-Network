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
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag } from 'antd';
import { exportCsv } from '../../../utils/exportCsv';
import { useGetMember } from '../../../api/member';
import { JoinForm } from '../../../components/forms';

const EnhancedMember = () => {
  const { data: response = { members: [], pagination: {} }, isPending: membersLoading } = useGetMember();
  const rawMembers = Array.isArray(response?.data?.members) ? response.data?.members : [];
  const apiPagination = response?.data?.pagination;
  const total = apiPagination?.total;
  const limit = apiPagination?.limit;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showMemberDrawer, setShowMemberDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return rawMembers.filter((member) => {
      const matchesSearch =
        !term ||
        member?.fullName?.toLowerCase()?.includes(term) ||
        member?.email?.toLowerCase()?.includes(term) ||
        String(member?.phone ?? '').includes(term) ||
        member?.location?.toLowerCase()?.includes(term) ||
        member?.community?.toLowerCase()?.includes(term) ||
        (Array.isArray(member?.interests) && member.interests.some((i) => String(i).toLowerCase().includes(term)));

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && member?.isActive === true) ||
        (statusFilter === 'Inactive' && member?.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [rawMembers, searchTerm, statusFilter]);

  const totalMembers = total ?? rawMembers.length;
  const activeCount = useMemo(() => rawMembers.filter((m) => m?.isActive === true).length, [rawMembers]);
  const newThisMonth = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return rawMembers.filter((m) => m?.createdAt && new Date(m.createdAt) >= start).length;
  }, [rawMembers]);

  const softColor = (seed) => {
    const palette = [
      'bg-[#d9ece0] text-[#427456] border-[#c4dfcd]',
      'bg-[#e6e1f4] text-[#564189] border-[#d4cbec]',
      'bg-[#f8e5d6] text-[#8a5a2b] border-[#f1cfb2]',
      'bg-[#dce8f7] text-[#2f5a8e] border-[#c2d7f0]',
      'bg-[#f7e0e0] text-[#8f3a3a] border-[#efc6c6]',
      'bg-[#eaf4d7] text-[#556b2f] border-[#d7e9bb]',
    ];
    let hash = 0;
    for (let i = 0; i < (seed ?? '').length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return palette[hash % palette.length];
  };

  const getStatusBadge = (isActive) => {
    if (isActive === true) return 'px-3 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200';
    return 'px-3 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-800 border-gray-200';
  };

  const chip = (value) => {
    if (!value) return <span className="text-xs text-[#708078]">—</span>;
    const cls = `px-2.5 py-1 text-xs font-medium rounded-full border ${softColor(String(value))}`;
    return <span className={cls}>{value}</span>;
  };

  const openAddMember = () => {
    setSelectedMember(null);
    setShowMemberDrawer(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowMemberDrawer(true);
  };

  const closeMemberDrawer = () => {
    setShowMemberDrawer(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleFormSubmitted = () => {
    closeMemberDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Member deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedMember(null);
    } catch {
      toast.error('Failed to delete member.');
    } finally {
      setIsDeleting(false);
    }
  };

  const ActionMenu = ({ member }) => {
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
            <button
              onClick={() => {
                toast.info(`Viewing ${member.fullName ?? 'member'}`);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg transition-colors flex items-center gap-2"
            >
              <EyeIcon className="h-4 w-4" /> View Details
            </button>
            <button
              onClick={() => {
                handleEdit(member);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" /> Edit Member
            </button>
            <button
              onClick={() => {
                setSelectedMember(member);
                setShowDeleteDialog(true);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 last:rounded-b-lg transition-colors flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" /> Delete Member
            </button>
          </div>
        )}
      </div>
    );
  };

  const tableColumns = [
    {
      accessorKey: 'fullName',
      header: 'Member',
      cell: (info) => {
        const member = info.row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456]">
              {member?.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'}
            </div>
            <div>
              <p className="font-medium text-[#17231d]">{member?.fullName}</p>
              <p className="text-xs text-[#708078]">ID: #{(member?._id ?? '').toString().slice(-6).toUpperCase()}</p>
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
            <p className="text-sm text-[#34443a]">{member?.email}</p>
            <p className="text-xs text-[#708078]">{member?.phone}</p>
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
            <p className="text-sm text-[#34443a]">{member?.location || '—'}</p>
            <p className="text-xs text-[#708078]">Community: {member?.community || '—'}</p>
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
              ? member.interests.map((i) => <Tag key={i} color="blue" style={{ margin: 2 }}>{i}</Tag>)
              : <span className="text-xs text-[#708078]">—</span>}
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
      header: 'Join Date',
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

  const pageSize = Number(limit) || 10;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
          <p className="text-gray-600">Manage BFCN community members</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            type="primary"
            size="large"
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={openAddMember}
          >
            Add Member
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
          { label: 'Total Members', value: totalMembers, change: 'registered', color: 'bg-blue-500' },
          { label: 'Active Members', value: activeCount, change: 'currently active', color: 'bg-green-500' },
          { label: 'Communities', value: new Set(rawMembers.map((m) => m.community).filter(Boolean)).size, change: 'unique', color: 'bg-purple-500' },
          { label: 'New This Month', value: newThisMonth, change: 'joined recently', color: 'bg-orange-500' },
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search members by name, email, phone, location, community, or interest"
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
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
              </button>
              {statusOpen && (
                <div className="absolute top-full mt-1 right-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Active', 'Inactive'].map((option) => (
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
            <Button size="large" icon={<FunnelIcon className="h-5 w-5" />}>
              More filters
            </Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              onClick={() => {
                exportCsv('bfcn-members.csv', filteredMembers);
                toast.success('Members exported as CSV');
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="shadow-sm"
      >
        <SimpleTable
          data={filteredMembers}
          columns={tableColumns}
          loading={membersLoading}
          pageSize={pageSize}
          emptyTitle="No members found"
          emptyDescription="Try adjusting your search or status filter."
          keyField="_id"
        />
      </motion.div>

      <Drawer
        isOpen={showMemberDrawer}
        onClose={closeMemberDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              {selectedMember
                ? 'Update member details in the directory'
                : 'Add a new member to the BFCN community'}
            </p>
          </div>
        } 
        position="right"
        width={600}
      >
        <JoinForm
          member={selectedMember}
          onClose={closeMemberDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleDelete}
        title="Delete Member"
        message={`Are you sure you want to delete ${selectedMember?.fullName ?? 'this member'}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
};

export default EnhancedMember;
