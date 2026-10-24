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
import { Button, Input, Progress, Select, Tooltip } from 'antd';
import { Activity as ActivityIcon, FolderKanban as FolderKanbanIcon, HeartHandshake as HeartHandshakeIcon, Wallet as WalletIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
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
    Planning: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Fundraising: { className: 'bg-accent-50 text-accent-700 ring-accent-200' },
    Active: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    'On Hold': { className: 'bg-accent-50 text-accent-700 ring-accent-200' },
    Completed: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Cancelled: { className: 'bg-red-50 text-red-700 ring-red-200' },
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset whitespace-nowrap ${map[status]?.className ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showProjectDrawer, setShowProjectDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    { label: 'View details', icon: EyeIcon, onClick: () => toast.info(`Viewing ${project.title}`) },
    { label: 'Edit project', icon: PencilIcon, onClick: () => handleEdit(project) },
    {
      label: 'Delete project',
      icon: TrashIcon,
      onClick: () => {
        setSelectedProject(project);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ project }) => (
    <div className="flex items-center gap-0.5">
      {projectActions(project).map((action, idx) => (
        <Tooltip key={idx} title={action.label}>
          <Button
            type="text"
            size="small"
            danger={action.label.startsWith('Delete')}
            aria-label={action.label}
            icon={<action.icon className="h-4 w-4" />}
            onClick={action.onClick}
          />
        </Tooltip>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageIntro
        title="Project management"
        description="Oversee BFCN community projects and track progress"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddProject}>
            New project
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
          { label: 'Total projects', value: totalProjects, change: 'Tracked', icon: FolderKanbanIcon },
          { label: 'Active projects', value: activeProjects, change: 'In progress', icon: ActivityIcon },
          { label: 'Funds raised', value: `₦${(totalRaised / 1e6).toFixed(1)}M`, change: `Of ₦${(totalBudget / 1e6).toFixed(1)}M budget`, icon: WalletIcon, tone: 'accent' },
          { label: 'Beneficiaries', value: totalBeneficiaries.toLocaleString(), change: 'People impacted', icon: HeartHandshakeIcon, tone: 'accent' },
        ].map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value.toLocaleString()} hint={stat.change} icon={stat.icon} tone={stat.tone} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5"
      >
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search projects by title, lead, or category..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="min-w-44"
              aria-label="Categories"
              options={['All', 'Education', 'Healthcare', 'Welfare', 'Community Development', 'Youth Empowerment', 'Women Empowerment', 'Environment', 'Infrastructure'].map((option) => ({ value: option, label: option === 'All' ? 'All categories' : option }))}
            />
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="min-w-44"
              aria-label="Statuses"
              options={['All', 'Planning', 'Fundraising', 'Active', 'On Hold', 'Completed', 'Cancelled'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Projects exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
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
                    <p className="m-0 font-semibold text-gray-900">{p?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={pillClass('neutral')}>{p?.category}</span>
                      <p className="m-0 text-xs text-gray-500">
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
                    <p className="m-0 mb-1 text-[13px] font-medium tabular-nums text-gray-900">
                      ₦{p?.raised?.toLocaleString()}
                      <span className="ml-1 text-xs font-normal text-gray-500">of ₦{p?.budget?.toLocaleString()}</span>
                    </p>
                    <Progress percent={Math.round((p?.raised / Math.max(p?.budget || 1, 1)) * 100)} size="small" showInfo={false} strokeColor="var(--color-primary-600)" railColor="var(--color-primary-100)" />
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
                    <p className="m-0 mb-1 text-[13px] tabular-nums text-gray-700">{p?.beneficiaries} / {p?.targetBeneficiaries}</p>
                    <Progress percent={Math.round((p?.beneficiaries / Math.max(p?.targetBeneficiaries || 1, 1)) * 100)} size="small" showInfo={false} strokeColor="var(--color-accent-300)" railColor="var(--color-accent-50)" />
                  </div>
                );
              },
            },
            {
              accessorKey: 'progress',
              header: 'Progress',
              cell: (info) => {
                const p = info.row?.original;
                return <Progress percent={p?.progress} size="small" strokeColor={p?.progress >= 100 ? 'var(--color-primary-700)' : 'var(--color-primary-600)'} railColor="var(--color-primary-100)" />;
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
            <h2 className="m-0 font-serif text-xl text-gray-900">
              {selectedProject ? 'Edit project' : 'Create new project'}
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
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
        title="Delete project"
        message={`Are you sure you want to delete "${selectedProject?.title}"? All progress and funding records will be removed. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
