import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, MapPin, Heart } from 'lucide-react';
import { Drawer } from '../../components/ui';
import Button from '../ui/Button';
import { JoinForm } from '../forms';

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'About', children: [
      { label: 'About BFCN', to: '/about', note: 'Our story, mission and values' },
      { label: 'Leadership', to: '/leadership', note: 'The people guiding our work' },
      { label: 'Transparency', to: '/transparency', note: 'Accountability and reporting' },
    ]
  },
  {
    label: 'What We Do', children: [
      { label: 'Programmes', to: '/programmes', note: 'Long-term community initiatives' },
      { label: 'Projects', to: '/projects', note: 'Infrastructure and local impact' },
      { label: 'Community Ideas', to: '/community-ideas', note: 'Proposals from the community' },
    ]
  },
  { label: 'Events', to: '/events' },
  { label: 'News', to: '/news' },
  { label: 'Gallery', to: '/gallery' },
  {
    label: 'Get Involved', children: [
      { label: 'Join BFCN', to: '/join', note: 'Become a registered member' },
      { label: 'Volunteer', to: '/volunteer', note: 'Give your time and skills' },
      { label: 'Support Us', to: '/support', note: 'Fund lasting change' },
    ]
  },
  { label: 'Contact', to: '/contact' },
];

const linkBase = 'relative inline-flex items-center gap-1 px-3 py-2 text-[14px] font-medium rounded-full transition-colors duration-150 no-underline whitespace-nowrap bg-transparent border-none cursor-pointer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [location]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const groupActive = (children) => children.some((c) => location.pathname.startsWith(c.to));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(21,26,23,0.08),0_8px_24px_-12px_rgba(21,26,23,0.12)]' : 'bg-white'}`}>
      <div className="container-main">
        <nav className="flex items-center justify-between h-[72px] gap-4" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-3 no-underline shrink-0" aria-label="BFCN Home">
            <img src="/images/bfcn-logo.png" alt="" className="w-11 h-11 rounded-full object-contain ring-1 ring-gray-200" />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[1.15rem] text-primary-800 tracking-tight">Bright Future</span>
              <span className="mt-1 text-[10px] font-bold text-accent-600 uppercase tracking-[0.18em]">Community Network</span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <button
                    className={`${linkBase} ${groupActive(link.children) ? 'text-primary-700' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-expanded={activeDropdown === link.label}
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1 pointer-events-none'}`}>
                    <ul className="w-[290px] bg-white border border-gray-200 rounded-2xl shadow-[var(--shadow-lift)] p-2 list-none m-0">
                      {link.children.map((child) => (
                        <li key={child.to}>
                          <NavLink to={child.to} className={({ isActive }) => `block px-4 py-3 rounded-xl transition-colors no-underline ${isActive ? 'bg-primary-50' : 'hover:bg-gray-50'}`}>
                            <span className="block text-sm font-semibold text-gray-900">{child.label}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">{child.note}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => `${linkBase} ${isActive ? 'text-primary-700 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-accent-400" />}
                      </>
                    )}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            <Button to="/support" variant="secondary" size="sm" icon={Heart} className="hidden xl:inline-flex">Support</Button>
            <Button onClick={() => setShowJoinDrawer(true)} variant="primary" size="sm" className="hidden lg:inline-flex">Join BFCN</Button>
            <button className="flex lg:hidden items-center justify-center w-11 h-11 rounded-full text-gray-900 hover:bg-gray-100 transition-colors bg-transparent border-none cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-x-0 top-[72px] z-[60] h-[calc(100dvh-72px)] bg-white border-t border-gray-100 overflow-y-auto transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="flex flex-col min-h-full px-5 py-4">
          <ul className="list-none p-0 m-0 flex flex-col divide-y divide-gray-100">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <button className="flex items-center justify-between w-full py-4 text-[17px] font-semibold text-gray-900 bg-transparent border-none cursor-pointer text-left" onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)} aria-expanded={activeDropdown === link.label}>
                    {link.label}
                    <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <ul className="list-none p-0 m-0 pb-3 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <li key={child.to}>
                          <NavLink to={child.to} onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-xl no-underline ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <span className="block text-[15px] font-medium">{child.label}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">{child.note}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center py-4 text-[17px] font-semibold no-underline ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <Button to="/join" variant="primary" fullWidth size="lg" onClick={() => setIsOpen(false)}>Join BFCN</Button>
            <Button to="/support" variant="secondary" fullWidth size="lg" icon={Heart} onClick={() => setIsOpen(false)}>Support our work</Button>
            <div className="flex flex-col gap-2 pt-4 text-sm text-gray-500">
              <a href="mailto:info@bfcn.org" className="inline-flex items-center gap-2 text-gray-500 no-underline"><Mail size={15} /> info@bfcn.org</a>
              <span className="inline-flex items-center gap-2"><MapPin size={15} /> Ogbomoso, Oyo State, Nigeria</span>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title="Join Bright Future Community Network"
        placement="right"
        onClose={() => setShowJoinDrawer(false)}
        open={showJoinDrawer}
        width={600}
      >
        <JoinForm onClose={() => setShowJoinDrawer(false)} />
      </Drawer>
    </header>
  );
};

export default Navbar;
