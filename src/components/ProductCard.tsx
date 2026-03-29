import { useStore, Product } from '@/context/StoreContext';

interface Props {
  product: Product;
  showActions?: boolean;
}

const ProductCard = ({ product, showActions = true }: Props) => {
  const { user, addToCart } = useStore();

  return (
    <div className="card-3d card-3d-shadow bg-card rounded-2xl overflow-hidden border border-border group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.nameEn}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.category === 'palm' ? 'bg-secondary text-secondary-foreground' : 'bg-earth text-earth-foreground'}`}>
            {product.category === 'palm' ? '🌴 Palm' : '🥥 Coconut'}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-lg leading-tight">{product.nameEn}</h3>
        <p className="font-tamil text-sm text-muted-foreground">{product.nameTa}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-gradient-warm">₹{product.price}</span>
          {showActions && user === 'customer' && (
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 rounded-lg bg-gradient-warm text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
