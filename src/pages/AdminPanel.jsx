import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, PlusCircle, ShoppingCart, Users, Settings, 
  LogOut, TrendingUp, DollarSign, Box, AlertTriangle, Trash2, Edit, CheckCircle, Search 
} from 'lucide-react';
import API from '../services/api';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Product Form State
  const [form, setForm] = useState({
    name: '', brand: '', description: '', category: '', gender: 'Unisex',
    fragranceType: 'Eau de Parfum', longevity: 'Long Lasting (6-8 hours)'
  });
  const [variants, setVariants] = useState([
    { size: '5ml', bottleVolume: '', price: 500, stock: 20, sku: 'PERF-5ML' },
    { size: 'Full Bottle', bottleVolume: '100ml', price: 5500, stock: 10, sku: 'PERF-100ML' }
  ]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await API.get('/analytics/dashboard');
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: '10ml', bottleVolume: '', price: 850, stock: 15, sku: 'PERF-VAR' }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('brand', form.brand);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('gender', form.gender);
      formData.append('fragranceType', form.fragranceType);
      formData.append('longevity', form.longevity);
      formData.append('variants', JSON.stringify(variants));

      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      await API.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Perfume product uploaded successfully!');
      setActiveTab('products');
      fetchProducts();
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to upload product');
    }
  };

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this perfume?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
        fetchDashboardData();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#FFF9FA] text-neutral-800 font-['Roboto_Mono',monospace] overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-neutral-300 flex flex-col justify-between hidden md:flex border-r border-neutral-800">
        <div>
          <div className="h-20 flex items-center px-6 bg-neutral-950 border-b border-neutral-800">
            <span className="text-xl font-bold tracking-widest text-pink-500 uppercase">Rosette<span className="text-white">Admin</span></span>
          </div>
          <nav className="p-4 space-y-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-pink-600 text-white font-bold' : 'hover:bg-neutral-800 text-neutral-400'}`}>
              <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'products' ? 'bg-pink-600 text-white font-bold' : 'hover:bg-neutral-800 text-neutral-400'}`}>
              <Package className="w-5 h-5" /> <span>Products</span>
            </button>
            <button onClick={() => setActiveTab('upload')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'upload' ? 'bg-pink-600 text-white font-bold' : 'hover:bg-neutral-800 text-neutral-400'}`}>
              <PlusCircle className="w-5 h-5" /> <span>Add Perfume</span>
            </button>
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${activeTab === 'orders' ? 'bg-pink-600 text-white font-bold' : 'hover:bg-neutral-800 text-neutral-400'}`}>
              <ShoppingCart className="w-5 h-5" /> <span>Orders</span>
            </button>
          </nav>
        </div>
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-500 text-center">
          rosettescents v1.0 Secure Panel
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-pink-100 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-neutral-900 capitalize">{activeTab} Management</h1>
          <div className="flex items-center space-x-3">
            <button onClick={() => setActiveTab('upload')} className="px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-xl hover:bg-pink-700 transition">
              + Add New Perfume
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                  <p className="text-xs text-neutral-500 uppercase font-semibold">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-pink-600 mt-2">৳{stats.totalRevenue}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                  <p className="text-xs text-neutral-500 uppercase font-semibold">Total Orders</p>
                  <h3 className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalOrders}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                  <p className="text-xs text-neutral-500 uppercase font-semibold">Total Products</p>
                  <h3 className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalProducts}</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                  <p className="text-xs text-neutral-500 uppercase font-semibold">Total Visitors</p>
                  <h3 className="text-3xl font-bold text-neutral-900 mt-2">{stats.totalVisitors}</h3>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS LIST TAB */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-50 border-b border-pink-100 text-xs text-neutral-500 uppercase">
                    <th className="py-4 px-6">Perfume</th>
                    <th className="py-4 px-4">Brand</th>
                    <th className="py-4 px-4">Variants & Pricing</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 text-sm">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-pink-50/50">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <img src={`http://localhost:5000${p.images[0]}`} alt="" className="w-12 h-12 rounded-xl object-cover bg-pink-50" />
                        <span className="font-bold text-neutral-800">{p.name}</span>
                      </td>
                      <td className="py-4 px-4 text-pink-600 font-semibold">{p.brand}</td>
                      <td className="py-4 px-4 text-xs text-neutral-600">
                        {p.variants?.map((v, i) => <div key={i}>{v.size} {v.bottleVolume ? `(${v.bottleVolume})` : ''} : ৳{v.price} (Stock: {v.stock})</div>)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => deleteProduct(p._id)} className="p-2 text-neutral-400 hover:text-red-500 transition"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ADD PRODUCT TAB */}
          {activeTab === 'upload' && (
            <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 border-b pb-4">Add New Perfume Product</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Perfume Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Royal Oud Luxury" className="w-full p-3 rounded-xl border border-pink-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Brand Name *</label>
                  <input type="text" required value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} placeholder="e.g. Tom Ford / Creed" className="w-full p-3 rounded-xl border border-pink-200 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Description *</label>
                <textarea required rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Rich oriental fragrance notes..." className="w-full p-3 rounded-xl border border-pink-200 text-sm"></textarea>
              </div>

              {/* VARIANT SYSTEM */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-neutral-900">Size & Price Variants (5ml, 10ml, Full Bottle, etc.)</h3>
                  <button type="button" onClick={handleAddVariant} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg text-xs font-bold">+ Add Size Variant</button>
                </div>
                {variants.map((v, index) => (
                  <div key={index} className="grid grid-cols-2 sm:grid-cols-6 gap-3 items-center bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">Size</label>
                      <select value={v.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-full p-2 rounded-lg border border-pink-200 text-xs">
                        <option value="5ml">5 ml</option>
                        <option value="10ml">10 ml</option>
                        <option value="15ml">15 ml</option>
                        <option value="30ml">30 ml</option>
                        <option value="50ml">50 ml</option>
                        <option value="Full Bottle">Full Bottle</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">Bottle Volume</label>
                      <input type="text" value={v.bottleVolume} onChange={e => handleVariantChange(index, 'bottleVolume', e.target.value)} placeholder="e.g. 100ml" className="w-full p-2 rounded-lg border border-pink-200 text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">Price (৳)</label>
                      <input type="number" value={v.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} className="w-full p-2 rounded-lg border border-pink-200 text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">Stock</label>
                      <input type="number" value={v.stock} onChange={e => handleVariantChange(index, 'stock', e.target.value)} className="w-full p-2 rounded-lg border border-pink-200 text-xs" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-500">SKU</label>
                      <input type="text" value={v.sku} onChange={e => handleVariantChange(index, 'sku', e.target.value)} className="w-full p-2 rounded-lg border border-pink-200 text-xs" />
                    </div>
                    <div className="pt-4 text-right">
                      {variants.length > 1 && <button type="button" onClick={() => handleRemoveVariant(index)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                  </div>
                ))}
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-2 border-t pt-4">
                <label className="block text-xs font-bold uppercase text-neutral-600">Product Images (Multiple)</label>
                <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} className="w-full p-3 rounded-xl border border-pink-200 text-sm bg-pink-50/50" />
              </div>

              <button type="submit" className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200">
                Save & Publish Perfume
              </button>
            </form>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Customer Orders ({orders.length})</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="p-4 rounded-2xl border border-pink-100 bg-pink-50/30 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-neutral-800">Order ID: {order._id}</h4>
                      <p className="text-xs text-neutral-500">Customer: {order.shippingAddress?.fullName} | Total: ৳{order.totalPrice}</p>
                      <p className="text-xs text-pink-600 font-semibold mt-1">Status: {order.orderStatus} | Payment: {order.paymentMethod}</p>
                    </div>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-bold">{order.orderStatus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}