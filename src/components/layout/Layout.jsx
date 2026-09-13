import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="absolute -top-full left-4 px-6 py-3 bg-primary-600 text-white font-semibold rounded-b-lg z-[999] transition-all focus:top-0 no-underline">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
