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
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag, Progress } from 'antd';
import ProjectForm from './ProjectForm';

const projects = [
  { id: 1, title: 'Back-to-School Support Initiative', category: 'Education', startDate: '2025-09-01', endDate: '2025-12-20', budget: 500000, raised: 450000, targetBeneficiaries: 200, beneficiaries: 180, lead: 'Musa Ibrahim', status: 'Active', progress: 75 },
  { id: 2, title: 'Community Health Outreach', category: 'Healthcare', startDate: '2025-11-15', endDate: '2026-02-28', budget: 1200000, raised: 600000, targetBeneficiaries: 500, beneficiaries: 120, lead: 'Dr. Joy Nwosu', status: 'Fundraising', progress: 24 },
  { id: 3, title: 'Skills Acquisition Program for Youths', category: 'Youth Empowerment', startDate: '2025-06-01', endDate: '2025-11-30', budget: 800000, raised: 800000, targetBeneficiaries: 80, beneficiaries: 76, lead: 'Aisha Yakubu', status: 'Completed', progress: 100 },
  { id: 4, title: 'Clean Water for Rural Communities', category: 'Infrastructure', startDate: '2026-01-10', endDate: '2026-06-30', budget: 2500000, raised: 250000, targetBeneficiaries: 1500, beneficiaries: 0, lead: 'Chinedu Okoro', status: 'Planning', progress: 10 },
  { id: 5, title: 'Women in Agribusiness', category: 'Women Empowerment', startDate: '2025-08-01', endDate: '2026-05-31', budget: 1000000, raised: 980000, targetBeneficiaries: 60, beneficiaries: 50, lead: 'Halima Bello', status: 'Active', progress: 65 },
];

const getStatusBadge = (status) => {
  const map = {
    Planning: { className: 'bg-gray-100 text-gray-800' },
    Fundraising: { className: 'bg-yellow-100 text-yellow-800' },
    Active: { className: 'bg-green-100 text-green-800' },
    'On Hold': { className: 'bg-orange-100 text-orange-800' },
    Completed: { className: 'bg-blue-100 text-blue-800' },
    Cancelled: { className: 'bg-red-100 text-red-800' },
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${map[status]?.className ?? ''}`;
};

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showProjectDrawer, setShowProjectDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.lead.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'Active').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalRaised = projects.reduce((sum, p) => sum + p.raised, 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiaries, 0);

  const openAddProject = () => {
    setSelectedProject(null);
    setShowProjectDrawer(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowProjectDrawer(true);
  };

  const closeProjectDrawer = () => {
    setShowProjectDrawer(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleFormSubmitted = () => {
    closeProjectDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Project deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedProject(null);
    } catch {
      toast.error('Failed to delete project.');
    } finally {
      setIsDeleting(false);
    }
  };

  const projectActions = (project) => [
    { label: 'View Details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${project.title}`) },
    { label: 'Edit Project', icon: PencilIcon, onClick: () => handleEdit(project) },
    {
      label: 'Delete Project',
      icon: TrashIcon,
      onClick: () => {
        setSelectedProject(project);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ project }) => {
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
            {projectActions(project).map((action, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-600">Oversee BFCN community projects and track progress</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddProject}>
            New Project
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
          { label: 'Total Projects', value: totalProjects, change: 'tracked', color: 'bg-blue-500' },
          { label: 'Active Projects', value: activeProjects, change: 'in progress', color: 'bg-green-500' },
          { label: 'Funds Raised', value: `₦${(totalRaised / 1e6).toFixed(1)}M`, change: `of ₦${(totalBudget / 1e6).toFixed(1)}M budget`, color: 'bg-purple-500' },
          { label: 'Beneficiaries', value: totalBeneficiaries.toLocaleString(), change: 'people impacted', color: 'bg-orange-500' },
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
            placeholder="Search projects by title, lead, or category..."
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {categoryFilter === 'All' ? 'All categories' : categoryFilter}
              </button>
              {categoryOpen && (
                <div className="absolute top-full mt-1 left-0 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Education', 'Healthcare', 'Welfare', 'Community Development', 'Youth Empowerment', 'Women Empowerment', 'Environment', 'Infrastructure'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setCategoryFilter(option);
                        setCategoryOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        categoryFilter === option
                          ? 'bg-[#427456] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {option === 'All' ? 'All categories' : option}
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
                  {['All', 'Planning', 'Fundraising', 'Active', 'On Hold', 'Completed', 'Cancelled'].map((option) => (
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
              onClick={() => toast.success('Projects exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
        <SimpleTable
          data={filteredProjects}
          keyField="id"
          emptyTitle="No projects found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            {
              accessorKey: 'title',
              header: 'Project',
              cell: (info) => {
                const p = info.row?.original;
                return (
                  <div>
                    <p className="font-medium text-[#17231d]">{p?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Tag color="purple" style={{ margin: 0 }}>{p?.category}</Tag>
                      <p className="text-xs text-[#708078] m-0">
                        {new Date(p?.startDate).toLocaleDateString()} — {new Date(p?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              },
            },
            { accessorKey: 'lead', header: 'Lead', cell: (info) => info.row?.original?.lead },
            {
              accessorKey: 'raised',
              header: 'Funding',
              cell: (info) => {
                const p = info.row?.original;
                return (
                  <div>
                    <p className="text-sm text-[#34443a] font-medium">
                      ₦{p?.raised?.toLocaleString()}
                      <span className="text-[#708078] font-normal text-xs ml-1">of ₦{p?.budget?.toLocaleString()}</span>
                    </p>
                    <Progress percent={Math.round((p?.raised / Math.max(p?.budget || 1, 1)) * 100)} size="small" showInfo={false} strokeColor="#427456" />
                  </div>
                );
              },
            },
            {
              accessorKey: 'beneficiaries',
              header: 'Beneficiaries',
              cell: (info) => {
                const p = info.row?.original;
                return (
                  <div>
                    <p className="text-sm text-[#34443a]">{p?.beneficiaries} / {p?.targetBeneficiaries}</p>
                    <Progress percent={Math.round((p?.beneficiaries / Math.max(p?.targetBeneficiaries || 1, 1)) * 100)} size="small" showInfo={false} strokeColor="#1677ff" />
                  </div>
                );
              },
            },
            {
              accessorKey: 'progress',
              header: 'Progress',
              cell: (info) => {
                const p = info.row?.original;
                return <Progress percent={p?.progress} size="small" strokeColor={p?.progress >= 100 ? '#52c41a' : '#427456'} />;
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
              cell: (info) => <ActionMenu project={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showProjectDrawer}
        onClose={closeProjectDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              {selectedProject ? 'Update project details' : 'Add a new project with budget, timeline and target beneficiaries'}
            </p>
          </div>
        }
        position="right"
        width={720}
      >
        <ProjectForm
          project={selectedProject}
          onClose={closeProjectDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedProject(null);
        }}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.title}"? All progress and funding records will be removed. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
