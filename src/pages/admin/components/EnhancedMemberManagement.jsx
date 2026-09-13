import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  EllipsisVerticalIcon 
} from '@heroicons/react/24/outline';
import { Modal, FormField, Dropdown, ConfirmDialog, toast } from '../../../components/ui';
import DataTable from '../../../components/admin/DataTable';
import { motion } from 'framer-motion';
import { Button, Input, Select, Space } from 'antd';
import { exportCsv } from '../../../utils/exportCsv';

const members = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678', joinDate: '2023-01-15', status: 'Active', type: 'Regular' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+234 802 345 6789', joinDate: '2023-02-20', status: 'Active', type: 'Premium' },
  { id: 3, name: 'David Johnson', email: 'david@example.com', phone: '+234 803 456 7890', joinDate: '2023-03-10', status: 'Inactive', type: 'Regular' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+234 804 567 8901', joinDate: '2023-04-05', status: 'Active', type: 'Premium' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '+234 805 678 9012', joinDate: '2023-05-12', status: 'Pending', type: 'Regular' }
];

export default function EnhancedMemberManagement() {
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
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'Regular'
    }
  });

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Inactive': 'bg-gray-100 text-gray-800 border-gray-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return `px-3 py-1 text-xs font-medium rounded-full border ${colors[status]}`;
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800 border-purple-200',
      'Regular': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return `px-3 py-1 text-xs font-medium rounded-full border ${colors[type]}`;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedMember) {
        toast.success('Member updated successfully!');
      } else {
        toast.success('Member added successfully!');
      }
      
      setShowAddModal(false);
      reset();
      setSelectedMember(null);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setValue('name', member.name);
    setValue('email', member.email);
    setValue('phone', member.phone);
    setValue('type', member.type);
    setShowAddModal(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Member deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedMember(null);
    } catch (error) {
      toast.error('Failed to delete member.');
    } finally {
      setIsLoading(false);
    }
  };

  const memberActions = (member) => [
    {
      label: 'View Details',
      icon: EyeIcon,
      onClick: () => toast.info(`Viewing ${member.name}`)
    },
    {
      label: 'Edit Member',
      icon: PencilIcon,
      onClick: () => handleEdit(member)
    },
    {
      label: 'Delete Member',
      icon: TrashIcon,
      onClick: () => {
        setSelectedMember(member);
        setShowDeleteDialog(true);
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={() => {
            reset();
            setSelectedMember(null);
            setShowAddModal(true);
          }}>Add Member</Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Members', value: '1,234', change: '+12%', color: 'bg-blue-500' },
          { label: 'Active Members', value: '1,089', change: '+8%', color: 'bg-green-500' },
          { label: 'Premium Members', value: '156', change: '+15%', color: 'bg-purple-500' },
          { label: 'New This Month', value: '89', change: '+23%', color: 'bg-orange-500' }
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

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input allowClear size="large" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search members by name or email" prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />} className="flex-1" />
          <Space wrap>
            <Select size="large" value={statusFilter} onChange={setStatusFilter} className="min-w-36" options={['All', 'Active', 'Inactive', 'Pending'].map((value) => ({ value, label: value === 'All' ? 'All statuses' : value }))} />
            <Button size="large" icon={<FunnelIcon className="h-5 w-5" />}>More filters</Button>
            <Button size="large" icon={<ArrowDownTrayIcon className="h-5 w-5" />} onClick={() => exportCsv('bfcn-members.csv', filteredMembers) && toast.success('Members exported as CSV')}>Export</Button>
          </Space>
        </div>
      </motion.div>

      {/* Members Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="shadow-sm"
      >
        <DataTable
          data={filteredMembers}
          keyField="id"
          emptyTitle="No members found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            { key: 'member', title: 'Member', render: (member) => <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456]">{member.name.split(' ').map((name) => name[0]).join('')}</div><div><p className="font-medium text-[#17231d]">{member.name}</p><p className="text-xs text-[#708078]">ID: #{member.id.toString().padStart(4, '0')}</p></div></div> },
            { key: 'contact', title: 'Contact', render: (member) => <div><p className="text-sm text-[#34443a]">{member.email}</p><p className="text-xs text-[#708078]">{member.phone}</p></div> },
            { key: 'joinDate', title: 'Join date', sortable: true, render: (member) => new Date(member.joinDate).toLocaleDateString() },
            { key: 'type', title: 'Type', render: (member) => <span className={getTypeBadge(member.type)}>{member.type}</span> },
            { key: 'status', title: 'Status', render: (member) => <span className={getStatusBadge(member.status)}>{member.status}</span> },
            { key: 'actions', title: 'Actions', render: (member) => <Dropdown trigger={<EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />} items={memberActions(member)} align="right" /> },
          ]}
        />
      </motion.div>

      {/* Add/Edit Member Modal */}
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
                message: 'Name must be at least 2 characters'
              }
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
                message: 'Invalid email address'
              }
            })}
            error={errors.email}
            placeholder="Enter email address"
          />

          <FormField
            label="Phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: 'Invalid phone number'
              }
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
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleDelete}
        title="Delete Member"
        message={`Are you sure you want to delete ${selectedMember?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isLoading}
      />
    </div>
  );
}
