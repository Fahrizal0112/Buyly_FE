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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    type: "",
    message: ""
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({type: "", message: ""});

    if (!formData.fullName || !formData.username || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      setError({
        type: "validation",
        message: "All field must be filled"
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError({
        type: "password",
        message: "Password and confirm password do not match"
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError({
        type: "password",
        message: "Password must be at least 6 characters"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          ...formData,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          window.location.href = "/login";
        }, 3000);
      } else {
        setError({
          type: "server",
          message: data.message || "Registration failed. Please try again."
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError({
        type: "network",
        message: "An error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error.type === "validation" || (error.type === "password" && ["password", "confirmPassword"].includes(e.target.name))) {
      setError({type: "", message: ""});
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderPolos />
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 transform transition-all duration-500 ease-out scale-100 opacity-100 shadow-2xl max-w-md w-full mx-4">
            <div className="relative">
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center animate-[bounce_1s_ease-in-out_infinite]">
                  <svg
                    className="h-12 w-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Register Success</h3>
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">
                    Welcome to Buyly {formData.fullName}! 🎉
                  </p>
                  <p className="text-gray-500 text-sm">
                    You will be redirected to the login page in a few seconds...
                  </p>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: "10.4s"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

        {error.message && (
          <div className={`mb-4 p-3 rounded-lg ${
            error.type === "server" ? "bg-red-100 text-red-700" :
            error.type === "network" ? "bg-orange-100 text-orange-700" :
            error.type === "validation" ? "bg-yellow-100 text-yellow-700" :
            error.type === "password" ? "bg-blue-100 text-blue-700" : ""
          }`}>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>{error.message}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-black">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 border rounded text-black"
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
              className={`w-full p-2 border rounded text-black ${error.type === "validation" && !formData.username ? "border-red-500" : ""}`}
              placeholder="Choose username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={`w-full p-2 border rounded text-black ${error.type === "validation" && !formData.phone ? "border-red-500" : ""}`}
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full p-2 border rounded text-black ${error.type === "validation" && !formData.email ? "border-red-500" : ""}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full p-2 border rounded text-black ${(error.type === "validation" && !formData.password) || error.type === "password" ? "border-red-500" : ""}`}
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-black">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full p-2 border rounded text-black ${(error.type === "validation" && !formData.confirmPassword) || error.type === "password" ? "border-red-500" : ""}`}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded mb-4 hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : "Register"}
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
              Collect points from each transaction and exchange for
              attractive gifts
            </p>
          </div>
          <div className="text-center p-4">
            <div className="mb-4">🚚</div>
            <h3 className="font-semibold mb-2 text-black">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Enjoy free shipping for purchases with a minimum amount
            </p>
          </div>
          <div className="text-center p-4">
            <div className="mb-4">🔔</div>
            <h3 className="font-semibold mb-2 text-black">
              Exclusive Notifications
            </h3>
            <p className="text-sm text-gray-600">
              Get first information about promotions and new products
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}