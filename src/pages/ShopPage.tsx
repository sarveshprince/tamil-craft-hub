import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

const ShopPage = () => {
  const { products } = useStore();
  const [filter, setFilter] = useState<'all' | 'palm' | 'coconut'>('all');

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-gradient-warm">Our Shop</h1>
          <p className="font-tamil text-muted-foreground mt-2">எங்கள் கடை</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {(['all', 'palm', 'coconut'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${filter === f ? 'bg-gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              {f === 'all' ? 'All / அனைத்தும்' : f === 'palm' ? '🌴 Palm / பனை' : '🥥 Coconut / தேங்காய்'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products available / பொருட்கள் இல்லை</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
