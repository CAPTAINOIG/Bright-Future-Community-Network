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
      { id: 7, caption: 'Before renovation', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e764?w=800&auto=format&fit=crop&q=80' },
      { id: 8, caption: 'Renovation in progress', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f5a185b?w=800&auto=format&fit=crop&q=80' },
      { id: 9, caption: 'Book donation ceremony', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80' },
      { id: 10, caption: 'Children reading', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 3,
    title: 'School Renovation',
    category: 'Projects',
    images: [
      { id: 11, caption: 'Before renovation', image: 'https://images.unsplash.com/photo-1577896851523-e0bc6c10afd2?w=800&auto=format&fit=crop&q=80' },
      { id: 12, caption: 'New roof installation', image: 'https://images.unsplash.com/photo-1504307651254-35680f356df9?w=800&auto=format&fit=crop&q=80' },
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
    title: 'Volunteers supporting a donation centre',
    description: 'A temporary stock clip of volunteers sorting and organising donated goods.',
    href: 'https://www.pexels.com/video/volunteers-helping-each-other-6893560/',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&auto=format&fit=crop&q=80',
  },
  {
    title: 'Community clean-up in action',
    description: 'A temporary stock clip showing volunteers caring for a shared outdoor space.',
    href: 'https://www.pexels.com/video/volunteers-cleaning-a-riverbank-in-summer-31948665/',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&auto=format&fit=crop&q=80',
  },
  {
    title: 'Community donation drive',
    description: 'A temporary stock clip of a team preparing goods for community distribution.',
    href: 'https://www.pexels.com/video/people-packing-goods-6893741/',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&auto=format&fit=crop&q=80',
  },
];

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Events', 'Projects', 'General'];
  const filtered = albums.filter(a => filter === 'All' || a.category === filter);

  const navigateLightbox = (dir) => { if (!lightbox) return; const imgs = lightbox.album.images; let idx = lightbox.index + dir; if (idx < 0) idx = imgs.length - 1; if (idx >= imgs.length) idx = 0; setLightbox({ ...lightbox, index: idx }); };

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />
        <div className="container-main relative z-10"><ScrollReveal className="text-center max-w-[700px] mx-auto"><span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">Our Moments</span><h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1><p className="text-base text-white/85 max-w-[560px] mx-auto">Photos from BFCN events, projects, and community activities.</p></ScrollReveal></div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="white" /></svg></div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          {!selectedAlbum ? (
            <>
              <div className="flex gap-2 flex-wrap mb-8">{categories.map(c => <button key={c} className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition-all ${filter === c ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-600 hover:text-primary-600'}`} onClick={() => setFilter(c)}>{c}</button>)}</div>
              <ScrollReveal animation="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((album) => (
                  <div key={album.id} className="rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300" onClick={() => setSelectedAlbum(album)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedAlbum(album)}>
                    <div className="relative h-[200px] overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                      {album.images?.[0]?.image ? (
                        <img
                          src={album.images[0].image}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${album.images?.[0]?.image ? 'hidden' : 'flex'} flex-col items-center justify-center gap-3 h-full text-primary-300`}><Image size={40} /><span className="text-sm font-medium">{album.images.length} photos</span></div>
                      {album.images?.[0]?.image && <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full">{album.images.length} photos</div>}
                    </div>
                    <div className="p-4"><span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">{album.category}</span><h3 className="text-base font-bold mt-1">{album.title}</h3></div>
                  </div>
                ))}
              </ScrollReveal>
            </>
          ) : (
            <>
              <button className="inline-flex items-center bg-transparent border-none cursor-pointer text-sm font-semibold text-primary-600 mb-6 p-0 hover:underline" onClick={() => setSelectedAlbum(null)}>← Back to Albums</button>
              <h2 className="font-serif text-2xl mb-6">{selectedAlbum.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedAlbum.images.map((img, idx) => (
                  <div key={img.id} className="cursor-pointer rounded-lg overflow-hidden hover:scale-[1.02] transition-transform" onClick={() => setLightbox({ album: selectedAlbum, index: idx })} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setLightbox({ album: selectedAlbum, index: idx })}>
                    <div className="h-[180px] overflow-hidden bg-gray-100">
                      {img.image ? (
                        <img
                          src={img.image}
                          alt={img.caption}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`${img.image ? 'hidden' : 'flex'} items-center justify-center h-full text-gray-300`}><Image size={32} /></div>
                    </div>
                    <span className="block px-3 py-2 text-xs text-gray-600 bg-gray-50">{img.caption}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {!selectedAlbum && (
        <section className="border-t border-gray-100 bg-[#f8faf7] py-16 md:py-20">
          <div className="container-main">
            <div className="mb-8 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-500">Stories in motion</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary-800">Community work, on film</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">Temporary stock videos are in place while BFCN&apos;s own footage is being prepared. Replace each link with your uploaded video when it is ready.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {videoStories.map((video) => (
                <a key={video.title} href={video.href} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-gray-200 bg-white no-underline shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-primary-900">
                    <img src={video.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-primary-900/25" />
                    <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary-700 shadow-lg transition-transform group-hover:scale-110"><Play size={22} fill="currentColor" /></span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Stock video</span>
                  </div>
                  <div className="p-5"><h3 className="text-base font-bold text-gray-900">{video.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{video.description}</p><span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">Watch video <ExternalLink size={14} /></span></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 bg-transparent border-none text-white cursor-pointer p-2 hover:text-accent-400 z-10" onClick={() => setLightbox(null)}><X size={24} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-none text-white p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}><ChevronLeft size={32} /></button>
          <div className="text-center max-w-[800px] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-[400px] md:h-[500px] bg-white/5 rounded-lg overflow-hidden">
              {lightbox.album.images[lightbox.index]?.image ? (
                <img
                  key={lightbox.index}
                  src={lightbox.album.images[lightbox.index].image}
                  alt={lightbox.album.images[lightbox.index]?.caption}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`${lightbox.album.images[lightbox.index]?.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full text-white/30`}><Image size={64} /></div>
            </div>
            <p className="text-white text-sm mt-4">{lightbox.album.images[lightbox.index]?.caption}</p>
            <p className="text-white/50 text-xs mt-2">{lightbox.index + 1} / {lightbox.album.images.length}</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-none text-white p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}><ChevronRight size={32} /></button>
        </div>
      )}
    </div>
  );
}
