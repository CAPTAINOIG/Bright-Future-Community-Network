import { useMemo, useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { Drawer, ConfirmDialog, toast } from '../../../components/ui';
import SimpleTable from '../../../components/admin/SimpleTable';
import { motion } from 'framer-motion';
import { Avatar, Button, Input, Select, Tooltip } from 'antd';
import { Eye as EyeStatIcon, Film as FilmIcon, Image as ImageIcon, Images as ImagesIcon } from 'lucide-react';
import { PageIntro, StatCard, pillClass } from '../components/AdminUI';
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
  if (type === 'Video') return { className: 'bg-accent-50 text-accent-700 ring-accent-200', icon: PlayCircleIcon };
  if (type === 'Document') return { className: 'bg-gray-100 text-gray-600 ring-gray-200', icon: PhotoIcon };
  return { className: 'bg-primary-50 text-primary-700 ring-primary-200', icon: PhotoIcon };
};

export default function GalleryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showMediaDrawer, setShowMediaDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    { label: 'Edit media', icon: PencilIcon, onClick: () => handleEdit(media) },
    {
      label: 'Delete media',
      icon: TrashIcon,
      onClick: () => {
        setSelectedMedia(media);
        setShowDeleteDialog(true);
      },
    },
  ];

  const ActionMenu = ({ media }) => (
    <div className="flex items-center gap-0.5">
      {mediaActions(media).map((action, idx) => (
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
        title="Gallery management"
        description="Upload and manage BFCN media gallery"
        actions={
          <Button type="primary" size="large" icon={<PlusIcon className="h-5 w-5" />} onClick={openAddMedia}>
            Upload media
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
          { label: 'Total media', value: totalMedia.toLocaleString(), change: 'Items total', icon: ImagesIcon },
          { label: 'Images', value: totalImages.toLocaleString(), change: 'Photos', icon: ImageIcon },
          { label: 'Videos', value: totalVideos.toLocaleString(), change: 'Clips', icon: FilmIcon, tone: 'accent' },
          { label: 'Total views', value: totalViews.toLocaleString(), change: 'All time', icon: EyeStatIcon, tone: 'accent' },
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
            placeholder="Search media by title, caption, tags, or uploader..."
            prefix={<MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-400" />}
            className="min-w-0 flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="large"
              value={typeFilter}
              onChange={setTypeFilter}
              className="min-w-44"
              aria-label="Types"
              options={['All', 'Image', 'Video', 'Document', 'Audio'].map((option) => ({ value: option, label: option === 'All' ? 'All types' : option }))}
            />
            <Select
              size="large"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="min-w-44"
              aria-label="Categories"
              options={['All', 'Events', 'Programmes', 'Projects', 'Community', 'Outreach', 'Training'].map((option) => ({ value: option, label: option === 'All' ? 'All categories' : option }))}
            />
            <Button size="large" icon={<FunnelIcon className="h-[18px] w-[18px]" />}>More filters</Button>
            <Button
              size="large"
              icon={<ArrowDownTrayIcon className="h-[18px] w-[18px]" />}
              onClick={() => toast.success('Gallery exported as CSV')}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
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
                    <Avatar shape="square" size={48} src={m?.type === 'Image' ? m?.url : undefined} className={`shrink-0 !rounded-xl ${m?.type === 'Video' ? '!bg-accent-50' : '!bg-primary-50'}`}>
                      {m?.type !== 'Image' && <TypeIcon className={`h-5 w-5 ${m?.type === 'Video' ? 'text-accent-700' : 'text-primary-700'}`} />}
                    </Avatar>
                    <div>
                      <p className="m-0 font-semibold text-gray-900 max-w-[280px] truncate">{m?.title}</p>
                      <p className="m-0 text-xs text-gray-500">by {m?.uploadedBy} · {new Date(m?.uploadDate).toLocaleDateString()}</p>
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
                return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${meta.className}`}>{m?.type}</span>;
              },
            },
            {
              accessorKey: 'category',
              header: 'Category',
              cell: (info) => <span className={pillClass('neutral')}>{info.row?.original?.category}</span>,
            },
            {
              accessorKey: 'tags',
              header: 'Tags',
              cell: (info) => {
                const m = info.row?.original;
                return (
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {m?.tags.slice(0, 3).map((t, i) => <span key={i} className={pillClass('neutral')}>{t}</span>)}
                  </div>
                );
              },
            },
            { accessorKey: 'views', header: 'Views', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{info.row?.original?.views.toLocaleString()}</p> },
            { accessorKey: 'likes', header: 'Likes', cell: (info) => <p className="m-0 text-[13px] text-gray-700">{info.row?.original?.likes.toLocaleString()}</p> },
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
            <h2 className="m-0 font-serif text-xl text-gray-900">
              {selectedMedia ? 'Edit media' : 'Upload new media'}
            </h2>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-gray-500">
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
        title="Delete media"
        message={`Are you sure you want to delete "${selectedMedia?.title}"? This media will be removed from the public gallery. This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}
