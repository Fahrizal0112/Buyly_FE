"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import HeaderPolos from "../../components/headerpolos";
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika register akan diimplementasikan di sini
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderPolos />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
        <div className="flex gap-4 mb-6">
          <Link 
            href="/login" 
            className="text-gray-500 px-4 py-2 hover:text-black hover:border-b-2 hover:border-black transition-all duration-300"
          >
            Login
          </Link>
          <button className="font-semibold border-b-2 border-black px-4 py-2 text-black">
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-black">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 border rounded"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-black">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border rounded"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded mb-4 hover:bg-gray-800 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
      {/* Benefits Section */}
      <div className="py-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-black">
          Benefits of Becoming a Member
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-4">
            <div className="mb-4">🏷️</div>
            <h3 className="font-semibold mb-2 text-black">
              Exclusive Promotions
            </h3>
            <p className="text-sm text-gray-600">
              Get exclusive discounts and special offers only for members
            </p>
          </div>
          <div className="text-center p-4">
            <div className="mb-4">⭐</div>
            <h3 className="font-semibold mb-2 text-black">Reward Points</h3>
            <p className="text-sm text-gray-600">
              Collect points from each transaction and exchange them for
              attractive prizes
            </p>
          </div>
          <div className="text-center p-4">
            <div className="mb-4">🚚</div>
            <h3 className="font-semibold mb-2 text-black">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Enjoy free shipping for purchases of a minimum amount
            </p>
          </div>
          <div className="text-center p-4">
            <div className="mb-4">🔔</div>
            <h3 className="font-semibold mb-2 text-black">
              Exclusive Notifications
            </h3>
            <p className="text-sm text-gray-600">
              Get the first information about promotions and new products
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}