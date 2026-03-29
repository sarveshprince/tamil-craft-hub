import { useStore } from '@/context/StoreContext';
import { useState } from 'react';
import { WifiOff, Upload, Save, RefreshCw, Trash2 } from 'lucide-react';
import VoiceInput from '@/components/VoiceInput';
import palmLeafBasket from '@/assets/products/palm-leaf-basket.jpg';

const MakerDashboard = () => {
  const { products, addProduct, removeProduct, drafts, saveDraft, syncDrafts, isOnline } = useStore();
  const [form, setForm] = useState({
    nameEn: '', nameTa: '', price: '', category: 'palm' as 'palm' | 'coconut',
    description: '', descriptionTa: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    const product = {
      nameEn: form.nameEn,
      nameTa: form.nameTa,
      price: Number(form.price),
      image: imagePreview || palmLeafBasket,
      category: form.category,
      description: form.description,
      descriptionTa: form.descriptionTa,
      addedBy: 'artisan_rural_01',
    };

    if (asDraft || !isOnline) {
      saveDraft(product);
      setSuccess(isOnline ? 'Saved as draft! / வரைவாக சேமிக்கப்பட்டது!' : 'Offline - saved as draft / ஆஃப்லைன் - வரைவாக சேமிக்கப்பட்டது');
    } else {
      addProduct(product);
      setSuccess('Product added! / பொருள் சேர்க்கப்பட்டது!');
    }

    setForm({ nameEn: '', nameTa: '', price: '', category: 'palm', description: '', descriptionTa: '' });
    setImagePreview(null);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-gradient-warm">Maker Dashboard</h1>
          <p className="font-tamil text-muted-foreground mt-2">கைவினைஞர் பலகை</p>
        </div>

        {!isOnline && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-xl text-sm">
            <WifiOff className="w-4 h-4 text-destructive" />
            <span>You are offline. Products will be saved as drafts and synced when connection is restored.</span>
          </div>
        )}

        {drafts.length > 0 && (
          <div className="card-3d-shadow bg-card rounded-xl p-4 mb-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{drafts.length} draft(s) pending / {drafts.length} வரைவு(கள்) நிலுவையில்</p>
                <p className="text-sm text-muted-foreground">Will sync when online</p>
              </div>
              {isOnline && (
                <button onClick={syncDrafts} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition">
                  <RefreshCw className="w-4 h-4" /> Sync Now
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="card-3d card-3d-shadow bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-display font-bold mb-4">Add Product / பொருள் சேர்</h2>
            {success && <p className="text-secondary text-sm mb-4 font-semibold">{success}</p>}
            <form onSubmit={e => handleSubmit(e)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Image / பொருள் படம்</label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-border" />
                  ) : (
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition text-sm font-medium">
                    <Upload className="w-4 h-4" /> Choose File
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name (English)</label>
                <input value={form.nameEn} onChange={e => setForm({ ...form, nameEn: e.target.value })} required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name (Tamil / தமிழ்)</label>
                <input value={form.nameTa} onChange={e => setForm({ ...form, nameTa: e.target.value })} required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 font-tamil" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required min="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as 'palm' | 'coconut' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="palm">🌴 Palm / பனை</option>
                  <option value="coconut">🥥 Coconut / தேங்காய்</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium">Description (English)</label>
                  <VoiceInput lang="en-IN" label="🎤 English" onResult={(text) => setForm(f => ({ ...f, description: f.description ? f.description + ' ' + text : text }))} />
                </div>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium">Description (Tamil / தமிழ்)</label>
                  <VoiceInput lang="ta-IN" label="🎤 தமிழ்" onResult={(text) => setForm(f => ({ ...f, descriptionTa: f.descriptionTa ? f.descriptionTa + ' ' + text : text }))} />
                </div>
                <textarea value={form.descriptionTa} onChange={e => setForm({ ...form, descriptionTa: e.target.value })} required rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none font-tamil" />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-warm text-primary-foreground font-semibold hover:opacity-90 transition">
                  <Upload className="w-4 h-4" /> Publish / வெளியிடு
                </button>
                <button type="button" onClick={e => handleSubmit(e as any, true)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition">
                  <Save className="w-4 h-4" /> Draft / வரைவாக சேமி
                </button>
              </div>
            </form>
          </div>

          {/* Product List */}
          <div>
            <h2 className="text-xl font-display font-bold mb-4">Your Products ({products.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {products.map(p => (
                <div key={p.id} className="card-3d-shadow bg-card rounded-xl p-3 flex items-center gap-3 border border-border">
                  <img src={p.image} alt={p.nameEn} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{p.nameEn}</h3>
                    <p className="font-tamil text-xs text-muted-foreground truncate">{p.nameTa}</p>
                  </div>
                  <span className="font-bold text-sm text-gradient-warm">₹{p.price}</span>
                  <button onClick={() => removeProduct(p.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition" title="Remove product">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakerDashboard;
