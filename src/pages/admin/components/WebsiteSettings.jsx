import { useState } from 'react';
import { Save, Upload, Eye, Globe, Mail, Phone, MapPin, Settings } from 'lucide-react';
import { Button, ColorPicker, Image as AntImage, Input, Radio, Switch } from 'antd';
import { PageIntro, Panel, SectionLabel } from './AdminUI';

/** Labelled form row (module level so inputs keep focus between renders). */
const Field = ({ label, hint, children, className = '' }) => (
  <div className={className}>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
    {children}
    {hint && <p className="m-0 mt-1.5 text-xs text-gray-500">{hint}</p>}
  </div>
);


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
      primaryColor: '#17603f',
      accentColor: '#d19b2a',
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
    { id: 'contact', label: 'Contact info', icon: Phone },
    { id: 'appearance', label: 'Appearance', icon: Eye },
    { id: 'seo', label: 'SEO & analytics', icon: Globe },
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
      <SectionLabel>Identity</SectionLabel>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Site name">
          <Input
            size="large"
            value={settings.siteName}
            onChange={(e) => handleDirectChange('siteName', e.target.value)}
          />
        </Field>

        <Field label="Tagline">
          <Input
            size="large"
            value={settings.tagline}
            onChange={(e) => handleDirectChange('tagline', e.target.value)}
          />
        </Field>

        <Field label="Site description" className="md:col-span-2">
          <Input.TextArea
            value={settings.description}
            onChange={(e) => handleDirectChange('description', e.target.value)}
            rows={4}
          />
        </Field>
      </div>

      <Field label="Site logo">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-gray-200 bg-gray-50">
            <AntImage src={settings.appearance.logoUrl} alt="Logo" preview={false} className="!h-12 !w-12 object-contain" />
          </div>
          <Button icon={<Upload size={16} />}>
            Upload new logo
          </Button>
        </div>
      </Field>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <SectionLabel>Contact details</SectionLabel>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Email address">
          <Input
            size="large"
            type="email"
            prefix={<Mail size={16} className="text-gray-400" />}
            value={settings.email}
            onChange={(e) => handleDirectChange('email', e.target.value)}
          />
        </Field>

        <Field label="Phone number">
          <Input
            size="large"
            type="tel"
            prefix={<Phone size={16} className="text-gray-400" />}
            value={settings.phone}
            onChange={(e) => handleDirectChange('phone', e.target.value)}
          />
        </Field>

        <Field label="Address" className="md:col-span-2">
          <Input.TextArea
            value={settings.address}
            onChange={(e) => handleDirectChange('address', e.target.value)}
            rows={3}
          />
        </Field>
      </div>

      <SectionLabel className="pt-2">Social media links</SectionLabel>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Object.entries(settings.socialMedia).map(([platform, url]) => (
          <div key={platform}>
            <label className="mb-1.5 block text-sm font-medium capitalize text-gray-700">
              {platform}
            </label>
            <Input
              size="large"
              type="url"
              value={url}
              onChange={(e) => handleSettingChange('socialMedia', platform, e.target.value)}
              placeholder={`https://${platform}.com/bfcn`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <SectionLabel>Brand colours</SectionLabel>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Primary color">
          <div className="flex items-center gap-3">
            <ColorPicker size="large" value={settings.appearance.primaryColor} onChange={(_, hex) => handleSettingChange('appearance', 'primaryColor', hex)} />
            <Input
              size="large"
              value={settings.appearance.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </Field>

        <Field label="Accent color">
          <div className="flex items-center gap-3">
            <ColorPicker size="large" value={settings.appearance.accentColor} onChange={(_, hex) => handleSettingChange('appearance', 'accentColor', hex)} />
            <Input
              size="large"
              value={settings.appearance.accentColor}
              onChange={(e) => handleSettingChange('appearance', 'accentColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </Field>
      </div>

      <Field label="Favicon" hint="Recommended: 32x32 pixels, ICO or PNG format">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-gray-50">
            <img src={settings.appearance.faviconUrl} alt="Favicon" className="h-6 w-6" />
          </div>
          <Button icon={<Upload size={16} />}>
            Upload favicon
          </Button>
        </div>
      </Field>

      <div className="space-y-3">
        <SectionLabel>Preview</SectionLabel>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          {/* Inline colours below intentionally reflect the user-selected brand values. */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: settings.appearance.primaryColor }}
              ></div>
              <div>
                <h5 className="m-0 text-sm font-semibold text-gray-900">{settings.siteName}</h5>
                <p className="m-0 text-sm" style={{ color: settings.appearance.accentColor }}>
                  {settings.tagline}
                </p>
              </div>
            </div>
            <button
              className="rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: settings.appearance.primaryColor }}
            >
              Sample button
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <SectionLabel>Search metadata</SectionLabel>
      <Field label="Meta title" hint={`${settings.seo.metaTitle.length}/60 characters`}>
        <Input
          size="large"
          value={settings.seo.metaTitle}
          onChange={(e) => handleSettingChange('seo', 'metaTitle', e.target.value)}
          maxLength={60}
        />
      </Field>

      <Field label="Meta description" hint={`${settings.seo.metaDescription.length}/160 characters`}>
        <Input.TextArea
          value={settings.seo.metaDescription}
          onChange={(e) => handleSettingChange('seo', 'metaDescription', e.target.value)}
          rows={3}
          maxLength={160}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Keywords">
          <Input
            size="large"
            value={settings.seo.keywords}
            onChange={(e) => handleSettingChange('seo', 'keywords', e.target.value)}
            placeholder="Separate keywords with commas"
          />
        </Field>

        <Field label="Google Analytics ID">
          <Input
            size="large"
            value={settings.seo.googleAnalytics}
            onChange={(e) => handleSettingChange('seo', 'googleAnalytics', e.target.value)}
            placeholder="GA-XXXXXXXXX"
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h4 className="m-0 mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">SEO preview</h4>
        <div className="space-y-1 rounded-xl border border-gray-200 bg-white p-4">
          <div className="cursor-pointer text-lg text-primary-700 hover:underline">
            {settings.seo.metaTitle}
          </div>
          <div className="text-sm text-primary-500">
            https://bfcn.org
          </div>
          <div className="text-sm text-gray-500">
            {settings.seo.metaDescription}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <SectionLabel>Email notifications</SectionLabel>
        <div className="divide-y divide-gray-100">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-900 first-letter:uppercase">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="m-0 mt-0.5 text-[13px] text-gray-500">
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

      <div className="space-y-4">
        <SectionLabel>Notification frequency</SectionLabel>
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
      <PageIntro
        title="Website settings"
        description="Configure your website appearance and functionality"
        actions={<Button type="primary" size="large" icon={<Save size={17} />} onClick={saveSettings}>Save changes</Button>}
      />

      {/* Tabs */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-2 md:px-4">
          <nav className="-mb-px flex overflow-x-auto" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-primary-600' : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-5 md:p-8">
          <div className="max-w-3xl">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <Panel title="Quick actions">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: 'Preview website', description: 'View live website', icon: Eye },
            { label: 'Backup settings', description: 'Export configuration', icon: Upload },
            { label: 'Advanced settings', description: 'Database & cache', icon: Settings },
          ].map(({ label, description, icon: Icon }) => (
            <button key={label} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-primary-200 hover:bg-primary-50/40">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">{label}</span>
                <span className="block text-[13px] text-gray-500">{description}</span>
              </span>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}
