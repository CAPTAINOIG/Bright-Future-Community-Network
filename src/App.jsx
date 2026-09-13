import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Shield } from 'lucide-react';
import { Loader, EmptyState, ToastProvider } from './components/ui';
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
            colorPrimary: '#427456',
            colorInfo: '#427456',
            colorSuccess: '#427456',
            colorWarning: '#d68e42',
            colorText: '#17231d',
            colorTextSecondary: '#708078',
            colorBorder: '#dfe3d9',
            colorBgContainer: '#ffffff',
            borderRadius: 12,
            fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
          },
          components: {
            Button: {
              borderRadius: 10,
              controlHeightLG: 44,
              fontWeight: 600,
            },
            Input: {
              activeBorderColor: '#427456',
              hoverBorderColor: '#7da489',
              controlHeightLG: 44,
            },
            Select: {
              optionSelectedBg: '#edf5ed',
              controlHeightLG: 44,
            },
            Pagination: {
              itemActiveBg: '#edf5ed',
              itemSize: 32,
            },
            Table: {
              headerBg: '#f3f6f1',
              headerColor: '#53635b',
              rowHoverBg: '#f7faf6',
              borderColor: '#e7ebe3',
              headerSplitColor: 'transparent',
              cellPaddingBlock: 15,
              cellPaddingInline: 18,
            },
          },
        }}
      >
        <BrowserRouter>
          <ToastProvider />
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
