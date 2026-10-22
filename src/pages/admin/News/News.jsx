import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Avatar, Button, Input, Select, Tooltip } from 'antd';
import { Eye as EyeStatIcon, FilePen as FilePenIcon, Globe as GlobeIcon, Newspaper as NewspaperIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
import NewsForm from './NewsForm';

const articles = [
  { id: 1, title: 'BFCN Receives $100k Grant for Youth Education Program', category: 'Community News', author: 'Amina Garba', publishedDate: '2025-10-05', views: 1284, comments: 18, status: 'Published' },
  { id: 2, title: 'Community Health Outreach Serves 500+ Residents in Lagos', category: 'Event Recap', author: 'Dr. Joy Nwosu', publishedDate: '2025-09-28', views: 2150, comments: 34, status: 'Published' },
  { id: 3, title: 'Introducing Our New Leadership Team for 2026', category: 'Announcement', author: 'Board of Trustees', publishedDate: '2025-09-15', views: 3820, comments: 56, status: 'Published' },
  { id: 4, title: 'How Donor Funds Are Being Used — Q3 Transparency Report', category: 'Press Release', author: 'Chinedu Okoro', publishedDate: '2025-10-01', views: 980, comments: 12, status: 'Published' },
  { id: 5, title: 'Women in Agribusiness Graduation Ceremony Coming Soon', category: 'Announcement', author: 'Halima Bello', publishedDate: '2025-05-15', views: 412, comments: 4, status: 'Draft' },
  { id: 6, title: 'A Day in the Life of Our Volunteer Coordinators', category: 'Success Story', author: 'Fatima Hassan', publishedDate: '2025-08-20', views: 1670, comments: 22, status: 'Published' },
];

const getStatusBadge = (status) => {
  const map = {
    Published: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    Draft: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Archived: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset whitespace-nowrap ${map[status]?.className ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showNewsDrawer, setShowNewsDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesSearch =
        !term ||
        a.title.toLowerCase().includes(term) ||
        a.author.toLowerCase().includes(term) ||
        a.category.toLowerCase().includes(term);
      const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => a.status === 'Published').length;
  const draftCount = articles.filter((a) => a.status === 'Draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  const openAddArticle = () => {
    setSelectedArticle(null);
    setShowNewsDrawer(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowNewsDrawer(true);
  };

  const closeNewsDrawer = () => {
    setShowNewsDrawer(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const handleFormSubmitted = () => {
    closeNewsDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Article deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedArticle(null);
    } catch {
      toast.error('Failed to delete article.');
    } finally {
      setIsDeleting(false);
    }
  };

  const newsActions = (article) => [
    { label: 'Preview article', icon: EyeIcon, onClick: () => toast.info(`Previewing: ${article.title}`) },
    { label: 'Edit article', icon: PencilIcon, onClick: () => handleEdit(article) },
    {
      label: 'Delete article',
      icon: TrashIcon,
      onClick: () => {
        setSelectedArticle(article);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ article }) => (
    <div className="flex items-center gap-0.5">
      {newsActions(article).map((action, idx) => (
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
        title="News management"
        description="Publish and manage BFCN news articles"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddArticle}>
            New article
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
          { label: 'Total articles', value: totalArticles.toLocaleString(), change: 'Total posts', icon: NewspaperIcon },
          { label: 'Published', value: publishedCount, change: 'Public articles', icon: GlobeIcon },
          { label: 'Drafts', value: draftCount, change: 'In progress', icon: FilePenIcon, tone: 'accent' },
          { label: 'Total views', value: totalViews.toLocaleString(), change: 'All time reads', icon: EyeStatIcon, tone: 'accent' },
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
            placeholder="Search articles by title, author, or category..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={categoryFilter}
              onChange={setCategoryFilter}
              open={categoryOpen}
              onOpenChange={setCategoryOpen}
              className="min-w-44"
              aria-label="Categories"
              options={['All', 'Community News', 'Announcement', 'Event Recap', 'Success Story', 'Press Release', 'Opinion', 'Partnership'].map((option) => ({ value: option, label: option === 'All' ? 'All categories' : option }))}
            />
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              open={statusOpen}
              onOpenChange={setStatusOpen}
              className="min-w-44"
              aria-label="Statuses"
              options={['All', 'Published', 'Draft', 'Archived'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Articles exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <SimpleTable
          data={filteredArticles}
          keyField="id"
          emptyTitle="No articles found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            {
              accessorKey: 'title',
              header: 'Article',
              cell: (info) => {
                const a = info.row?.original;
                return (
                  <div>
                    <p className="m-0 font-semibold text-gray-900 max-w-[320px] truncate">{a?.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={pillClass('neutral')}>{a?.category}</span>
                      <p className="m-0 inline-flex items-center gap-1 text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(a?.publishedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              },
            },
            {
              accessorKey: 'author',
              header: 'Author',
              cell: (info) => {
                const a = info.row?.original;
                return (
                  <div className="flex items-center gap-2">
                    <Avatar size={32} className="!bg-primary-50 !text-xs !font-semibold !text-primary-700">
                      {a?.author.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                    </Avatar>
                    <span className="text-[13px] text-gray-700">{a?.author}</span>
                  </div>
                );
              },
            },
            { accessorKey: 'views', header: 'Views', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{info.row?.original?.views.toLocaleString()}</p> },
            { accessorKey: 'comments', header: 'Comments', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{info.row?.original?.comments}</p> },
            { 
              accessorKey: 'status', 
              header: 'Status', 
              cell: (info) => <span className={getStatusBadge(info.row?.original?.status)}>{info.row?.original?.status}</span> 
            },
            {
              id: 'actions',
              header: 'Actions',
              cell: (info) => <ActionMenu article={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showNewsDrawer}
        onClose={closeNewsDrawer}
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              {selectedArticle ? 'Edit Article' : 'Write New Article'}
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              {selectedArticle ? 'Update article content' : 'Create a new news article for publication'}
            </p>
          </div>
        }
        position="right"
        width={720}
      >
        <NewsForm
          article={selectedArticle}
          onClose={closeNewsDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedArticle(null);
        }}
        onConfirm={handleDelete}
        title="Delete article"
        message={`Are you sure you want to delete "${selectedArticle?.title}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
