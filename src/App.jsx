import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { Shield } from 'lucide-react';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './pages/admin/Login';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Leadership from './pages/Leadership/Leadership';
import Contact from './pages/Contact/Contact';
import Programmes from './pages/Programmes/Programmes';
import Projects from './pages/Projects/Projects';
import Events from './pages/Events/Events';
import News from './pages/News/News';
import Gallery from './pages/Gallery/Gallery';
import Join from './pages/Join/Join';
import Volunteer from './pages/Volunteer/Volunteer';
import Support from './pages/Support/Support';
import CommunityIdeas from './pages/CommunityIdeas/CommunityIdeas';
import Transparency from './pages/Transparency/Transparency';
import { EmptyState, Loader } from './components/ui';

const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const Members = lazy(() => import('./pages/admin/Members'));
const Volunteers = lazy(() => import('./pages/admin/Volunteers'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminProgrammes = lazy(() => import('./pages/admin/Programmes'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const AdminNews = lazy(() => import('./pages/admin/News'));
const AdminGallery = lazy(() => import('./pages/admin/Gallery'));
const AdminIdeas = lazy(() => import('./pages/admin/Ideas'));
const Messages = lazy(() => import('./pages/admin/Messages'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const Settings = lazy(() => import('./pages/admin/Settings'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AdminFallback({ title = 'Coming soon' }) {
  return (
    <EmptyState
      icon={Shield}
      title={title}
      description="This section is loading. If the placeholder persists, the module is being built in subsequent tasks."
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#17603f',
            colorInfo: '#17603f',
            colorSuccess: '#24774f',
            colorWarning: '#d19b2a',
            colorError: '#c2412d',
            colorLink: '#17603f',
            colorText: '#151a17',
            colorTextSecondary: '#6e786f',
            colorBorder: '#e2e6e1',
            colorBorderSecondary: '#eff1ee',
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
            colorBgLayout: '#f7f8f6',
            colorItemBg: '#ffffff',
            colorItemBgHover: '#f7f8f6',
            colorItemBgSelected: '#eff7f2',
            colorItemText: '#151a17',
            colorItemTextSelected: '#114a31',
            borderRadius: 12,
            borderRadiusLG: 16,
            borderRadiusSM: 8,
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
            fontSize: 14,
            controlHeight: 38,
            boxShadow: '0 1px 2px rgba(21,26,23,0.04), 0 4px 16px rgba(21,26,23,0.05)',
            boxShadowSecondary: '0 2px 4px rgba(21,26,23,0.04), 0 18px 40px -12px rgba(21,26,23,0.18)',
          },
          components: {
            Button: {
              borderRadius: 999,
              borderRadiusLG: 999,
              borderRadiusSM: 999,
              controlHeightLG: 48,
              paddingInlineLG: 26,
              fontWeight: 600,
              primaryShadow: 'none',
              defaultShadow: 'none',
              defaultBorderColor: '#c9cfc8',
              defaultColor: '#151a17',
            },
            Input: {
              activeBorderColor: '#17603f',
              hoverBorderColor: '#86c0a0',
              activeShadow: '0 0 0 3px rgba(23, 96, 63, 0.12)',
              controlHeightLG: 46,
            },
            Select: {
              optionSelectedBg: '#eff7f2',
              controlHeightLG: 46,
              selectorBg: '#ffffff',
              multipleItemBg: '#eff7f2',
              multipleItemBorderColor: '#b9dcc8',
              optionActiveBg: '#f7f8f6',
              optionColor: '#151a17',
              optionSelectedColor: '#114a31',
              colorTextPlaceholder: '#9aa39b',
              colorTextQuaternary: '#6e786f',
            },
            Card: {
              borderRadiusLG: 20,
            },
            Modal: {
              borderRadiusLG: 20,
            },
            Tag: {
              borderRadiusSM: 999,
            },
            Pagination: {
              itemActiveBg: '#eff7f2',
              itemSize: 32,
            },
            Table: {
              headerBg: '#f7f8f6',
              headerColor: '#515b53',
              rowHoverBg: '#f7f8f6',
              borderColor: '#eff1ee',
              headerSplitColor: 'transparent',
              cellPaddingBlock: 14,
              cellPaddingInline: 18,
            },
          },
        }}
      >
        <BrowserRouter>
          <Routes>
          {/* Public website */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="programmes" element={<Programmes />} />
            <Route path="projects" element={<Projects />} />
            <Route path="events" element={<Events />} />
            <Route path="news" element={<News />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="join" element={<Join />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="support" element={<Support />} />
            <Route path="community-ideas" element={<CommunityIdeas />} />
            <Route path="transparency" element={<Transparency />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader fullPage text="Loading dashboard..." />}>
                  <DashboardOverview />
                </Suspense>
              }
            />
            <Route
              path="members"
              element={
                <Suspense fallback={<AdminFallback title="Loading members..." />}>
                  <Members />
                </Suspense>
              }
            />
            <Route
              path="volunteers"
              element={
                <Suspense fallback={<AdminFallback title="Loading volunteers..." />}>
                  <Volunteers />
                </Suspense>
              }
            />
            <Route
              path="projects"
              element={
                <Suspense fallback={<AdminFallback title="Loading projects..." />}>
                  <AdminProjects />
                </Suspense>
              }
            />
            <Route
              path="programmes"
              element={
                <Suspense fallback={<AdminFallback title="Loading programmes..." />}>
                  <AdminProgrammes />
                </Suspense>
              }
            />
            <Route
              path="events"
              element={
                <Suspense fallback={<AdminFallback title="Loading events..." />}>
                  <AdminEvents />
                </Suspense>
              }
            />
            <Route
              path="news"
              element={
                <Suspense fallback={<AdminFallback title="Loading news..." />}>
                  <AdminNews />
                </Suspense>
              }
            />
            <Route
              path="gallery"
              element={
                <Suspense fallback={<AdminFallback title="Loading gallery..." />}>
                  <AdminGallery />
                </Suspense>
              }
            />
            <Route
              path="ideas"
              element={
                <Suspense fallback={<AdminFallback title="Loading community ideas..." />}>
                  <AdminIdeas />
                </Suspense>
              }
            />
            <Route
              path="messages"
              element={
                <Suspense fallback={<AdminFallback title="Loading messages..." />}>
                  <Messages />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<AdminFallback title="Loading reports..." />}>
                  <Reports />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<AdminFallback title="Loading settings..." />}>
                  <Settings />
                </Suspense>
              }
            />
          </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
