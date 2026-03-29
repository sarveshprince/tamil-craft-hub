import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import heroBanner from '@/assets/hero-banner.jpg';
import logo from '@/assets/logo.jpeg';
import { ArrowRight, Leaf, Heart, Globe } from 'lucide-react';

const HomePage = () => {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={heroBanner} alt="Rural landscape" className="absolute inset-0 w-full h-full object-cover" width={1920} height={768} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 container mx-auto h-full flex items-center px-4">
          <div className="max-w-xl animate-fade-up">
            <img src={logo} alt="Magalir Sakthi" className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-golden/30" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-foreground leading-tight mb-4">
              Magalir Sakthi<br />
              <span className="font-tamil text-3xl md:text-4xl text-golden">மகளிர் சக்தி</span>
            </h1>
            <p className="text-lg text-earth-foreground/80 mb-6 max-w-md">
              Empowering rural women artisans through eco-friendly handcrafted products made from palm leaves and coconut shells.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-warm text-primary-foreground font-semibold hover:opacity-90 transition">
                Shop Now / கடைக்கு <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-earth-foreground/30 text-earth-foreground font-semibold hover:bg-earth-foreground/10 transition">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Eco-Friendly', titleTa: 'சுற்றுச்சூழல் நட்பு', desc: '100% natural materials, zero plastic.' },
              { icon: Heart, title: 'Women Led', titleTa: 'பெண்கள் தலைமை', desc: 'Supporting rural women artisans directly.' },
              { icon: Globe, title: 'Sustainable', titleTa: 'நிலையான', desc: 'Traditional crafts for a modern world.' },
            ].map(v => (
              <div key={v.title} className="card-3d card-3d-shadow bg-background rounded-2xl p-8 text-center border border-border">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-warm flex items-center justify-center">
                  <v.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{v.title}</h3>
                <p className="font-tamil text-sm text-muted-foreground mb-2">{v.titleTa}</p>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gradient-warm">Featured Products</h2>
            <p className="font-tamil text-muted-foreground mt-2">சிறப்பு பொருட்கள்</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-earth text-earth-foreground font-semibold hover:opacity-90 transition">
              View All Products / அனைத்து பொருட்களும் <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth text-earth-foreground py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-lg font-semibold">Magalir Sakthi - மகளிர் சக்தி</p>
          <p className="text-sm text-earth-foreground/70 mt-2">Women Empowerment through Eco-Friendly Crafts</p>
          <p className="text-xs text-earth-foreground/50 mt-4">© 2026 Magalir Sakthi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
