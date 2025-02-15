"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/footer";
import HeaderPolos from "../../components/headerpolos";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    type: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({type: "", message: ""});

    if (!email || !password) {
      setError({
        type: "validation",
        message: "Email and password must be filled"
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
          action: "login",
          username: email.trim(),
          password: password.trim(),
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Cookies.set("userData", JSON.stringify(data.data), { expires: 7 });
        Cookies.set("token", data.data.token, { expires: 7 });
        window.location.href = "/";
      } else {
        if (data.message === "Cannot read properties of null (reading 'password')") {
          setError({
            type: "server",
            message: "Password is incorrect"
          });
        } else {
          setError({
            type: "server", 
            message: data.message || "Login failed. Please check your credentials."
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError({
        type: "network",
        message: "An error occurred. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderPolos />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Shopping Online With Buyly
          </h1>
          <p className="mb-6">
            Get the best shopping experience with various attractive benefits
            for members
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-white text-black rounded"
          >
            Register Now
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
        <div className="flex gap-4 mb-6">
          <button className="font-semibold border-b-2 border-black px-4 py-2 text-black">
            Login
          </button>
          <Link href="/register" className="text-gray-500 px-4 py-2 hover:text-black hover:border-b-2 hover:border-black transition-all duration-300">
            Register
          </Link>
        </div>

        {error.message && (
          <div className={`mb-4 p-3 rounded-lg ${
            error.type === "server" ? "bg-red-100 text-red-700" :
            error.type === "network" ? "bg-orange-100 text-orange-700" :
            error.type === "validation" ? "bg-yellow-100 text-yellow-700" : ""
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
            <label className="block mb-2 text-black">Email or Phone Number</label>
            <input
              type="text"
              className={`w-full p-2 border rounded text-black ${error.type === "validation" && !email ? "border-red-500" : ""}`}
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error.type === "validation") {
                  setError({type: "", message: ""});
                }
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-black">Password</label>
            <input
              type="password"
              className={`w-full p-2 border rounded text-black ${error.type === "validation" && !password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error.type === "validation") {
                  setError({type: "", message: ""});
                }
              }}
            />
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 mb-4 block"
          >
            Forgot Password?
          </Link>

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
            ) : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mb-4">
          or login with
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-2 border rounded text-black hover:bg-gray-50 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 p-2 border rounded text-black hover:bg-gray-50 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="#1877F2"
              />
            </svg>
            Facebook
          </button>
        </div>
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