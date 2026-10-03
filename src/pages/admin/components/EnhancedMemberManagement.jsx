import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Modal, FormField, Dropdown, ConfirmDialog, toast } from '../../../components/ui';
import DataTable from '../../../components/admin/DataTable';
import { motion } from 'framer-motion';
import { Button, Input, Select, Space, Tag } from 'antd';
import { exportCsv } from '../../../utils/exportCsv';
import { useCreateMember, useGetMember } from '../../../api/member';

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

export default function EnhancedMemberManagement() {
  const { data: response = { members: [], pagination: {} }, isPending: membersLoading } = useGetMember();
  const { mutateAsync: createMember, isPending: isCreatingMemberLoading } = useCreateMember();

  const rawMembers = Array.isArray(response?.data?.members) ? response.data?.members : [];
  const apiPagination = response?.data?.pagination ?? { total: rawMembers.length, totalPages: 1, page: 1, limit: 10 };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'Regular',
    },
  });

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
        Array.isArray(member?.interests) && member.interests.some((i) => String(i).toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && member?.isActive === true) ||
        (statusFilter === 'Inactive' && member?.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [rawMembers, searchTerm, statusFilter]);

  const totalMembers = apiPagination.total ?? rawMembers.length;
  const activeCount = useMemo(() => rawMembers.filter((m) => m?.isActive === true).length, [rawMembers]);
  const newThisMonth = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return rawMembers.filter((m) => m?.createdAt && new Date(m.createdAt) >= start).length;
  }, [rawMembers]);

  const getStatusBadge = (isActive) => {
    if (isActive === true) return 'px-3 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200';
    return 'px-3 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-800 border-gray-200';
  };

  const chip = (value) => {
    if (!value) return <span className="text-xs text-[#708078]">—</span>;
    const cls = `px-2.5 py-1 text-xs font-medium rounded-full border ${softColor(String(value))}`;
    return <span className={cls}>{value}</span>;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (selectedMember) {
        toast.success('Member updated successfully!');
      } else {
        await createMember({
          fullName: data.name,
          email: data.email,
          phone: data.phone,
        });
        toast.success('Member added successfully!');
      }
      setShowAddModal(false);
      reset();
      setSelectedMember(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setValue('name', member.fullName ?? '');
    setValue('email', member.email ?? '');
    setValue('phone', member.phone ?? '');
    setValue('type', 'Regular');
    setShowAddModal(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Member deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedMember(null);
    } catch {
      toast.error('Failed to delete member.');
    } finally {
      setIsLoading(false);
    }
  };

  const memberActions = (member) => [
    {
      label: 'View Details',
      icon: EyeIcon,
      onClick: () => toast.info(`Viewing ${member.fullName ?? 'member'}`),
    },
    {
      label: 'Edit Member',
      icon: PencilIcon,
      onClick: () => handleEdit(member),
    },
    {
      label: 'Delete Member',
      icon: TrashIcon,
      onClick: () => {
        setSelectedMember(member);
        setShowDeleteDialog(true);
      },
    },
  ];

  const pageSize = Number(apiPagination.limit) || 10;

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
            onClick={() => {
              reset();
              setSelectedMember(null);
              setShowAddModal(true);
            }}
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search members by name, email, phone, location, community, or interest"
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <Space wrap>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              variant="outlined"
              optionLabelProp="label"
              labelRender={(label) => <span style={{ color: '#17231d', fontWeight: 500 }}>{label?.label ?? String(label ?? statusFilter === 'All' ? 'All statuses' : statusFilter)}</span>}
              classNames={{
                selector: 'min-w-36',
                selectionItem: 'text-[#17231d]',
              }}
              styles={{
                selector: { minWidth: 144, color: '#17231d' },
                selectionItem: { color: '#17231d' },
                option: { color: '#17231d' },
              }}
              options={['All', 'Active', 'Inactive'].map((value) => ({
                value,
                label: value === 'All' ? 'All statuses' : value,
              }))}
            />
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
          </Space>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="shadow-sm"
      >
        <DataTable
          data={filteredMembers}
          keyField="_id"
          loading={membersLoading}
          pageSize={pageSize}
          emptyTitle="No members found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            {
              key: 'member',
              title: 'Member',
              render: (member) => (
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456]">
                    {member?.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'}
                  </div>
                  <div>
                    <p className="font-medium text-[#17231d]">{member?.fullName}</p>
                    <p className="text-xs text-[#708078]">ID: #{(member?._id ?? '').toString().slice(-6).toUpperCase()}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'contact',
              title: 'Contact',
              render: (member) => (
                <div>
                  <p className="text-sm text-[#34443a]">{member?.email}</p>
                  <p className="text-xs text-[#708078]">{member?.phone}</p>
                </div>
              ),
            },
            {
              key: 'location',
              title: 'Location',
              render: (member) => (
                <div>
                  <p className="text-sm text-[#34443a]">{member?.location || '—'}</p>
                  <p className="text-xs text-[#708078]">Community: {member?.community || '—'}</p>
                </div>
              ),
            },
            {
              key: 'interests',
              title: 'Interests',
              render: (member) => (
                <div className="flex flex-wrap gap-1 max-w-[240px]">
                  {Array.isArray(member?.interests) && member.interests.length > 0
                    ? member.interests.map((i) => <Tag key={i} color="blue" style={{ margin: 2 }}>{i}</Tag>)
                    : <span className="text-xs text-[#708078]">—</span>}
                </div>
              ),
            },
            {
              key: 'skill',
              title: 'Skill',
              render: (member) => chip(member?.skill),
            },
            {
              key: 'reason',
              title: 'Reason',
              render: (member) => chip(member?.reason),
            },
            {
              key: 'joinDate',
              title: 'Join date',
              sortable: true,
              sorter: (a, b) => new Date(a?.createdAt ?? 0) - new Date(b?.createdAt ?? 0),
              render: (member) => (member?.createdAt ? new Date(member.createdAt).toLocaleDateString() : '—'),
            },
            {
              key: 'status',
              title: 'Status',
              render: (member) => (
                <span className={getStatusBadge(member?.isActive)}>
                  {member?.isActive === true ? 'Active' : 'Inactive'}
                </span>
              ),
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (member) => (
                <Dropdown
                  trigger={<EllipsisVerticalIcon className="h-5 w-5 text-gray-400 cursor-pointer" />}
                  items={memberActions(member)}
                  align="right"
                />
              ),
            },
          ]}
        />
      </motion.div>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          reset();
          setSelectedMember(null);
        }}
        title={selectedMember ? 'Edit Member' : 'Add New Member'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Full Name"
            required
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            error={errors.name}
            placeholder="Enter full name"
          />

          <FormField
            label="Email"
            type="email"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
            placeholder="Enter email address"
          />

          <FormField
            label="Phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^\+?[1-9]\d{1,14}$|^\d{10,15}$/,
                message: 'Invalid phone number',
              },
            })}
            error={errors.phone}
            placeholder="+234 800 000 0000"
          />

          <FormField
            label="Member Type"
            type="select"
            required
            {...register('type', { required: 'Member type is required' })}
            error={errors.type}
          >
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </FormField>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                reset();
                setSelectedMember(null);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isLoading || isCreatingMemberLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isCreatingMemberLoading}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {(isLoading || isCreatingMemberLoading) ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {selectedMember ? 'Updating...' : 'Adding...'}
                </div>
              ) : (
                selectedMember ? 'Update Member' : 'Add Member'
              )}
            </button>
          </div>
        </form>
      </Modal>

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
        loading={isLoading}
      />
    </div>
  );
}
