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
import { Download, Edit, Eye, Filter, MoreVertical, Plus, Search, Trash2 } from 'lucide-react';

const members = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678', joinDate: '2023-01-15', status: 'Active', type: 'Regular' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+234 802 345 6789', joinDate: '2023-02-20', status: 'Active', type: 'Premium' },
  { id: 3, name: 'David Johnson', email: 'david@example.com', phone: '+234 803 456 7890', joinDate: '2023-03-10', status: 'Inactive', type: 'Regular' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+234 804 567 8901', joinDate: '2023-04-05', status: 'Active', type: 'Premium' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '+234 805 678 9012', joinDate: '2023-05-12', status: 'Pending', type: 'Regular' }
];

export default function MemberManagement() {
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
    watch
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
      // Simulate API call
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
          <p className="text-gray-600">Manage BFCN community members</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            More Filters
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="shadow-sm">
        <DataTable
          data={filteredMembers}
          keyField="id"
          emptyTitle="No members found"
          emptyDescription="Try adjusting your search or status filter."
          columns={[
            { key: 'member', title: 'Member', render: (member) => <div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#d9ece0] text-sm font-medium text-[#427456]">{member.name.split(' ').map((name) => name[0]).join('')}</div><div><p className="text-sm font-medium text-[#17231d]">{member.name}</p><p className="text-xs text-[#708078]">ID: #{member.id.toString().padStart(4, '0')}</p></div></div> },
            { key: 'contact', title: 'Contact', render: (member) => <div><p className="text-sm text-[#34443a]">{member.email}</p><p className="text-xs text-[#708078]">{member.phone}</p></div> },
            { key: 'joinDate', title: 'Join date', render: (member) => new Date(member.joinDate).toLocaleDateString() },
            { key: 'type', title: 'Type', render: (member) => <span className={getTypeBadge(member.type)}>{member.type}</span> },
            { key: 'status', title: 'Status', render: (member) => <span className={getStatusBadge(member.status)}>{member.status}</span> },
            { key: 'actions', title: 'Actions', render: (member) => <div className="flex items-center gap-2"><button onClick={() => toast.info(`Viewing ${member.name}`)} className="text-[#708078] hover:text-[#427456]" aria-label={`View ${member.name}`}><Eye size={16} /></button><button onClick={() => handleEdit(member)} className="text-[#708078] hover:text-[#427456]" aria-label={`Edit ${member.name}`}><Edit size={16} /></button><button onClick={() => { setSelectedMember(member); setShowDeleteDialog(true); }} className="text-[#708078] hover:text-red-600" aria-label={`Delete ${member.name}`}><Trash2 size={16} /></button><button className="text-[#708078] hover:text-[#17231d]" aria-label={`More actions for ${member.name}`}><MoreVertical size={16} /></button></div> },
          ]}
        />
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Member</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
