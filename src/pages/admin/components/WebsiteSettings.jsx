import { useState } from 'react';
import { Save, Upload, Eye, Edit, Trash2, Plus, Globe, Mail, Phone, MapPin, Settings } from 'lucide-react';
import { Button, ColorPicker, Image as AntImage, Radio, Switch } from 'antd';

export default function WebsiteSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Bright Future Community Network',
    tagline: 'Forward Together',
    description: 'BFCN is a community-focused organization dedicated to community development, youth empowerment, education, and practical community transformation.',
    email: 'info@bfcn.org',
    phone: '+234 800 000 0000',
    address: 'Ogbomoso, Oyo State, Nigeria',
    socialMedia: {
      facebook: 'https://facebook.com/bfcn',
      twitter: 'https://twitter.com/bfcn',
      instagram: 'https://instagram.com/bfcn',
      youtube: 'https://youtube.com/bfcn'
    },
    notifications: {
      emailNotifications: true,
      membershipAlerts: true,
      eventReminders: true,
      donationUpdates: true
    },
    appearance: {
      primaryColor: '#2e7d32',
      accentColor: '#D4A017',
      logoUrl: '/images/bfcn-logo.png',
      faviconUrl: '/favicon.svg'
    },
    seo: {
      metaTitle: 'Bright Future Community Network - Forward Together',
      metaDescription: 'Join BFCN in building stronger communities through development, education, and empowerment programs in Ogbomoso and beyond.',
      keywords: 'community development, youth empowerment, education, BFCN, Ogbomoso, nonprofit',
      googleAnalytics: 'GA-XXXXXXXXX'
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'appearance', label: 'Appearance', icon: Eye },
    { id: 'seo', label: 'SEO & Analytics', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Mail }
  ];

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    // Implementation for saving settings
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleDirectChange('siteName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
        <input
          type="text"
          value={settings.tagline}
          onChange={(e) => handleDirectChange('tagline', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.description}
          onChange={(e) => handleDirectChange('description', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
            <AntImage src={settings.appearance.logoUrl} alt="Logo" preview={false} className="!w-12 !h-12 object-contain" />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload size={16} />
            Upload New Logo
          </button>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleDirectChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => handleDirectChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={settings.address}
          onChange={(e) => handleDirectChange('address', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h4>
        <div className="space-y-4">
          {Object.entries(settings.socialMedia).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {platform}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => handleSettingChange('socialMedia', platform, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                placeholder={`https://${platform}.com/bfcn`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <div className="flex items-center gap-3">
            <ColorPicker value={settings.appearance.primaryColor} onChange={(_, hex) => handleSettingChange('appearance', 'primaryColor', hex)} showText />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
          <div className="flex items-center gap-3">
            <ColorPicker value={settings.appearance.accentColor} onChange={(_, hex) => handleSettingChange('appearance', 'accentColor', hex)} showText />
            <input
              type="text"
              value={settings.appearance.accentColor}
              onChange={(e) => handleSettingChange('appearance', 'accentColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
            <img src={settings.appearance.faviconUrl} alt="Favicon" className="w-6 h-6" />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload size={16} />
            Upload Favicon
          </button>
          <p className="text-sm text-gray-500">Recommended: 32x32 pixels, ICO or PNG format</p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Preview</h4>
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: settings.appearance.primaryColor }}
              ></div>
              <div>
                <h5 className="font-semibold text-gray-900">{settings.siteName}</h5>
                <p className="text-sm" style={{ color: settings.appearance.accentColor }}>
                  {settings.tagline}
                </p>
              </div>
            </div>
            <button 
              className="px-4 py-2 text-white rounded-lg text-sm font-medium"
              style={{ backgroundColor: settings.appearance.primaryColor }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
        <input
          type="text"
          value={settings.seo.metaTitle}
          onChange={(e) => handleSettingChange('seo', 'metaTitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          maxLength="60"
        />
        <p className="text-sm text-gray-500 mt-1">{settings.seo.metaTitle.length}/60 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={settings.seo.metaDescription}
          onChange={(e) => handleSettingChange('seo', 'metaDescription', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          maxLength="160"
        />
        <p className="text-sm text-gray-500 mt-1">{settings.seo.metaDescription.length}/160 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
        <input
          type="text"
          value={settings.seo.keywords}
          onChange={(e) => handleSettingChange('seo', 'keywords', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          placeholder="Separate keywords with commas"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
        <input
          type="text"
          value={settings.seo.googleAnalytics}
          onChange={(e) => handleSettingChange('seo', 'googleAnalytics', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
          placeholder="GA-XXXXXXXXX"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">SEO Preview</h4>
        <div className="space-y-1">
          <div className="text-blue-600 text-lg hover:underline cursor-pointer">
            {settings.seo.metaTitle}
          </div>
          <div className="text-green-600 text-sm">
            https://bfcn.org
          </div>
          <div className="text-gray-600 text-sm">
            {settings.seo.metaDescription}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h4>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-sm text-gray-500">
                  {key === 'emailNotifications' && 'Receive admin notifications via email'}
                  {key === 'membershipAlerts' && 'Get notified of new member registrations'}
                  {key === 'eventReminders' && 'Receive reminders about upcoming events'}
                  {key === 'donationUpdates' && 'Get notified of new donations and contributions'}
                </p>
              </div>
              <Switch checked={value} onChange={(checked) => handleSettingChange('notifications', key, checked)} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Frequency</h4>
        <Radio.Group defaultValue="immediate" className="flex flex-col gap-3">
          <Radio value="immediate">Immediate</Radio>
          <Radio value="daily">Daily digest</Radio>
          <Radio value="weekly">Weekly summary</Radio>
        </Radio.Group>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'seo': return renderSEOSettings();
      case 'notifications': return renderNotificationSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
          <p className="text-gray-600">Configure your website appearance and functionality</p>
        </div>
        <Button type="primary" size="large" icon={<Save size={18} />} onClick={saveSettings}>Save Changes</Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Preview Website</h4>
              <p className="text-sm text-gray-600">View live website</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Upload size={20} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Backup Settings</h4>
              <p className="text-sm text-gray-600">Export configuration</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Advanced Settings</h4>
              <p className="text-sm text-gray-600">Database & cache</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
