import React from 'react'

function Navbar() {
  return (
    <nav className="container w-full mx-auto p-6 flex justify-between items-center sticky top-0 bg-gray-900 backdrop-blur-sm z-10 shadow-md">
    <div className="text-3xl font-extrabold text-blue-400 tracking-tight">biskra billboard</div>
    <div className="hidden md:flex space-x-8 space-x-reverse items-center">
      <a href="/" className="text-lg text-white hover:text-blue-400 transition-colors duration-300">الرئيسية</a>
      <a href="#" className="text-lg text-white hover:text-blue-400 transition-colors duration-300">الأسعار</a>
      <a href="/map" className="text-lg text-white hover:text-blue-400 transition-colors duration-300">المواقع</a>
      <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105">
        رفع إعلان
      </button>
    </div>
  </nav>
  )
}

export default Navbar