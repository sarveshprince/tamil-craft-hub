import { useStore } from '@/context/StoreContext';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, purchaseCart } = useStore();
  const [purchased, setPurchased] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePurchase = () => {
    purchaseCart();
    setPurchased(true);
    setTimeout(() => navigate('/shop'), 3000);
  };

  if (purchased) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-display font-bold text-gradient-warm">Purchase Successful!</h2>
          <p className="font-tamil text-muted-foreground mt-2">வாங்குதல் வெற்றிகரமாக முடிந்தது!</p>
          <p className="text-sm text-muted-foreground mt-4">Redirecting to shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-display font-bold text-gradient-warm mb-8">Cart / கூடை</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">Your cart is empty / கூடை காலியாக உள்ளது</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="card-3d-shadow bg-card rounded-xl p-4 flex items-center gap-4 border border-border">
                <img src={item.product.image} alt={item.product.nameEn} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold truncate">{item.product.nameEn}</h3>
                  <p className="font-tamil text-sm text-muted-foreground">{item.product.nameTa}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gradient-warm">₹{item.product.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.product.id)} className="mt-1 p-1 hover:text-destructive transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="card-3d-shadow bg-card rounded-xl p-6 border border-border mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total / மொத்தம்</span>
                <span className="text-2xl font-bold text-gradient-warm">₹{total}</span>
              </div>
              <button onClick={handlePurchase} className="w-full py-3 rounded-lg bg-gradient-warm text-primary-foreground font-semibold hover:opacity-90 transition">
                Purchase / வாங்கு
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
