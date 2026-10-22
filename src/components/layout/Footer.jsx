import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUp, Send } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', to: '/about' }, { label: 'Leadership', to: '/leadership' },
  { label: 'Programmes', to: '/programmes' }, { label: 'Projects', to: '/projects' },
  { label: 'Events', to: '/events' }, { label: 'News', to: '/news' },
];
const getInvolved = [
  { label: 'Join BFCN', to: '/join' }, { label: 'Volunteer', to: '/volunteer' },
  { label: 'Support Us', to: '/support' }, { label: 'Community Ideas', to: '/community-ideas' },
  { label: 'Gallery', to: '/gallery' }, { label: 'Transparency', to: '/transparency' },
];

const social = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/YOUR_FACEBOOK_USERNAME',
    path: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.092 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.027 1.792-4.7 4.533-4.7 1.312 0 2.686.235 2.686.235v2.976h-1.514c-1.491 0-1.956.93-1.956 1.885v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.092 24 18.099 24 12.073z'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/YOUR_X_USERNAME',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/YOUR_INSTAGRAM_USERNAME',
    path: 'M12.017 0C8.396 0 7.929.01 6.684.048 5.443.085 4.60.204 3.875.43c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.403 4.864.284 5.706.247 6.95.01 8.195 0 8.663 0 12.017s.01 3.821.048 5.067c.037 1.243.156 2.085.382 2.81.306.788.717 1.458 1.384 2.125S3.35 23.065 4.14 23.37c.724.226 1.566.345 2.809.382 1.245.038 1.713.048 5.067.048s3.821-.01 5.067-.048c1.243-.037 2.085-.156 2.81-.382.788-.306 1.458-.717 2.125-1.384s1.078-1.337 1.384-2.126c.226-.724.345-1.566.382-2.809.038-1.245.048-1.713.048-5.067s-.01-3.821-.048-5.067c-.037-1.243-.156-2.085-.382-2.81-.306-.788-.717-1.458-1.384-2.125S20.65.935 19.86.63c-.724-.226-1.566-.345-2.809-.382C15.806.01 15.338 0 12.017 0zM12.017 2.162c3.204 0 3.584.012 4.849.07 1.366.062 2.658.336 3.608 1.286.95.95 1.224 2.242 1.286 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.336 2.658-1.286 3.608-.95.95-2.242 1.224-3.608 1.286-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.658-.336-3.608-1.286-.95-.95-1.224-2.242-1.286-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.336-2.658 1.286-3.608.95-.95 2.242-1.224 3.608-1.286 1.265-.058 1.645-.07 4.849-.07zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162s2.757 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.757-6.162-6.162-6.162zM12.017 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793 0 1.44.646 1.44 1.44z'
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@YOUR_YOUTUBE_USERNAME',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bfcn_humanitarian?_r=1&_t=ZS-99fvPkgzH8S',
    path: 'M19.321 5.562a5.124 5.124 0 01-4.99-5.124h-3.912v16.16a3.016 3.016 0 11-3.016-3.016c.33 0 .65.054.947.152v-3.99a7.012 7.012 0 00-.947-.065A6.928 6.928 0 001.9 16.607a6.928 6.928 0 0013.856 0V8.416a9.006 9.006 0 005.565 1.924V6.428a5.124 5.124 0 01-2-.866z'
  }
]

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const headingCls = 'text-[11px] font-bold text-white/50 uppercase tracking-[0.18em] mb-5';
  const linkCls = 'text-[15px] text-white/75 no-underline hover:text-accent-300 transition-colors';

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter */}
      <div className="container-main pt-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-end pb-14 border-b border-white/10">
          <div>
            <span className="eyebrow text-accent-300 mb-4"><span className="h-px w-6 bg-accent-300" />Stay connected</span>
            <h3 className="font-serif text-3xl md:text-[2.5rem] leading-[1.1] text-white m-0 max-w-[520px]">Stories of change from Ogbomoso, in your inbox.</h3>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
            <label className="relative flex-1">
              <span className="sr-only">Email address</span>
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="email" placeholder="you@example.com" className="w-full h-[52px] pl-12 pr-5 rounded-full border border-white/15 bg-white/[0.06] text-white text-[15px] placeholder:text-white/40 focus:outline-none focus:border-accent-300 focus:bg-white/10 transition-colors" />
            </label>
            <button type="submit" className="inline-flex h-[52px] items-center justify-center gap-2 px-7 rounded-full bg-accent-400 text-primary-900 font-semibold text-[15px] border-none hover:bg-accent-300 transition-colors cursor-pointer"><Send size={16} />Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="container-main py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 no-underline mb-6">
              <img src="/images/bfcn-logo.png" alt="" className="w-12 h-12 rounded-full object-contain bg-white" />
              <div className="leading-none">
                <span className="block font-serif text-lg text-white">Bright Future</span>
                <span className="block mt-1.5 text-[10px] font-bold text-accent-300 uppercase tracking-[0.18em]">Community Network</span>
              </div>
            </Link>
            <p className="text-[15px] text-white/60 leading-relaxed mb-6 max-w-[360px]">A community-focused organisation advancing development, youth empowerment and education in Ogbomoso and beyond. Forward together.</p>
            <div className="flex gap-2">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:bg-accent-400 hover:border-accent-400 hover:text-primary-900 transition-colors no-underline"
                  aria-label={item.name}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className={headingCls}>Organisation</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {quickLinks.map(l => <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className={headingCls}>Get involved</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {getInvolved.map(l => <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className={headingCls}>Contact</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {[
                { Icon: MapPin, text: 'Ogbomoso, Oyo State, Nigeria' },
                { Icon: Phone, text: '+234 37 800 288', href: 'tel:+2348137800288' },
                { Icon: Mail, text: 'info@bfcn.org', href: 'mailto:info@bfcn.org' },
                { Icon: Clock, text: 'Mon–Fri, 9am–5pm WAT' },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3 text-[15px] text-white/75">
                  <Icon size={16} className="shrink-0 mt-1 text-accent-300" />
                  {href ? <a href={href} className={linkCls}>{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/45 m-0">© {new Date().getFullYear()} Bright Future Community Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/transparency" className="text-[13px] text-white/45 no-underline hover:text-white transition-colors">Transparency</Link>
            <Link to="/contact" className="text-[13px] text-white/45 no-underline hover:text-white transition-colors">Contact</Link>
            <button className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-transparent text-white/60 hover:bg-white hover:text-primary-900 transition-colors cursor-pointer" onClick={scrollToTop} aria-label="Back to top"><ArrowUp size={16} /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;