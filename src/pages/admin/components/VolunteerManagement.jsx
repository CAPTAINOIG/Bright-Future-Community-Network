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
  EllipsisVerticalIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Modal, FormField, Dropdown, ConfirmDialog, toast } from '../../../components/ui';
import DataTable from '../../../components/admin/DataTable';
import { motion } from 'framer-motion';
import { Button, Input, Select, Space, Tag, Tooltip } from 'antd';
import { exportCsv } from '../../../utils/exportCsv';

const volunteers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+234 801 111 2222', skills: 'Teaching, Event Planning', availability: 'Weekends', status: 'Active', appliedDate: '2023-01-10', hours: 120 },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', phone: '+234 802 222 3333', skills: 'Photography, Social Media', availability: 'Evenings', status: 'Pending', appliedDate: '2023-02-15', hours: 0 },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', phone: '+234 803 333 4444', skills: 'Healthcare, First Aid', availability: 'Flexible', status: 'Active', appliedDate: '2023-03-01', hours: 85 },
  { id: 4, name: 'Daniel Lee', email: 'daniel@example.com', phone: '+234 804 444 5555', skills: 'Construction, Manual Labor', availability: 'Weekdays', status: 'Inactive', appliedDate: '2023-04-20', hours: 45 },
  { id: 5, name: 'Emma Wilson', email: 'emma@example.com', phone: '+234 805 555 6666', skills: 'Graphic Design, Marketing', availability: 'Part-time', status: 'Pending', appliedDate: '2023-05-05', hours: 0 }
];

export default function VolunteerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
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
      skills: '',
      availability: 'Weekends'
    }
  });

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const handleApprove = async (id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Volunteer approved successfully!');
    } catch (error) {
      toast.error('Failed to approve volunteer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Volunteer application rejected.');
    } catch (error) {
      toast.error('Failed to reject application.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedVolunteer) {
        toast.success('Volunteer updated successfully!');
      } else {
        toast.success('Volunteer added successfully!');
      }
      
      setShowAddModal(false);
      reset();
      setSelectedVolunteer(null);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setValue('name', volunteer.name);
    setValue('email', volunteer.email);
    setValue('phone', volunteer.phone);
    setValue('skills', volunteer.skills);
    setValue('availability', volunteer.availability);
    setShowAddModal(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Volunteer removed successfully!');
      setShowDeleteDialog(false);
      setSelectedVolunteer(null);
    } catch (error) {
      toast.error('Failed to remove volunteer.');
    } finally {
      setIsLoading(false);
    }
  };

  const volunteerActions = (volunteer) => [
    {
      label: 'View Profile',
      icon: EyeIcon,
      onClick: () => toast.info(`Viewing ${volunteer.name}'s profile`)
    },
    {
      label: 'Edit Volunteer',
      icon: PencilIcon,
      onClick: () => handleEdit(volunteer)
    },
    ...(volunteer.status === 'Pending' ? [
      {
        label: 'Approve',
        icon: CheckCircleIcon,
        onClick: () => handleApprove(volunteer.id)
      },
      {
        label: 'Reject',
        icon: XCircleIcon,
        onClick: () => handleReject(volunteer.id)
      }
    ] : []),
    {
      label: 'Remove Volunteer',
      icon: TrashIcon,
      onClick: () => {
        setSelectedVolunteer(volunteer);
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
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Management</h2>
          <p className="text-gray-600">Manage community volunteers and their skills</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={() => {
            reset();
            setSelectedVolunteer(null);
            setShowAddModal(true);
          }}>Add Volunteer</Button>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volunteers', value: '89', color: 'bg-blue-500' },
          { label: 'Active', value: '67', color: 'bg-green-500' },
          { label: 'Pending', value: '12', color: 'bg-yellow-500' },
          { label: 'Total Hours', value: '2,450', color: 'bg-purple-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
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
            placeholder="Search name, email, or skills" 
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />} 
            className="flex-1" 
          />
          <Space wrap>
            <Select 
              size="large" 
              value={statusFilter} 
              onChange={setStatusFilter} 
              className="min-w-36" 
              options={['All', 'Active', 'Inactive', 'Pending'].map((value) => ({ 
                value, 
                label: value === 'All' ? 'All statuses' : value 
              }))} 
            />
            <Button size="large" icon={<FunnelIcon className="h-5 w-5" />}>Skills filter</Button>
            <Button 
              size="large" 
              icon={<ArrowDownTrayIcon className="h-5 w-5" />} 
              onClick={() => exportCsv('bfcn-volunteers.csv', filteredVolunteers) && toast.success('Volunteers exported as CSV')}
            >Export</Button>
          </Space>
        </div>
      </motion.div>

      {/* Volunteers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="shadow-sm"
      >
        <DataTable
          data={filteredVolunteers}
          keyField="id"
          emptyTitle="No volunteers found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            { 
              key: 'volunteer', 
              title: 'Volunteer', 
              render: (volunteer) => (
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#e3f2fd] text-sm font-semibold text-[#1976d2]">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#17231d]">{volunteer.name}</p>
                    <p className="text-xs text-[#708078]">Available: {volunteer.availability}</p>
                  </div>
                </div>
              ) 
            },
            { 
              key: 'contact', 
              title: 'Contact', 
              render: (volunteer) => (
                <div>
                  <p className="text-sm text-[#34443a]">{volunteer.email}</p>
                  <p className="text-xs text-[#708078]">{volunteer.phone}</p>
                </div>
              ) 
            },
            { 
              key: 'skills', 
              title: 'Skills', 
              render: (volunteer) => (
                <div className="max-w-48">
                  <p className="text-sm text-gray-900 truncate">{volunteer.skills}</p>
                </div>
              ) 
            },
            { 
              key: 'hours', 
              title: 'Hours', 
              sortable: true, 
              render: (volunteer) => (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{volunteer.hours}h</span>
                </div>
              ) 
            },
            { 
              key: 'status', 
              title: 'Status', 
              render: (volunteer) => <span className={getStatusBadge(volunteer.status)}>{volunteer.status}</span> 
            },
            { 
              key: 'actions', 
              title: 'Actions', 
              render: (volunteer) => (
                <Dropdown 
                  trigger={<EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />} 
                  items={volunteerActions(volunteer)} 
                  align="right" 
                />
              ) 
            },
          ]}
        />
      </motion.div>

      {/* Add/Edit Volunteer Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          reset();
          setSelectedVolunteer(null);
        }}
        title={selectedVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}
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
            label="Skills"
            {...register('skills', {
              required: 'At least one skill is required'
            })}
            error={errors.skills}
            placeholder="e.g. Teaching, Event Planning, Photography"
            help="List relevant skills"
          />

          <FormField
            label="Availability"
            type="select"
            required
            {...register('availability', { required: 'Availability is required' })}
            error={errors.availability}
          >
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Evenings">Evenings</option>
            <option value="Flexible">Flexible</option>
            <option value="Part-time">Part-time</option>
          </FormField>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                reset();
                setSelectedVolunteer(null);
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
                  {selectedVolunteer ? 'Updating...' : 'Adding...'}
                </div>
              ) : (
                selectedVolunteer ? 'Update Volunteer' : 'Add Volunteer'
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
          setSelectedVolunteer(null);
        }}
        onConfirm={handleDelete}
        title="Remove Volunteer"
        message={`Are you sure you want to remove ${selectedVolunteer?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Remove"
        loading={isLoading}
      />
    </div>
  );
}
