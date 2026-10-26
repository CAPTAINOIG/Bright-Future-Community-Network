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
import { Drawer, ConfirmDialog } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Avatar, Button, Input, Select, Tooltip } from 'antd';
import { Eye as EyeStatIcon, FilePen as FilePenIcon, Globe as GlobeIcon, Newspaper as NewspaperIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
import { useGetAllNews, useGetNewsStats, useDeleteNews } from '../../../api/news';
import { Toaster, toast } from 'sonner';
import NewsForm from '../../../components/forms/NewsForm';
import NewsDetails from './NewsDetails';

const getStatusBadge = (status) => {
  const map = {
    published: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    Published: { className: 'bg-primary-50 text-primary-700 ring-primary-200' },
    pending: { className: 'bg-yellow-50 text-yellow-700 ring-yellow-200' },
    Draft: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    draft: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    rejected: { className: 'bg-red-50 text-red-600 ring-red-200' },
    archived: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
    Archived: { className: 'bg-gray-100 text-gray-600 ring-gray-200' },
  };
  return `inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full ring-1 ring-inset whitespace-nowrap capitalize ${map[status]?.className ?? 'bg-gray-100 text-gray-600 ring-gray-200'}`;
};

export default function NewsManagement() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: response, isPending: isNewsLoading } = useGetAllNews({
    page, limit: 20, search: searchTerm,
    status: statusFilter !== 'All' ? statusFilter : undefined,
    category: categoryFilter !== 'All' ? categoryFilter : undefined,
  });
  const { data: statsResponse } = useGetNewsStats();
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteNews();

  const [showNewsDrawer, setShowNewsDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);

  const articles = response?.data?.news ?? [];
  const pagination = response?.data?.pagination ?? {};
  const stats = statsResponse?.data?.articles ?? {};

  const totalArticles = stats.total ?? articles.length;
  const publishedCount = stats.published ?? 0;
  const pendingCount = stats.pending ?? 0;
  const featuredCount = stats.featured ?? 0;

  const openAddArticle = () => {
    setSelectedArticle(null);
    setShowNewsDrawer(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowNewsDrawer(true);
  };

  const handleNewDetails = (article) => {
    setSelectedArticle(article);
    setShowDetailsDrawer(true);
  }

  const closeNewsDrawer = () => {
    setShowNewsDrawer(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };
  
  const closeDetailsDrawer = () => {
    setShowDetailsDrawer(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const handleFormSubmitted = () => {
    closeNewsDrawer();
  };

  const handleDelete = async () => {
    if (!selectedArticle?._id) return;
    try {
      await deleteNews(selectedArticle._id);
      toast.success('Article deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedArticle(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete article.');
    }
  };

  const newsActions = (article) => [
    { label: 'Preview article', icon: EyeIcon, onClick: () => handleNewDetails(article) },
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
      <Toaster position='top-right' />
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
          { label: 'Published', value: publishedCount.toLocaleString(), change: 'Public articles', icon: GlobeIcon },
          { label: 'Pending', value: pendingCount.toLocaleString(), change: 'Awaiting review', icon: FilePenIcon, tone: 'accent' },
          { label: 'Featured', value: featuredCount.toLocaleString(), change: 'Highlighted articles', icon: EyeStatIcon, tone: 'accent' },
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
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
            placeholder="Search articles by title, author, or category..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={categoryFilter}
              onChange={(val) => {
                setCategoryFilter(val);
                setPage(1);
              }}
              className="min-w-44"
              aria-label="Categories"
              options={['All', 'general', 'politics', 'education', 'community', 'youth', 'health', 'sports', 'technology', 'business', 'entertainment', 'security', 'environment', 'agriculture', 'infrastructure', 'religion', 'opinion'].map((option) => ({ value: option, label: option === 'All' ? 'All categories' : option.charAt(0).toUpperCase() + option.slice(1) }))}
            />
            <Select
              size="large"
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
              className="min-w-44"
              aria-label="Statuses"
              options={['All', 'published', 'pending', 'rejected', 'archived'].map((option) => ({ value: option, label: option === 'All' ? 'All statuses' : option.charAt(0).toUpperCase() + option.slice(1) }))}
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
          data={articles}
          keyField="_id"
          loading={isNewsLoading}
          emptyTitle="No articles found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            { accessorKey: 'imageUrl', header: 'Image Preview', cell: (info) => <img src={info.row?.original?.imageUrl} className="w-[100px] h-[100px] object-cover rounded-md" alt="Preview" /> },
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
                        {a?.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : a?.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—'}
                      </p>
                    </div>
                  </div>
                );
              },
            },
            {
              accessorKey: 'author',
              header: 'Author / Source',
              cell: (info) => {
                const a = info.row?.original;
                const displayName = a?.author || a?.sourceName || 'Unknown';
                return (
                  <div className="flex items-center gap-2">
                    <Avatar size={32} className="!bg-primary-50 !text-xs !font-semibold !text-primary-700">
                      {displayName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                    </Avatar>
                    <span className="text-[13px] text-gray-700">{displayName}</span>
                  </div>
                );
              },
            },
            { accessorKey: 'views', header: 'Views', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{(info.row?.original?.views ?? 0).toLocaleString()}</p> },
            { accessorKey: 'likes', header: 'Likes', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{info.row?.original?.likes ?? 0}</p> },
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
        destroyOnClose
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

      <Drawer
        isOpen={showDetailsDrawer}
        onClose={closeDetailsDrawer}
        destroyOnClose
        title={
          <div className="pr-6">
            <h2 className="m-0 font-serif text-xl text-gray-900">
              News details
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
              Full profile for {selectedArticle?.title || 'this article'}
            </p>
          </div>
        }
        position="right"
        width={600}
      >
        <NewsDetails
          news={selectedArticle}
          onClose={closeDetailsDrawer}
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
