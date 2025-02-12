"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Link from "next/link"

export default function Error() {
    return(
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-9xl font-bold text-gray-900">404</h1>
                <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4 text-center max-w-md">
                    Sorry, the page you search not found.
                </p>
                <Link 
                    href="/"
                    className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Back To Home
                </Link>
            </div>
            <Footer />
        </div>
    )
}