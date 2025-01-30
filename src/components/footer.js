import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white mt-12 py-8 border-t">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="/" className="inline-block">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-black to-gray-500 text-transparent bg-clip-text hover:opacity-100">
                Buyly
              </h2>
            </a>
            <p className="text-sm text-gray-600">
              Toko ini menjual berbagai e-commerce kebutuhan dengan harga yang
              terjangkau
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-black to-gray-50 text-transparent bg-clip-text">
              Kebijakan
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Kebijakan Pengembalian
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-black to-gray-50 text-transparent bg-clip-text">
              Ikuti Kami
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
