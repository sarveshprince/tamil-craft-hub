import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type UserRole = 'customer' | 'maker' | null;

export interface Product {
  id: string;
  nameEn: string;
  nameTa: string;
  price: number;
  image: string;
  category: 'palm' | 'coconut';
  description: string;
  descriptionTa: string;
  isDraft?: boolean;
  addedBy?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  user: UserRole;
  username: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  purchaseCart: () => void;
  drafts: Omit<Product, 'id'>[];
  saveDraft: (product: Omit<Product, 'id'>) => void;
  syncDrafts: () => void;
  isOnline: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

// Product images will be imported in the component
import palmLeafBasket from '@/assets/products/palm-leaf-basket.jpg';
import coconutShellBowl from '@/assets/products/coconut-shell-bowl.jpg';
import palmFrondFan from '@/assets/products/palm-frond-fan.jpg';
import huskDoorMat from '@/assets/products/husk-door-mat.jpg';
import palmLeafHat from '@/assets/products/palm-leaf-hat.jpg';
import coconutShellSpoon from '@/assets/products/coconut-shell-spoon.jpg';
import palmLeafMat from '@/assets/products/palm-leaf-mat.jpg';
import coconutFiberBroom from '@/assets/products/coconut-fiber-broom.jpg';
import decorativeKottan from '@/assets/products/decorative-kottan.jpg';
import coconutBirdHouse from '@/assets/products/coconut-bird-house.jpg';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', nameEn: 'Palm Leaf Basket', nameTa: 'பனை ஓலை பெட்டி', price: 450, image: palmLeafBasket, category: 'palm', description: 'Handwoven basket made from dried palm leaves, perfect for storage and decoration.', descriptionTa: 'உலர்ந்த பனை ஓலைகளால் கைவினைப்பொருளாக நெய்யப்பட்ட கூடை.' },
  { id: '2', nameEn: 'Coconut Shell Bowl', nameTa: 'தேங்காய் சிரட்டை கிண்ணம்', price: 250, image: coconutShellBowl, category: 'coconut', description: 'Polished coconut shell bowl, ideal for serving or decoration.', descriptionTa: 'மெருகேற்றப்பட்ட தேங்காய் ஓடு கிண்ணம்.' },
  { id: '3', nameEn: 'Palm Frond Fan', nameTa: 'பனை ஓலை விசிறி', price: 150, image: palmFrondFan, category: 'palm', description: 'Traditional hand fan crafted from palm fronds.', descriptionTa: 'பனை ஓலையால் செய்யப்பட்ட பாரம்பரிய கை விசிறி.' },
  { id: '4', nameEn: 'Husk Door Mat', nameTa: 'தேங்காய் நார் மிதியடி', price: 350, image: huskDoorMat, category: 'coconut', description: 'Durable doormat woven from coconut husk fibers.', descriptionTa: 'தேங்காய் நாரால் நெய்யப்பட்ட உறுதியான மிதியடி.' },
  { id: '5', nameEn: 'Palm Leaf Hat', nameTa: 'பனை ஓலை தொப்பி', price: 200, image: palmLeafHat, category: 'palm', description: 'Lightweight sun hat woven from palm leaves.', descriptionTa: 'பனை ஓலையால் நெய்யப்பட்ட இலகுவான தொப்பி.' },
  { id: '6', nameEn: 'Coconut Shell Spoon', nameTa: 'தேங்காய் சிரட்டை கரண்டி', price: 120, image: coconutShellSpoon, category: 'coconut', description: 'Eco-friendly spoon carved from coconut shell.', descriptionTa: 'தேங்காய் ஓட்டில் செதுக்கப்பட்ட சுற்றுச்சூழல் நட்பு கரண்டி.' },
  { id: '7', nameEn: 'Palm Leaf Mat', nameTa: 'பனை ஓலை பாய்', price: 600, image: palmLeafMat, category: 'palm', description: 'Traditional woven mat from palm leaves for floor seating.', descriptionTa: 'தரையில் அமர பனை ஓலையால் நெய்யப்பட்ட பாரம்பரிய பாய்.' },
  { id: '8', nameEn: 'Coconut Fiber Broom', nameTa: 'தேங்காய் நார் விளக்குமாறு', price: 180, image: coconutFiberBroom, category: 'coconut', description: 'Sturdy broom made from coconut fiber.', descriptionTa: 'தேங்காய் நாரால் செய்யப்பட்ட வலுவான விளக்குமாறு.' },
  { id: '9', nameEn: 'Decorative Kottan', nameTa: 'பனை ஓலை கொட்டான்', price: 550, image: decorativeKottan, category: 'palm', description: 'Colorful decorative kottan basket, a Tamil Nadu specialty.', descriptionTa: 'வண்ணமயமான அலங்கார கொட்டான், தமிழ்நாட்டின் சிறப்பு.' },
  { id: '10', nameEn: 'Coconut Bird House', nameTa: 'தேங்காய் சிரட்டை குருவி கூடு', price: 300, image: coconutBirdHouse, category: 'coconut', description: 'Handmade bird house from coconut shell.', descriptionTa: 'தேங்காய் ஓட்டால் செய்யப்பட்ட குருவி கூடு.' },
];

const CREDENTIALS = {
  customer: { username: 'eco_shopper01', password: 'palmClient2026' },
  maker: { username: 'artisan_rural_01', password: 'craftMaster55' },
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserRole>(null);
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drafts, setDrafts] = useState<Omit<Product, 'id'>[]>(() => {
    const saved = localStorage.getItem('magalir-drafts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('magalir-drafts', JSON.stringify(drafts));
  }, [drafts]);

  // Auto-sync drafts when coming online
  useEffect(() => {
    if (isOnline && drafts.length > 0 && user === 'maker') {
      syncDrafts();
    }
  }, [isOnline]);

  const login = useCallback((u: string, p: string): boolean => {
    if (u === CREDENTIALS.customer.username && p === CREDENTIALS.customer.password) {
      setUser('customer');
      setUsername(u);
      return true;
    }
    if (u === CREDENTIALS.maker.username && p === CREDENTIALS.maker.password) {
      setUser('maker');
      setUsername(u);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setUsername('');
    setCart([]);
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  }, []);

  const purchaseCart = useCallback(() => {
    const purchasedIds = cart.map(item => item.product.id);
    setProducts(prev => prev.filter(p => !purchasedIds.includes(p.id)));
    setCart([]);
  }, [cart]);

  const saveDraft = useCallback((product: Omit<Product, 'id'>) => {
    setDrafts(prev => [...prev, { ...product, isDraft: true }]);
  }, []);

  const syncDrafts = useCallback(() => {
    drafts.forEach(draft => {
      addProduct({ ...draft, isDraft: false });
    });
    setDrafts([]);
  }, [drafts, addProduct]);

  return (
    <StoreContext.Provider value={{ user, username, login, logout, products, addProduct, removeProduct, cart, addToCart, removeFromCart, purchaseCart, drafts, saveDraft, syncDrafts, isOnline }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
