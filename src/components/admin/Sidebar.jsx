import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, FolderKanban, BookOpen, Calendar, Newspaper,
  Images, Lightbulb, MessageSquare, BarChart3, Settings, ChevronLeft, ChevronRight, LogOut, Menu,
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/members', label: 'Members', icon: Users },
  { path: '/admin/volunteers', label: 'Volunteers', icon: UserCheck },
  { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { path: '/admin/programmes', label: 'Programmes', icon: BookOpen },
  { path: '/admin/events', label: 'Events', icon: Calendar },
  { path: '/admin/news', label: 'News / Blog', icon: Newspaper },
  { path: '/admin/gallery', label: 'Gallery', icon: Images },
  { path: '/admin/ideas', label: 'Community Ideas', icon: Lightbulb },
  { path: '/admin/messages', label: 'Contact Messages', icon: MessageSquare },
  { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { path: '/admin/settings', label: 'Website Settings', icon: Settings },
];

export default function Sidebar({ onToggleMobile, mobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onToggleMobile} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-out
          ${collapsed ? 'w-[72px]' : 'w-[240px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-[72px] px-4 border-b border-gray-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600 font-bold shrink-0">B</div>
            {!collapsed && (
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[15px] font-bold text-gray-900 truncate">BFCN</span>
                <span className="text-[11px] text-gray-500 truncate">Admin Console</span>
              </div>
            )}
          </div>
          <button
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button
            className="flex lg:hidden items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={onToggleMobile}
            aria-label="Close sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={onToggleMobile}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${active
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                title={collapsed ? label : undefined}
              >
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-primary-600" />}
                <Icon size={19} className={active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-800'} />
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-3">
          <div className={`flex items-center gap-3 p-2 rounded-lg ${collapsed ? 'justify-center' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white font-semibold shrink-0">
              {(user?.name || 'A').charAt(0)}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Admin'}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className={`mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
