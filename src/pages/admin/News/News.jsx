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
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag, Avatar } from 'antd';
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
    Published: { className: 'bg-green-100 text-green-800' },
    Draft: { className: 'bg-gray-100 text-gray-800' },
    Archived: { className: 'bg-purple-100 text-purple-800' },
  };
  return `px-2 py-1 text-xs font-medium rounded-full ${map[status]?.className ?? ''}`;
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
    { label: 'Preview Article', icon: EyeIcon, onClick: () => toast.info(`Previewing: ${article.title}`) },
    { label: 'Edit Article', icon: PencilIcon, onClick: () => handleEdit(article) },
    {
      label: 'Delete Article',
      icon: TrashIcon,
      onClick: () => {
        setSelectedArticle(article);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ article }) => {
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
            {newsActions(article).map((action, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
          <p className="text-gray-600">Publish and manage BFCN news articles</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddArticle}>
            New Article
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
          { label: 'Total Articles', value: totalArticles.toLocaleString(), change: 'total posts', color: 'bg-blue-500' },
          { label: 'Published', value: publishedCount, change: 'public articles', color: 'bg-green-500' },
          { label: 'Drafts', value: draftCount, change: 'in progress', color: 'bg-gray-500' },
          { label: 'Total Views', value: totalViews.toLocaleString(), change: 'all time reads', color: 'bg-orange-500' },
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            allowClear
            size="large"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search articles by title, author, or category..."
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
                  {['All', 'Community News', 'Announcement', 'Event Recap', 'Success Story', 'Press Release', 'Opinion', 'Partnership'].map((option) => (
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
                  {['All', 'Published', 'Draft', 'Archived'].map((option) => (
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
              onClick={() => toast.success('Articles exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
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
                    <p className="font-medium text-[#17231d] max-w-[320px] truncate">{a?.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Tag color="blue" style={{ margin: 0 }}>{a?.category}</Tag>
                      <p className="text-xs text-[#708078] m-0 inline-flex items-center gap-1">
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
                    <Avatar size={32} style={{ backgroundColor: '#427456' }}>
                      {a?.author.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                    </Avatar>
                    <span className="text-sm text-[#34443a]">{a?.author}</span>
                  </div>
                );
              },
            },
            { accessorKey: 'views', header: 'Views', cell: (info) => <p className="text-sm text-[#34443a]">{info.row?.original?.views.toLocaleString()}</p> },
            { accessorKey: 'comments', header: 'Comments', cell: (info) => <p className="text-sm text-[#34443a]">{info.row?.original?.comments}</p> },
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
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedArticle ? 'Edit Article' : 'Write New Article'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
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
        title="Delete Article"
        message={`Are you sure you want to delete "${selectedArticle?.title}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
