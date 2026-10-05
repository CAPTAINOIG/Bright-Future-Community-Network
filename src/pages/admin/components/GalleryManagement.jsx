import { useState } from 'react';
import { Download, Upload, Eye, Edit, Trash2, Video } from 'lucide-react';
import { Button, Checkbox, Image, Input, Modal, Select, Upload as AntUpload, Drawer, Form } from 'antd';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const media = [
  {
    id: 1,
    title: 'Community Health Fair 2023',
    type: 'image',
    url: '/images/gallery/health-fair.jpg',
    thumbnail: '/images/gallery/health-fair-thumb.jpg',
    category: 'Events',
    uploadDate: '2023-06-15',
    size: '2.4 MB',
    dimensions: '1920x1080',
    tags: ['health', 'community', 'fair'],
    description: 'Annual community health screening and awareness event'
  },
  {
    id: 2,
    title: 'Youth Leadership Workshop',
    type: 'video',
    url: '/videos/youth-workshop.mp4',
    thumbnail: '/images/gallery/youth-workshop-thumb.jpg',
    category: 'Education',
    uploadDate: '2023-06-10',
    size: '45.2 MB',
    dimensions: '1920x1080',
    duration: '15:30',
    tags: ['youth', 'leadership', 'workshop'],
    description: 'Highlights from the youth leadership development program'
  },
  {
    id: 3,
    title: 'Clean Water Project Launch',
    type: 'image',
    url: '/images/gallery/water-project.jpg',
    thumbnail: '/images/gallery/water-project-thumb.jpg',
    category: 'Projects',
    uploadDate: '2023-05-28',
    size: '3.1 MB',
    dimensions: '1920x1280',
    tags: ['water', 'infrastructure', 'community'],
    description: 'Groundbreaking ceremony for new water infrastructure'
  },
  {
    id: 4,
    title: 'Environmental Conservation Drive',
    type: 'image',
    url: '/images/gallery/environment.jpg',
    thumbnail: '/images/gallery/environment-thumb.jpg',
    category: 'Environment',
    uploadDate: '2023-05-20',
    size: '2.8 MB',
    dimensions: '1920x1080',
    tags: ['environment', 'conservation', 'tree planting'],
    description: 'Community tree planting and clean-up initiative'
  },
  {
    id: 5,
    title: 'Volunteer Training Session',
    type: 'video',
    url: '/videos/volunteer-training.mp4',
    thumbnail: '/images/gallery/volunteer-training-thumb.jpg',
    category: 'Training',
    uploadDate: '2023-05-15',
    size: '28.7 MB',
    dimensions: '1920x1080',
    duration: '8:45',
    tags: ['volunteers', 'training', 'skills'],
    description: 'Training session for new BFCN volunteers'
  },
  {
    id: 6,
    title: 'Annual Fundraising Gala',
    type: 'image',
    url: '/images/gallery/gala.jpg',
    thumbnail: '/images/gallery/gala-thumb.jpg',
    category: 'Events',
    uploadDate: '2023-05-10',
    size: '4.2 MB',
    dimensions: '1920x1280',
    tags: ['gala', 'fundraising', 'celebration'],
    description: 'Moments from our annual fundraising celebration'
  }
];

