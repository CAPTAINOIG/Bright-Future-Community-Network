import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3, Bell, BookOpen, CalendarDays, FolderKanban,
  Images, LayoutDashboard, Lightbulb, LogOut, Menu, MessageSquare, Newspaper,
  Search, Settings2, UserCheck, Users, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Tooltip } from 'antd';
import useAuthStore from '../../store/useAuthStore';
import { toast } from '../../components/ui';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
  { id: 'members', label: 'Members', icon: Users, path: '/admin/members' },
  { id: 'volunteers', label: 'Volunteers', icon: UserCheck, path: '/admin/volunteers' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/admin/projects' },
  { id: 'programmes', label: 'Programmes', icon: BookOpen, path: '/admin/programmes' },
  { id: 'events', label: 'Events', icon: CalendarDays, path: '/admin/events' },
  { id: 'news', label: 'News & blog', icon: Newspaper, path: '/admin/news' },
  { id: 'gallery', label: 'Gallery', icon: Images, path: '/admin/gallery' },
  { id: 'ideas', label: 'Community ideas', icon: Lightbulb, path: '/admin/ideas' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  { id: 'settings', label: 'Website settings', icon: Settings2, path: '/admin/settings' },
];

const AdminDashboard = () => {
  const location = useLocation();
  const { user, logout, isLoading } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = location.pathname;
  const activeSection = menuItems.find(item => item.path === currentPath)?.id || 'overview';
  const activeItem = menuItems.find(item => item.id === activeSection) || menuItems[0];
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-shell min-h-screen flex bg-gray-50 text-gray-900">
      <AnimatePresence>
        <div className={`fixed inset-y-0 left-0 z-50 w-[264px] bg-primary-900 text-white transform transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 overflow-hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col w-full h-full min-h-0">
            <div className="flex items-center justify-between h-[76px] px-6 border-b border-white/[0.08]">
              <Link to="/admin" className="flex items-center gap-3 no-underline text-white">
                <img src="/images/bfcn-logo.png" alt="" className="w-10 h-10 rounded-full bg-white object-contain" />
                <div><p className="font-serif text-[17px] leading-none">Bright Future</p><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-300/80 mt-1.5">Admin console</p></div>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white" aria-label="Close navigation"><X size={20} /></button>
            </div>
            <div className="px-6 pt-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Workspace</div>
            <nav className="folder flex-1 px-3 space-y-0.5 min-h-0">
              {menuItems.map((item) => {
                const Icon = item.icon; const isActive = activeSection === item.id;
                return (
                  <Link
                  key={item.id}
                  to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`group w-full flex items-center justify-between gap-3 px-3 py-2.5 text-[13.5px] font-medium rounded-lg transition-colors duration-150 no-underline ${isActive ? 'bg-white/[0.1] text-white' : 'text-white/60 hover:bg-white/[0.05] hover:text-white'}`}
                ><span className="flex items-center gap-3"><Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-accent-300' : ''} />{item.label}</span>{isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent-300" />}</Link>
                );
              })}
            </nav>
            <div className="p-4 mt-auto border-t border-white/[0.08]">
              <div className="flex items-center gap-3 px-2 mb-4"><div className="grid place-items-center w-9 h-9 rounded-full bg-accent-300 text-primary-900 text-sm font-bold">{(user?.name || 'A').charAt(0)}</div><div className="min-w-0"><p className="text-xs font-semibold truncate">{user?.name || 'Admin'}</p><p className="text-[10px] text-white/40 truncate">Administrator</p></div></div>
              <button
              onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-white/50 hover:bg-white/[0.05] hover:text-white transition-colors"><LogOut size={16} /> Sign out</button>
            </div>
          </div>
        </div>
      </AnimatePresence>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-[76px] flex items-center justify-between px-5 md:px-10 border-b border-gray-200 bg-white/85 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-900" aria-label="Open navigation"><Menu size={22} /></button>
            <div><p className="text-[11px] font-medium text-gray-500 mb-0.5">Admin <span className="mx-1 text-gray-300">/</span> <span className="capitalize">{activeSection}</span></p><h1 className="font-serif text-[22px] md:text-[26px] leading-tight text-gray-900 m-0">{activeItem.label}</h1></div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5"><Input allowClear size="large" prefix={<Search size={16} className="text-gray-400" />} placeholder="Search workspace" className="hidden !w-52 md:block" /><Tooltip title="Notifications"><Button type="text" shape="circle" className="relative" icon={<Bell size={19} />} aria-label="Notifications"><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-400" /></Button></Tooltip><div className="hidden sm:block h-7 w-px bg-gray-200" /><div className="grid place-items-center w-9 h-9 rounded-full bg-primary-50 text-primary-700 text-sm font-bold">{(user?.name || 'A').charAt(0)}</div></div>
        </header>

        <main className="p-5 md:p-10 max-w-[1500px]">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-900/55 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;