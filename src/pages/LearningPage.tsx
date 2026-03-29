import { useState } from 'react';
import { Play, X } from 'lucide-react';

const LEARNING_VIDEOS = [
  { nameEn: 'Palm Leaf Basket Making', nameTa: 'பனை ஓலை பெட்டி செய்முறை', thumbnail: '🧺', videoId: 'KJXpd2vbMYs', comingSoon: false },
  { nameEn: 'Coconut Shell Bowl Crafting', nameTa: 'தேங்காய் சிரட்டை கிண்ணம் செய்முறை', thumbnail: '🥥', videoId: '3k9OQXN1kVE', comingSoon: false },
  { nameEn: 'Palm Frond Fan Weaving', nameTa: 'பனை ஓலை விசிறி நெய்தல்', thumbnail: '🌿', videoId: 'sSySpVd6tJM', comingSoon: true },
  { nameEn: 'Coir Door Mat Making', nameTa: 'தேங்காய் நார் மிதியடி செய்முறை', thumbnail: '🚪', videoId: 'w2FAnAFJ5wc', comingSoon: true },
  { nameEn: 'Palm Leaf Hat Craft', nameTa: 'பனை ஓலை தொப்பி கைவினை', thumbnail: '👒', videoId: 'SxGLcuOz4Gk', comingSoon: true },
  { nameEn: 'Coconut Shell Carving', nameTa: 'தேங்காய் சிரட்டை செதுக்குதல்', thumbnail: '🥄', videoId: 'HYvOLGKmhIo', comingSoon: true },
  { nameEn: 'Palm Leaf Mat Weaving', nameTa: 'பனை ஓலை பாய் நெய்தல்', thumbnail: '🧶', videoId: 'R_g4nT6gHXo', comingSoon: true },
  { nameEn: 'Coconut Fiber Processing', nameTa: 'தேங்காய் நார் பதப்படுத்துதல்', thumbnail: '🧹', videoId: 'f4USyXIe1IU', comingSoon: true },
  { nameEn: 'Kottan Basket Art', nameTa: 'கொட்டான் கூடை கலை', thumbnail: '🎨', videoId: 'u4mBCfqRzWE', comingSoon: true },
  { nameEn: 'Bird House Building', nameTa: 'குருவி கூடு கட்டுதல்', thumbnail: '🐦', videoId: 'jY0956m9kYc', comingSoon: true },
];

const LearningPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-gradient-warm">Learning Hub</h1>
          <p className="font-tamil text-muted-foreground mt-2">கற்றல் மையம்</p>
          <p className="text-sm text-muted-foreground mt-1">Watch how our artisans create each product</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {LEARNING_VIDEOS.map((video, i) => (
            <div key={i} className={`card-3d card-3d-shadow bg-card rounded-2xl overflow-hidden border border-border group ${video.comingSoon ? 'opacity-80' : 'cursor-pointer'}`}
              onClick={() => !video.comingSoon && setActiveVideo(video.videoId)}>
              <div className="aspect-video relative overflow-hidden bg-accent/30 flex items-center justify-center">
                <span className="text-6xl">{video.thumbnail}</span>
                {video.comingSoon ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                    <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Coming Soon</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 group-hover:opacity-100 transition">
                      <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition">
                      <div className="w-12 h-12 rounded-full bg-destructive/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-destructive-foreground ml-0.5" fill="white" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold">{video.nameEn}</h3>
                <p className="font-tamil text-sm text-muted-foreground mt-1">{video.nameTa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white hover:text-primary transition">
              <X className="w-7 h-7" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video"
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;