export default function GalleryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const viewMode = 'grid';
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryBadge = (category) => {
    const colors = {
      'Events': 'bg-purple-100 text-purple-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Projects': 'bg-green-100 text-green-800',
      'Environment': 'bg-emerald-100 text-emerald-800',
      'Training': 'bg-orange-100 text-orange-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[category]}`;
  };

  const formatFileSize = (size) => {
    return size;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(item => item.id));
    }
  };

  const editMedia = (item) => {
    setSelectedMedia(item);
    setShowEditModal(true);
  };

  const deleteMedia = (item) => {
    setSelectedMedia(item);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Manage photos and videos</p>
        </div>
        <Button type="primary" icon={<Upload size={18} />} 
          onClick={() => setShowUploadModal(true)}
        >Upload Media</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Media', value: '156', color: 'bg-blue-500' },
          { label: 'Images', value: '124', color: 'bg-green-500' },
          { label: 'Videos', value: '32', color: 'bg-purple-500' },
          { label: 'Storage Used', value: '2.1 GB', color: 'bg-orange-500' }
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

      {/* Controls */}
      <div>
        <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search media..." filters={[{ key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Events', 'Education', 'Projects', 'Environment', 'Training'] }, { key: 'type', label: 'media types', value: typeFilter, onChange: setTypeFilter, options: [{ value: 'All', label: 'All media' }, { value: 'image', label: 'Images' }, { value: 'video', label: 'Videos' }] }]} />

        {selectedItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{selectedItems.length} items selected</span>
              <div className="flex gap-2">
                <Button icon={<Download size={14} />}>Download</Button>
                <Button danger icon={<Trash2 size={14} />}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Media Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-gray-100">
                <Image 
                  src={item.thumbnail} 
                  alt={item.title}
                  preview
                  className="!w-full !h-full object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Video size={24} className="text-white ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />
                </div>
                {item.type === 'video' && item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={getCategoryBadge(item.category)}>{item.category}</span>
                  <span className="text-xs text-gray-500">{formatFileSize(item.size)}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{formatDate(item.uploadDate)}</span>
                  <span>{item.dimensions}</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" icon={<Eye size={14} />}>View</Button>
                  <Button 
                    icon={<Edit size={14} />} 
                    onClick={() => editMedia(item)}
                    aria-label="Edit media" 
                  />
                  <Button 
                    danger 
                    icon={<Trash2 size={14} />} 
                    onClick={() => deleteMedia(item)}
                    aria-label="Delete media" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedItems.length === filteredMedia.length}
                onChange={selectAllItems}
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredMedia.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />
                  
                  <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                    <Image src={item.thumbnail} alt={item.title} preview={false} className="!w-full !h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className={getCategoryBadge(item.category)}>{item.category}</span>
                          <span>{item.type === 'video' ? 'Video' : 'Image'}</span>
                          <span>{formatFileSize(item.size)}</span>
                          <span>{formatDate(item.uploadDate)}</span>
                          {item.type === 'video' && <span>{item.duration}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button type="text" icon={<Eye size={16} />} aria-label="View media" />
                        <Button 
                          type="text" 
                          icon={<Edit size={16} />} 
                          onClick={() => editMedia(item)}
                          aria-label="Edit media" 
                        />
                        <Button 
                          type="text" 
                          danger 
                          icon={<Trash2 size={16} />} 
                          onClick={() => deleteMedia(item)}
                          aria-label="Delete media" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Media Drawer */}
      <Drawer
        title="Upload Media"
        placement="right"
        onClose={() => setShowUploadModal(false)}
        open={showUploadModal}
        width={600}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="primary" icon={<Upload size={16} />}>
              Upload Files
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <AntUpload.Dragger 
            beforeUpload={() => false} 
            multiple 
            accept="image/*,video/*" 
            showUploadList
            className="mb-6"
          >
            <Upload size={42} className="mx-auto mb-4 text-green-600" />
            <p className="text-base text-gray-900">Drop files here or click to upload</p>
            <p className="text-xs text-gray-500">Supports JPG, PNG, MP4, MOV (max 100MB)</p>
          </AntUpload.Dragger>

          <Form layout="vertical">
            <div className="grid grid-cols-1 gap-4">
              <Form.Item label="Category" required>
                <Select 
                  size="large" 
                  defaultValue="Events"
                  placeholder="Select category"
                >
                  <Select.Option value="Events">Events</Select.Option>
                  <Select.Option value="Education">Education</Select.Option>
                  <Select.Option value="Projects">Projects</Select.Option>
                  <Select.Option value="Environment">Environment</Select.Option>
                  <Select.Option value="Training">Training</Select.Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="Tags">
                <Input 
                  size="large"
                  placeholder="Separate with commas..."
                />
              </Form.Item>
            </div>

            <Form.Item label="Description">
              <Input.TextArea 
                rows={3} 
                placeholder="Brief description of the media..."
              />
            </Form.Item>
          </Form>
        </div>
      </Drawer>

      {/* Edit Media Drawer */}
      <Drawer
        title="Edit Media"
        placement="right"
        onClose={() => setShowEditModal(false)}
        open={showEditModal && selectedMedia}
        width={600}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="primary">
              Save Changes
            </Button>
          </div>
        }
      >
        {selectedMedia && (
          <div className="space-y-6">
            {/* Media Preview */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src={selectedMedia.thumbnail} 
                alt={selectedMedia.title}
                preview
                className="!w-full !h-full object-cover"
              />
              {selectedMedia.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <Video size={32} className="text-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            <Form layout="vertical">
              <Form.Item label="Title" required>
                <Input 
                  size="large"
                  defaultValue={selectedMedia.title}
                  placeholder="Media title"
                />
              </Form.Item>

              <Form.Item label="Description">
                <Input.TextArea 
                  rows={3}
                  defaultValue={selectedMedia.description}
                  placeholder="Brief description of the media..."
                />
              </Form.Item>

              <div className="grid grid-cols-1 gap-4">
                <Form.Item label="Category" required>
                  <Select 
                    size="large" 
                    defaultValue={selectedMedia.category}
                    placeholder="Select category"
                  >
                    <Select.Option value="Events">Events</Select.Option>
                    <Select.Option value="Education">Education</Select.Option>
                    <Select.Option value="Projects">Projects</Select.Option>
                    <Select.Option value="Environment">Environment</Select.Option>
                    <Select.Option value="Training">Training</Select.Option>
                  </Select>
                </Form.Item>
                
                <Form.Item label="Tags">
                  <Input 
                    size="large"
                    defaultValue={selectedMedia.tags?.join(', ')}
                    placeholder="Separate with commas..."
                  />
                </Form.Item>
              </div>

              {/* Media Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Media Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type: <span className="text-gray-900">{selectedMedia.type}</span></p>
                    <p className="text-gray-600">Size: <span className="text-gray-900">{selectedMedia.size}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dimensions: <span className="text-gray-900">{selectedMedia.dimensions}</span></p>
                    {selectedMedia.duration && (
                      <p className="text-gray-600">Duration: <span className="text-gray-900">{selectedMedia.duration}</span></p>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Drawer>

      {/* Delete Media Modal */}
      <Modal
        title="Delete Media"
        open={showDeleteModal}
        onOk={() => {
          // Handle delete logic here
          setShowDeleteModal(false);
          setSelectedMedia(null);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedMedia(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this media file?</p>
        {selectedMedia && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden shrink-0">
                <Image 
                  src={selectedMedia.thumbnail} 
                  alt={selectedMedia.title}
                  preview={false} 
                  className="!w-full !h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{selectedMedia.title}</p>
                <p className="text-sm text-gray-600">{selectedMedia.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{selectedMedia.type}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{selectedMedia.size}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="mt-3 text-sm text-gray-500">This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
