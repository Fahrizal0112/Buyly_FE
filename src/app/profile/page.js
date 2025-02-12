"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Cookies from "js-cookie";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    photo_url: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    zip_code: ""
  });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const userDataString = Cookies.get("userData");
    if (userDataString) {
      const user = JSON.parse(userDataString);
      setUserData(user);
      setFormData({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
        photo_url: user.photo_url || "",
        email: user.email || "",
        password: "",
        street: user.address?.street || "",
        city: user.address?.city || "", 
        state: user.address?.state || "",
        zip_code: user.address?.zip_code || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const token = Cookies.get("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const userResponse = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({
          action: "update",
          name: formData.name,
          username: formData.username,
          phone: formData.phone,
          photo_url: formData.photo_url,
          email: formData.email,
          password: formData.password || undefined
        })
      });

      const addressResponse = await fetch("http://localhost:3001/api/v1/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code
        })
      });

      if (!userResponse.ok || !addressResponse.ok) {
        const userError = await userResponse.text();
        const addressError = await addressResponse.text();
        throw new Error(`User: ${userError}, Address: ${addressError}`);
      }

      const userData = await userResponse.json();
      Cookies.get("userData", JSON.stringify(userData.data));
      window.location.reload();

    } catch (err) {
      console.error("Error:", err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar (JPG, PNG, GIF)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran gambar tidak boleh lebih dari 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo_url: reader.result
        });
        setImageError(false);
        setError('');
      };
      reader.onerror = () => {
        setError('Gagal membaca file gambar');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-black">Update Profile</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 relative rounded-full overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Image
                    src={formData.photo_url || "/default-avatar.jpg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                    onError={() => {
                      setImageError(true);
                      setFormData({
                        ...formData,
                        photo_url: "/default-avatar.jpg"
                      });
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">Ubah Foto</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto
                </label>
                <input
                  type="url"
                  name="photo_url"
                  value={formData.photo_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4 text-black">Alamat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jalan
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kota
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? "Memperbarui..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
