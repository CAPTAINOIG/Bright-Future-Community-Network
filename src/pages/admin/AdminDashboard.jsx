import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3, Bell, BookOpen, CalendarDays, ChevronRight, FolderKanban,
  Images, LayoutDashboard, Lightbulb, LogOut, Menu, MessageSquare, Newspaper,
  Search, Settings2, ShieldCheck, UserCheck, Users, X,
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

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const currentPath = location.pathname;
  const activeSection = menuItems.find(item => item.path === currentPath)?.id || 'overview';
  const activeItem = menuItems.find(item => item.id === activeSection) || menuItems[0];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-shell min-h-screen flex bg-[#f7f5ef] text-[#17231d]">
      <AnimatePresence>
        <div className={`fixed inset-y-0 left-0 z-50 w-[276px] bg-[#14251d] text-white transform transition-transform duration-300 lg:!static lg:!translate-x-0 lg:!flex lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between h-[92px] px-7 border-b border-white/10">
              <Link to="/admin" className="flex items-center gap-3 no-underline text-white">
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-[#e9b949] text-[#14251d] font-black text-lg">B</div>
                <div><p className="font-semibold tracking-tight leading-none">BFCN</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/45 mt-1.5">Field office</p></div>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white" aria-label="Close navigation"><X size={20} /></button>
            </div>
            <div className="px-5 pt-7 pb-3 text-[10px] uppercase tracking-[0.22em] text-white/35">Workspace</div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon; const isActive = activeSection === item.id;
                return (
                  <Link
                  key={item.id}
                  to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`group w-full flex items-center justify-between gap-3 px-3.5 py-3 text-[13px] rounded-xl transition-all duration-200 no-underline ${isActive ? 'bg-[#e9b949] text-[#14251d] font-semibold' : 'text-white/62 hover:bg-white/8 hover:text-white'}`}
                ><span className="flex items-center gap-3"><Icon size={17} strokeWidth={isActive ? 2.4 : 1.8} />{item.label}</span>{isActive && <ChevronRight size={15} />}</Link>
                );
              })}
            </nav>
            <div className="p-5 mt-5 border-t border-white/10">
              <div className="flex items-center gap-3 px-2 mb-4"><div className="grid place-items-center w-9 h-9 rounded-full bg-[#d9ece0] text-[#14251d] text-sm font-bold">{(user?.name || 'A').charAt(0)}</div><div className="min-w-0"><p className="text-xs font-semibold truncate">{user?.name || 'Admin'}</p><p className="text-[10px] text-white/40 truncate">Administrator</p></div></div>
              <button
              onClick={handleLogout}
                className="w-full flex items-center gap-3 px-2 py-2 text-xs text-white/45 hover:text-[#e9b949] transition-colors"><LogOut size={16} /> Sign out</button>
            </div>
          </div>
        </div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="h-[92px] flex items-center justify-between px-5 md:px-10 border-b border-[#dfe3d9] bg-[#f7f5ef]/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-[#17231d]" aria-label="Open navigation"><Menu size={22} /></button>
            <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#708078] mb-1">BFCN / {activeSection}</p><h1 className="text-2xl md:text-[28px] font-semibold tracking-[-0.04em]">{activeItem.label}</h1></div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5"><Input allowClear size="large" prefix={<Search size={16} className="text-[#829087]" />} placeholder="Search workspace" className="hidden !w-52 md:block" /><Tooltip title="Notifications"><Button type="text" shape="circle" className="relative" icon={<Bell size={19} />} aria-label="Notifications"><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#d68e42]" /></Button></Tooltip><div className="hidden sm:block h-7 w-px bg-[#dfe3d9]" /><ShieldCheck size={19} className="text-[#427456]" /></div>
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
            className="fixed inset-0 bg-[#14251d]/55 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
