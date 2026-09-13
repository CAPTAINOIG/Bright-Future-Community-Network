import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'What We Do', children: [
    { label: 'Programmes', to: '/programmes' },
    { label: 'Projects', to: '/projects' },
    { label: 'Community Ideas', to: '/community-ideas' },
  ]},
  { label: 'Events', to: '/events' },
  { label: 'News', to: '/news' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Get Involved', children: [
    { label: 'Join BFCN', to: '/join' },
    { label: 'Volunteer', to: '/volunteer' },
    { label: 'Support Us', to: '/support' },
  ]},
  { label: 'Transparency', to: '/transparency' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [location]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-[0_1px_10px_rgba(0,0,0,0.08)]' : 'bg-white/95'}`}>
      <div className="container-main">
        <nav className="flex items-center justify-between h-[72px] gap-4" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-3 no-underline shrink-0" aria-label="BFCN Home">
            <img src="/images/bfcn-logo.png" alt="BFCN Logo" className="w-11 h-11 rounded-full object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-primary-600 leading-none tracking-wide">BFCN</span>
              <span className="text-[0.65rem] font-medium text-accent-400 uppercase tracking-[0.1em]">Forward Together</span>
            </div>
          </Link>
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-all duration-150 bg-transparent border-none cursor-pointer whitespace-nowrap">
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-150 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  <ul className={`absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg p-2 list-none transition-all duration-150 ${activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
                    {link.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} className={({isActive}) => `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-150 no-underline ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`}>{child.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className={({isActive}) => `inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 no-underline whitespace-nowrap ${isActive ? 'text-primary-600 bg-primary-50 font-semibold' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`}>{link.label}</NavLink>
                </li>
              )
            )}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button to="/join" variant="primary" size="sm" className="hidden lg:inline-flex">Join BFCN</Button>
            <button className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-[72px] left-0 right-0 bottom-0 bg-white overflow-y-auto z-50 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col min-h-full p-4">
          <ul className="list-none p-0 m-0 flex-1">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <button className="flex items-center justify-between w-full px-4 py-4 text-base font-medium text-gray-900 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-all bg-transparent border-none cursor-pointer text-left" onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}>
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform duration-150 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.label && (
                    <ul className="list-none p-0 pl-4 m-0">
                      {link.children.map((child) => (
                        <li key={child.to}>
                          <NavLink to={child.to} className={({isActive}) => `block px-4 py-3 text-sm rounded-lg border-l-2 ml-4 transition-all no-underline ${isActive ? 'text-primary-600 border-primary-600 bg-primary-50' : 'text-gray-600 border-gray-200 hover:text-primary-600 hover:border-primary-600 hover:bg-primary-50'}`}>{child.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === '/'} className={({isActive}) => `flex items-center px-4 py-4 text-base font-medium rounded-lg transition-all no-underline ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-900 hover:text-primary-600 hover:bg-primary-50'}`}>{link.label}</NavLink>
                </li>
              )
            )}
          </ul>
          <div className="pt-6 border-t border-gray-200 mt-4 flex flex-col gap-3">
            <Button to="/join" variant="primary" fullWidth size="lg">Join BFCN</Button>
            <a href="tel:+2348000000000" className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 no-underline hover:text-primary-600"><Phone size={16} />Contact Us</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;