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
  PlayCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Button, Input, Tag, Avatar } from 'antd';
import MediaForm from './MediaForm';

const mediaItems = [
  { id: 1, title: '2025 Youth Leadership Summit Opening', caption: 'Group photo at the annual youth summit opening ceremony in Abuja.', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=70', type: 'Image', category: 'Events', tags: ['youth', 'summit', '2025', 'abuja'], altText: 'Group photo of youth summit attendees smiling', credits: 'BFCN Media Team', uploadedBy: 'Fatima Hassan', uploadDate: '2025-10-01', likes: 218, views: 1450 },
  { id: 2, title: 'Free Medical Outreach — Lagos Mainland', caption: 'Volunteer doctors attending to community members during the free medical outreach.', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70', type: 'Image', category: 'Outreach', tags: ['healthcare', 'lagos', 'outreach'], altText: 'Doctors attending to a patient', credits: 'Dr. Joy Nwosu', uploadedBy: 'Dr. Joy Nwosu', uploadDate: '2025-09-28', likes: 312, views: 2240 },
  { id: 3, title: 'BFCN Centre Building — New Wing Commissioning', caption: 'Ribbon-cutting ceremony for the new community learning center wing.', url: 'https://images.unsplash.com/photo-1604480133117-2e4d792723d0?auto=format&fit=crop&w=800&q=70', type: 'Image', category: 'Projects', tags: ['infrastructure', 'centre', 'building'], altText: 'Ribbon cutting ceremony', credits: 'Chinedu Okoro', uploadedBy: 'Chinedu Okoro', uploadDate: '2025-09-15', likes: 540, views: 3100 },
  { id: 4, title: 'Skills Acquisition — Tailoring Class Highlights', caption: 'Video highlights from week 3 of the skills acquisition tailoring program.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'Video', category: 'Programmes', tags: ['skills', 'tailoring', 'youth'], altText: 'Video: tailoring class highlights', credits: 'Aisha Yakubu', uploadedBy: 'Aisha Yakubu', uploadDate: '2025-09-01', likes: 145, views: 890 },
  { id: 5, title: 'Community Town Hall Meeting — Port Harcourt', caption: 'Wide shot of attendees at the quarterly community town hall.', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=70', type: 'Image', category: 'Community', tags: ['townhall', 'port-harcourt', 'meeting'], altText: 'Community town hall meeting crowd', credits: 'Grace Adeyemi', uploadedBy: 'Grace Adeyemi', uploadDate: '2025-08-25', likes: 192, views: 1680 },
  { id: 6, title: 'Women in Agribusiness Farm Visit', caption: 'Visit to the cooperative farm where women in agribusiness grow crops.', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=70', type: 'Image', category: 'Projects', tags: ['agriculture', 'women', 'farm'], altText: 'Women working on a farm', credits: 'Halima Bello', uploadedBy: 'Halima Bello', uploadDate: '2025-08-10', likes: 420, views: 2600 },
];

const typeBadge = (type) => {
  if (type === 'Video') return { className: 'bg-purple-100 text-purple-800', icon: PlayCircleIcon };
  if (type === 'Document') return { className: 'bg-blue-100 text-blue-800', icon: PhotoIcon };
  return { className: 'bg-green-100 text-green-800', icon: PhotoIcon };
};

export default function GalleryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showMediaDrawer, setShowMediaDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const filteredMedia = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return mediaItems.filter((m) => {
      const matchesSearch =
        !term ||
        m.title.toLowerCase().includes(term) ||
        m.caption.toLowerCase().includes(term) ||
        m.tags.some((t) => t.toLowerCase().includes(term)) ||
        m.uploadedBy.toLowerCase().includes(term);
      const matchesType = typeFilter === 'All' || m.type === typeFilter;
      const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, typeFilter, categoryFilter]);

  const totalMedia = mediaItems.length;
  const totalImages = mediaItems.filter((m) => m.type === 'Image').length;
  const totalVideos = mediaItems.filter((m) => m.type === 'Video').length;
  const totalViews = mediaItems.reduce((sum, m) => sum + m.views, 0);

  const openAddMedia = () => {
    setSelectedMedia(null);
    setShowMediaDrawer(true);
  };

  const handleEdit = (media) => {
    setSelectedMedia(media);
    setShowMediaDrawer(true);
  };

  const closeMediaDrawer = () => {
    setShowMediaDrawer(false);
    setTimeout(() => setSelectedMedia(null), 300);
  };

  const handleFormSubmitted = () => {
    closeMediaDrawer();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success('Media deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedMedia(null);
    } catch {
      toast.error('Failed to delete media.');
    } finally {
      setIsDeleting(false);
    }
  };

  const mediaActions = (media) => [
    { label: 'Preview', icon: EyeIcon, onClick: () => toast.info(`Previewing ${media.title}`) },
    { label: 'Edit Media', icon: PencilIcon, onClick: () => handleEdit(media) },
    {
      label: 'Delete Media',
      icon: TrashIcon,
      onClick: () => {
        setSelectedMedia(media);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ media }) => {
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
            {mediaActions(media).map((action, idx) => (
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
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Upload and manage BFCN media gallery</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddMedia}>
            Upload Media
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
          { label: 'Total Media', value: totalMedia.toLocaleString(), change: 'items total', color: 'bg-blue-500' },
          { label: 'Images', value: totalImages.toLocaleString(), change: 'photos', color: 'bg-green-500' },
          { label: 'Videos', value: totalVideos.toLocaleString(), change: 'clips', color: 'bg-purple-500' },
          { label: 'Total Views', value: totalViews.toLocaleString(), change: 'all time', color: 'bg-orange-500' },
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
            placeholder="Search media by title, caption, tags, or uploader..."
            prefix={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setTypeOpen(!typeOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {typeFilter === 'All' ? 'All types' : typeFilter}
              </button>
              {typeOpen && (
                <div className="absolute top-full mt-1 left-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Image', 'Video', 'Document', 'Audio'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTypeFilter(option);
                        setTypeOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        typeFilter === option
                          ? 'bg-[#427456] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {option === 'All' ? 'All types' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {categoryFilter === 'All' ? 'All categories' : categoryFilter}
              </button>
              {categoryOpen && (
                <div className="absolute top-full mt-1 left-0 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  {['All', 'Events', 'Programmes', 'Projects', 'Community', 'Outreach', 'Training'].map((option) => (
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
            <Button size="large" icon={<FunnelIcon className="h-5 w-5" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              onClick={() => toast.success('Gallery exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="shadow-sm">
        <SimpleTable
          data={filteredMedia}
          keyField="id"
          emptyTitle="No media items found"
          emptyDescription="Try adjusting your search or filter criteria."
          columns={[
            {
              accessorKey: 'title',
              header: 'Media',
              cell: (info) => {
                const m = info.row?.original;
                const TypeIcon = typeBadge(m?.type).icon;
                return (
                  <div className="flex items-center gap-3">
                    <Avatar shape="square" size={48} src={m?.type === 'Image' ? m?.url : undefined} style={{ backgroundColor: m?.type === 'Video' ? '#7e57c6' : '#427456' }}>
                      {m?.type !== 'Image' && <TypeIcon className="h-5 w-5 text-white" />}
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#17231d] max-w-[280px] truncate">{m?.title}</p>
                      <p className="text-xs text-[#708078] m-0">by {m?.uploadedBy} · {new Date(m?.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                );
              },
            },
            {
              accessorKey: 'type',
              header: 'Type',
              cell: (info) => {
                const m = info.row?.original;
                const meta = typeBadge(m?.type);
                return <span className={`px-2 py-1 text-xs font-medium rounded-full ${meta.className}`}>{m?.type}</span>;
              },
            },
            {
              accessorKey: 'category',
              header: 'Category',
              cell: (info) => <Tag color="blue">{info.row?.original?.category}</Tag>,
            },
            {
              accessorKey: 'tags',
              header: 'Tags',
              cell: (info) => {
                const m = info.row?.original;
                return (
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {m?.tags.slice(0, 3).map((t, i) => <Tag key={i} color="green" style={{ margin: 2 }}>{t}</Tag>)}
                  </div>
                );
              },
            },
            { accessorKey: 'views', header: 'Views', cell: (info) => <p className="text-sm text-[#34443a]">{info.row?.original?.views.toLocaleString()}</p> },
            { accessorKey: 'likes', header: 'Likes', cell: (info) => <p className="text-sm text-[#34443a]">{info.row?.original?.likes.toLocaleString()}</p> },
            {
              id: 'actions',
              header: 'Actions',
              cell: (info) => <ActionMenu media={info.row?.original} />,
            },
          ]}
        />
      </motion.div>

      <Drawer
        isOpen={showMediaDrawer}
        onClose={closeMediaDrawer}
        title={
          <div className="pr-6">
            <h2 className="text-lg font-serif font-bold m-0 text-[#17231d]">
              {selectedMedia ? 'Edit Media' : 'Upload New Media'}
            </h2>
            <p className="text-xs text-[#708078] mt-1 mb-0 leading-relaxed">
              {selectedMedia ? 'Update media details' : 'Add photos, videos, or documents to the public gallery'}
            </p>
          </div>
        }
        position="right"
        width={640}
      >
        <MediaForm
          media={selectedMedia}
          onClose={closeMediaDrawer}
          onSubmitted={handleFormSubmitted}
        />
      </Drawer>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMedia(null);
        }}
        onConfirm={handleDelete}
        title="Delete Media"
        message={`Are you sure you want to delete "${selectedMedia?.title}"? This media will be removed from the public gallery. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
