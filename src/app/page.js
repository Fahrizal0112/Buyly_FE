"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3001/api/v1/products"),
          fetch("http://localhost:3001/api/v1/category"),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.data);
        setCategories(categoriesData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const searchCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      if (categoryId === '') {
        // Jika tidak ada kategori yang dipilih, tampilkan semua produk
        const response = await fetch("http://localhost:3001/api/v1/products");
        const data = await response.json();
        setProducts(data.data);
      } else {
        // Jika kategori dipilih, filter berdasarkan kategori
        const response = await fetch(`http://localhost:3001/api/v1/products?categoryId=${categoryId}`);
        const data = await response.json();
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/v1/products?name=${searchQuery}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error searching products:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Buyly</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center">
            <span className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </span>
          </button>
          <button className="px-4 py-2 border rounded-md text-black">Login</button>
          <button className="px-4 py-2 bg-black text-white rounded-md">Register</button>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-6">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search product..."
              className="w-full px-4 py-2 border rounded-md pr-10 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
            <button onClick={() => handleSearch({ key: 'Enter' })} className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2">
            <span className="text-black">Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2">
            <span className="text-black">Sort</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="font-semibold mb-4 text-black">Category</h2>
              <div className="space-y-2">
                <div 
                  onClick={() => searchCategory('')}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${selectedCategory === '' ? 'bg-gray-100' : ''}`}
                >
                  <span className="text-black">All Categories</span>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => searchCategory(category.id)}
                    className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-gray-100' : ''}`}
                  >
                    <span className="text-black">{category.name}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-semibold mt-6 mb-4 text-black">Price</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Min" className="w-full px-3 py-2 border rounded-md" />
                <input type="text" placeholder="Max" className="w-full px-3 py-2 border rounded-md" />
                <button className="w-full bg-black text-white py-2 rounded-md">Search</button>
              </div>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : products.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Product with name "{searchQuery}" not found</h3>
                <p className="text-gray-600">Sorry, the product you are looking for is not available.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden">
                  <div className="aspect-square relative group">
                    <Image
                      src={product.photo_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-black">{product.name}</h3>
                    <p className=" text-sm text-black">{product.category.name}</p>
                    <span className="text-gray-400">
                      Stock: {product.stock}
                      {product.stock < 20 && <span className="text-red-500 ml-1">(Stock low!)</span>}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-black">4.5</span>
                      <span className="text-gray-400">(120)</span>
                    </div>
                    <p className="font-bold mt-2 text-black">Rp {product.price.toLocaleString("id-ID")}</p>
                    <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
