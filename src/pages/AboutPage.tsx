import heroBanner from '@/assets/hero-banner.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-warm">Our Roots</h1>
          <p className="font-tamil text-xl text-muted-foreground mt-2">எமது வேர்கள்</p>
        </div>

        <div className="card-3d card-3d-shadow bg-card rounded-2xl overflow-hidden border border-border mb-10">
          <img src={heroBanner} alt="Rural village" className="w-full h-64 object-cover" />
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold mb-3">Who We Are / நாங்கள் யார்</h2>
              <p className="text-muted-foreground leading-relaxed">
                Magalir Sakthi is a women-led initiative rooted in the rural villages of Tamil Nadu. We bring together talented artisan women who transform natural materials — palm leaves, coconut shells, and coir fibers — into beautiful, functional eco-friendly products.
              </p>
              <p className="font-tamil text-muted-foreground leading-relaxed mt-3">
                மகளிர் சக்தி என்பது தமிழ்நாட்டின் கிராமப்புறங்களில் வேர்களைக் கொண்ட பெண்கள் தலைமையிலான முயற்சி. பனை ஓலை, தேங்காய் ஓடு மற்றும் தேங்காய் நார் போன்ற இயற்கைப் பொருட்களை அழகான, பயனுள்ள சுற்றுச்சூழல் நட்பு பொருட்களாக மாற்றும் திறமையான கைவினைஞர் பெண்களை நாங்கள் ஒன்றிணைக்கிறோம்.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold mb-3">Our Process / எங்கள் செயல்முறை</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: '01', title: 'Harvest', titleTa: 'அறுவடை', desc: 'Sustainably sourced palm leaves and coconut shells from local farms.' },
                  { step: '02', title: 'Craft', titleTa: 'கைவினை', desc: 'Skilled women artisans handcraft each product using traditional techniques.' },
                  { step: '03', title: 'Deliver', titleTa: 'வழங்குதல்', desc: 'Products reach you with minimal packaging, maximum care.' },
                ].map(s => (
                  <div key={s.step} className="bg-background rounded-xl p-6 border border-border text-center">
                    <span className="text-3xl font-display font-bold text-gradient-warm">{s.step}</span>
                    <h3 className="font-display font-semibold mt-2">{s.title}</h3>
                    <p className="font-tamil text-sm text-muted-foreground">{s.titleTa}</p>
                    <p className="text-xs text-muted-foreground mt-2">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold mb-3">Impact / தாக்கம்</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { num: '50+', label: 'Women Artisans', labelTa: 'பெண் கைவினைஞர்கள்' },
                  { num: '10K+', label: 'Products Sold', labelTa: 'விற்கப்பட்ட பொருட்கள்' },
                  { num: '100%', label: 'Eco-Friendly', labelTa: 'சுற்றுச்சூழல் நட்பு' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-3xl font-display font-bold text-gradient-warm">{s.num}</p>
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="font-tamil text-xs text-muted-foreground">{s.labelTa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
