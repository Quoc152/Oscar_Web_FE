'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black z-0">
        {/* Animated gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="mb-12">
          {/* Logo and Title Section */}
          <div className="space-y-6">
            {/* Event branding */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <span className="text-gray-400 text-sm font-bold tracking-widest">LÀNSÓNG XANH 28</span>
              <div className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-gray-400 text-sm font-bold tracking-widest">MUSIC AWARDS</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary tracking-tighter">
                LÀNSÓNG
                <br />
                XANH 28
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl font-light tracking-widest">
                CON RỒNG CHÁU TIÊN
              </p>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Bình chọn các nghệ sĩ yêu thích nhất của bạn trong Làn Sóng Xanh 2025. Tham gia cộng đồng và làm nên sự khác biệt.
            </p>

            {/* CTA Button */}
            <div className="flex gap-4 justify-center pt-6">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-cyan-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
                BẮT ĐẦU BÌNH CHỌN
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all duration-300">
                TÌM HIỂU THÊM
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-md mx-auto">
          <div className="h-32 bg-gradient-to-br from-cyan-500/10 to-primary/10 rounded-lg backdrop-blur-sm border border-primary/20" />
          <div className="h-32 bg-gradient-to-br from-primary/20 to-cyan-400/20 rounded-lg backdrop-blur-sm border border-primary/30" />
          <div className="h-32 bg-gradient-to-br from-cyan-500/10 to-primary/10 rounded-lg backdrop-blur-sm border border-primary/20" />
        </div>
      </div>
    </section>
  );
}
