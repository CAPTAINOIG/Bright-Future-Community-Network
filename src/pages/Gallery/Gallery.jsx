import { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../../components/ui';

const albums = [
  {
    id: 1,
    title: 'Youth Skills Workshop 2026',
    category: 'Events',
    images: [
      { id: 1, caption: 'Opening ceremony', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80' },
      { id: 2, caption: 'Digital skills training', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80' },
      { id: 3, caption: 'Tailoring workshop', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd84?w=800&auto=format&fit=crop&q=80' },
      { id: 4, caption: 'Group photo', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80' },
      { id: 5, caption: 'Certificate presentation', image: 'https://images.unsplash.com/photo-16068365522051803?w=800&auto=format&fit=crop&q=80' },
      { id: 6, caption: 'Networking session', image: 'https://images.unsplash.com/photo-1511632765660-b4ea0b44bb8b?w=800&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 2,
    title: 'Community Library Project',
    category: 'Projects',
    images: [
      { id: 7, caption: 'Before renovation', image: 'https://images.unsplash.com/photo-1640185944838-717abbee085f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmdvJTIwcHJvamVjdCUyMGJlZm9yZSUyMHJlbm92YXRpb258ZW58MHx8MHx8fDA%3D' },
      { id: 8, caption: 'Renovation in progress', image: 'https://plus.unsplash.com/premium_photo-1733259836890-a688a61866f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 9, caption: 'Book donation ceremony', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80' },
      { id: 10, caption: 'Children reading', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 3,
    title: 'School Renovation',
    category: 'Projects',
    images: [
      { id: 11, caption: 'Before renovation', image: 'https://images.unsplash.com/photo-1632143696848-ed6f1d57d66e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 12, caption: 'New roof installation', image: 'https://plus.unsplash.com/premium_photo-1682617326551-4749611516f6?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 13, caption: 'Furnished classroom', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80' },
      { id: 14, caption: 'Students in renovated school', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 4,
    title: 'BFCN Community Events',
    category: 'General',
    images: [
      { id: 15, caption: 'Community meeting', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80' },
      { id: 16, caption: 'Town hall dialogue', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80' },
      { id: 17, caption: 'Volunteer team', image: 'https://images.unsplash.com/photo-1559027615-cd462890bac0?w=800&auto=format&fit=crop&q=80' },
      { id: 18, caption: 'Award ceremony', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80' },
      { id: 19, caption: 'Celebration', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 5,
    title: 'Volunteer Outreach & Care',
    category: 'General',
    images: [
      { id: 20, caption: 'Helping hands in the community', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80' },
      { id: 21, caption: 'Learning together', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80' },
      { id: 22, caption: 'Supporting young people', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format&fit=crop&q=80' },
      { id: 23, caption: 'Community connection', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format&fit=crop&q=80' },
      { id: 24, caption: 'A shared purpose', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80' },
      { id: 25, caption: 'Working side by side', image: 'https://images.unsplash.com/photo-1559027615-cd462890bac0?w=800&auto=format&fit=crop&q=80' },
    ],
  },
];

const videoStories = [
  {
    title: 'Community Development in Action',
    description:
      'Community-focused initiatives creating opportunities and improving lives.',
    image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID',
  },
  {
    title: 'Volunteers Making a Difference',
    description:
      'Volunteers working together to support people and strengthen their communities.',
    image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID',
  },
  {
    title: 'Supporting Communities',
    description:
      'A look at community-based programmes focused on support, empowerment and development.',
    image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID',
  },
  {
    title: 'Building a Better Community',
    description:
      'Community members and volunteers working together towards a brighter future.',
    videoId: 'ScMzIvxBSi4',
    image: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
    {
    title: 'Volunteers Supporting the Community',
    description:
      'A story of people coming together to support and make a positive difference in their community.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&auto=format&fit=crop&q=80',
    link: 'https://www.youtube.com/watch?v=uuZE_IRwLNI',
  },
  {
    title: 'Community Clean-Up in Action',
    description:
      'Volunteers working together to care for and improve their shared environment.',
    image:
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&auto=format&fit=crop&q=80',
    link: 'https://www.youtube.com/watch?v=4G9NwKJvMFA',
  },
  {
    title: 'Food Distribution and Community Support',
    description:
      'Community members and volunteers coming together to provide support to people in need.',
    image:
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&auto=format&fit=crop&q=80',
    link: 'https://www.youtube.com/watch?v=9sYc9m2Q7pA',
  },
];

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Events', 'Projects', 'General'];
  const filtered = albums.filter(a => filter === 'All' || a.category === filter);

  const navigateLightbox = (dir) => { if (!lightbox) return; const imgs = lightbox.album.images; let idx = lightbox.index + dir; if (idx < 0) idx = imgs.length - 1; if (idx >= imgs.length) idx = 0; setLightbox({ ...lightbox, index: idx }); };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-primary-700/50 blur-3xl" aria-hidden="true" />
        <div className="container-main relative py-20 md:py-28">
          <ScrollReveal className="max-w-[760px]">
            <span className="eyebrow text-accent-300 mb-6"><span className="h-px w-8 bg-accent-300" />Our moments</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05] mb-6">Gallery</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-[620px] m-0">Photos from BFCN events, projects, and community activities.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-main">
          {!selectedAlbum ? (
            <>
              <div className="flex gap-2 flex-wrap mb-12" role="group" aria-label="Filter albums by category">
                {categories.map(c => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={filter === c}
                    className={`h-10 px-5 border rounded-full text-sm font-semibold cursor-pointer transition-colors ${filter === c ? 'bg-primary-800 text-white border-primary-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'}`}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <ScrollReveal animation="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((album) => (
                  <div key={album.id} className="group rounded-[20px] overflow-hidden border border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]" onClick={() => setSelectedAlbum(album)} role="button" tabIndex={0} aria-label={`Open album: ${album.title}`} onKeyDown={(e) => e.key === 'Enter' && setSelectedAlbum(album)}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                      {album.images?.[0]?.image ? (
                        <img
                          src={album.images[0].image}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${album.images?.[0]?.image ? 'hidden' : 'flex'} absolute inset-0 flex-col items-center justify-center gap-3 text-primary-300`}><Image size={40} strokeWidth={1.5} /><span className="text-sm font-medium">{album.images.length} photos</span></div>
                      {album.images?.[0]?.image && <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary-900/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full"><Image size={12} />{album.images.length} photos</div>}
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-600">{album.category}</span>
                      <h3 className="font-serif text-[1.35rem] text-gray-900 leading-snug mt-2 mb-0">{album.title}</h3>
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </>
          ) : (
            <>
              <button type="button" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-gray-200 bg-white cursor-pointer text-sm font-semibold text-gray-700 mb-8 hover:border-gray-300 hover:text-primary-700 transition-colors" onClick={() => setSelectedAlbum(null)}><ChevronLeft size={16} /> Back to albums</button>
              <div className="mb-10">
                <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" aria-hidden="true" />{selectedAlbum.category} · {selectedAlbum.images.length} photos</span>
                <h2 className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.08] text-gray-900 m-0">{selectedAlbum.title}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {selectedAlbum.images.map((img, idx) => (
                  <figure key={img.id} className="group m-0 cursor-pointer" onClick={() => setLightbox({ album: selectedAlbum, index: idx })} role="button" tabIndex={0} aria-label={`View photo: ${img.caption}`} onKeyDown={(e) => e.key === 'Enter' && setLightbox({ album: selectedAlbum, index: idx })}>
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                      {img.image ? (
                        <img
                          src={img.image}
                          alt={img.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${img.image ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center text-gray-300`}><Image size={32} strokeWidth={1.5} /></div>
                    </div>
                    <figcaption className="pt-3 text-[13px] font-medium text-gray-600 leading-snug">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {!selectedAlbum && (
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="container-main">
            <div className="mb-12 md:mb-14 max-w-[620px]">
              <span className="eyebrow text-primary-600 mb-4"><span className="h-px w-6 bg-accent-400" aria-hidden="true" />Stories in motion</span>
              <h2 className="font-serif text-[2rem] md:text-[2.75rem] leading-[1.08] text-gray-900 mb-4">Community work, on film</h2>
              <p className="text-[15px] leading-relaxed text-gray-600 m-0">Temporary stock videos are in place while BFCN&apos;s own footage is being prepared. Replace each link with your uploaded video when it is ready.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videoStories.map((video) => (
                <a key={video.title} href={video.link} target="_blank" rel="noreferrer" className="group flex flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white no-underline transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[var(--shadow-lift)]">
                  <div className="relative aspect-video overflow-hidden bg-primary-900">
                    <img src={video.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-primary-800 shadow-lg transition-transform group-hover:scale-110"><Play size={20} fill="currentColor" className="ml-0.5" /></span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-primary-900/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Stock video</span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-serif text-[1.35rem] leading-snug text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-[15px] leading-relaxed text-gray-600 mb-5 flex-1">{video.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">Watch video <ExternalLink size={14} /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-primary-900/95 backdrop-blur-sm flex items-center justify-center lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button type="button" aria-label="Close" className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-white/10 border-none text-white cursor-pointer hover:bg-white/20 transition-colors z-10" onClick={() => setLightbox(null)}><X size={22} /></button>
          <button type="button" aria-label="Previous photo" className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border-none text-white cursor-pointer hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}><ChevronLeft size={24} /></button>
          <div className="text-center w-full max-w-[900px] px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-[60vh] md:h-[70vh] max-h-[640px] rounded-2xl overflow-hidden">
              {lightbox.album.images[lightbox.index]?.image ? (
                <img
                  key={lightbox.index}
                  src={lightbox.album.images[lightbox.index].image}
                  alt={lightbox.album.images[lightbox.index]?.caption}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`${lightbox.album.images[lightbox.index]?.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-white/30`}><Image size={64} strokeWidth={1.5} /></div>
            </div>
            <p className="font-serif text-white text-lg mt-5 mb-0">{lightbox.album.images[lightbox.index]?.caption}</p>
            <p className="text-white/50 text-xs font-semibold tracking-[0.14em] mt-2 mb-0">{lightbox.index + 1} / {lightbox.album.images.length}</p>
          </div>
          <button type="button" aria-label="Next photo" className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border-none text-white cursor-pointer hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}><ChevronRight size={24} /></button>
        </div>
      )}
    </div>
  );
}

export default Gallery;