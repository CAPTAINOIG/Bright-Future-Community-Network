import { useState } from 'react';
import { Plus, Calendar, Eye, Edit, Trash2, Share2, Image, Tag } from 'lucide-react';
import AdminFilterBar from '../../../components/admin/AdminFilterBar';

const articles = [
  {
    id: 1,
    title: 'BFCN Launches New Community Health Initiative',
    excerpt: 'A comprehensive health program targeting rural communities in Ogbomoso',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Sarah Johnson',
    category: 'Health',
    status: 'Published',
    publishDate: '2023-06-15T09:00:00',
    views: 1250,
    featured: true,
    tags: ['health', 'community', 'initiative']
  },
  {
    id: 2,
    title: 'Youth Leadership Program Graduates 50 Participants',
    excerpt: 'Young leaders equipped with skills to drive community development',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Michael Chen',
    category: 'Education',
    status: 'Published',
    publishDate: '2023-06-10T14:30:00',
    views: 890,
    featured: false,
    tags: ['youth', 'leadership', 'education']
  },
  {
    id: 3,
    title: 'Annual Fundraising Gala Raises ₦2.5 Million',
    excerpt: 'Community comes together to support ongoing development projects',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'David Ola',
    category: 'Events',
    status: 'Draft',
    publishDate: null,
    views: 0,
    featured: false,
    tags: ['fundraising', 'gala', 'community']
  },
  {
    id: 4,
    title: 'Environmental Conservation Project Wins National Award',
    excerpt: 'BFCN recognized for outstanding environmental stewardship',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Dr. Adunni Bello',
    category: 'Environment',
    status: 'Published',
    publishDate: '2023-05-28T11:15:00',
    views: 2100,
    featured: true,
    tags: ['environment', 'award', 'conservation']
  }
];

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Archived': 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`;
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'Health': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Events': 'bg-purple-100 text-purple-800',
      'Environment': 'bg-emerald-100 text-emerald-800',
      'Community': 'bg-orange-100 text-orange-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${colors[category]}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const editArticle = (article) => {
    setSelectedArticle(article);
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News & Blog Management</h2>
          <p className="text-gray-600">Create and manage news articles and blog posts</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          New Article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Articles', value: '48', color: 'bg-blue-500' },
          { label: 'Published', value: '35', color: 'bg-green-500' },
          { label: 'Drafts', value: '8', color: 'bg-yellow-500' },
          { label: 'Total Views', value: '15.2K', color: 'bg-purple-500' }
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

      <AdminFilterBar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Search articles..." filters={[{ key: 'status', label: 'statuses', value: statusFilter, onChange: setStatusFilter, options: ['All', 'Published', 'Draft', 'Scheduled', 'Archived'] }, { key: 'category', label: 'categories', value: categoryFilter, onChange: setCategoryFilter, options: ['All', 'Health', 'Education', 'Events', 'Environment', 'Community'] }]} />

      {/* Articles List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                  <Image size={24} className="text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{article.title}</h3>
                        {article.featured && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>By {article.author}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(article.publishDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {article.views} views
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={getStatusBadge(article.status)}>{article.status}</span>
                      <span className={getCategoryBadge(article.category)}>{article.category}</span>
                      
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {article.tags.slice(0, 2).join(', ')}
                            {article.tags.length > 2 && ` +${article.tags.length - 2}`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => editArticle(article)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Share2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Article</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-lg"
                  placeholder="Article title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" 
                  rows="2"
                  placeholder="Brief description of the article..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Events">Events</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Separate tags with commas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <Image size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image or drag and drop</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" 
                  rows="12"
                  placeholder="Write your article content here..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {showEditModal && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Article</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  defaultValue={selectedArticle.title}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea 
                  defaultValue={selectedArticle.excerpt}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" 
                  rows="2"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    defaultValue={selectedArticle.category}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Events">Events</option>
                    <option value="Environment">Environment</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    defaultValue={selectedArticle.status}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
                  <select 
                    defaultValue={selectedArticle.featured.toString()}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input 
                  type="text" 
                  defaultValue={selectedArticle.tags?.join(', ')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="Separate tags with commas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea 
                  defaultValue={selectedArticle.content}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500" 
                  rows="12"
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Update & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
