"use client";

import React from "react";
import Image from "next/image";

const DEVELOPERS = [
  {
    name: "Ken",
    role: "FE Developer",
    image: "/developer/Ken.jpg",
  },
  {
    name: "Toby",
    role: "BE Developer",
    image: "/developer/Toby.jpg",
  },
  {
    name: "Mike",
    role: "DevOps Developer",
    image: "",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 bg-linear-to-b from-background via-background/50 to-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-125 h-125 bg-golden/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-125 h-125 bg-dark-blue/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            Techvify Oscar Awards 2026
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">
            A Night of Stars
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Làn Sóng Xanh là chương trình trao giải âm nhạc hàng năm lớn nhất
              tại Việt Nam, được tổ chức bởi Đài Truyền hình Công Công Việt Nam
              (VTV). Chương trình có mục đích tôn vinh những giá trị tốt đẹp
              trong âm nhạc và công nhân bằng tấm lòng sáng tạo, đóng góp tích
              cực cho phát triển nền âm nhạc Việt.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">28</div>
              <h3 className="text-white font-bold mb-2">NĂM THÀNH CÔNG</h3>
              <p className="text-gray-400 text-sm">
                Hơn hai mươi tám năm liên tục kết nối những tâm hồn yêu nhạc
              </p>
            </div>

            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">1000+</div>
              <h3 className="text-white font-bold mb-2">NGHỆ SĨ</h3>
              <p className="text-gray-400 text-sm">
                Hơn một ngàn nghệ sĩ đã tham gia và nhận vinh danh
              </p>
            </div>

            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">100M+</div>
              <h3 className="text-white font-bold mb-2">LƯỢT BÌNH CHỌN</h3>
              <p className="text-gray-400 text-sm">
                Hàng trăm triệu lượt bình chọn từ khán giả trên toàn quốc
              </p>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full" />
              ĐỐI TÁC CÔNG NGHỆ
            </h3>
            <p className="text-gray-400 mb-4">
              Techvify Oscar Awards 2026 được hỗ trợ bởi các đơn vị công nghệ
              hàng đầu
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="text-sm text-gray-500 font-bold">EVENTISTA</div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-sm text-gray-500 font-bold">
                BRANDING PARTNER
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="flex flex-col items-center justify-center">
            {/* Label vinh danh */}
            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-12 flex items-center gap-4 before:h-px before:w-8 before:bg-white/10 after:h-px after:w-8 after:bg-white/10">
              Developed By
            </h3>

            {/* Grid tối ưu cho 3 ô: 1 cột trên Mobile, 2 cột trên Tablet, 3 cột trên Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-5xl px-4">
              {DEVELOPERS.map((dev) => (
                <div
                  key={dev.name}
                  className="group relative flex flex-col items-center"
                >
                  {/* Glow hiệu ứng phía sau */}
                  <div className="absolute inset-0 bg-golden/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                  {/* Box chính */}
                  <div className="relative w-full flex flex-col items-center p-6 md:p-8 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl hover:border-golden/50 hover:-translate-y-2 transition-all duration-500">
                    {/* Avatar Container */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
                      <Image
                        src={dev.image || "/avatar_default.jpg"}
                        alt={dev.name}
                        fill
                        sizes="(max-width: 768px) 96px, 112px"
                        className="rounded-full object-cover transition-all duration-700 ring-4 ring-white/5 group-hover:ring-golden/50"
                      />
                    </div>

                    {/* Thông tin Dev */}
                    <span className="text-gray-400 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase group-hover:text-golden transition-colors text-center">
                      {dev.name}
                    </span>
                    <span className="text-[8px] text-gray-600 mt-1 uppercase tracking-tighter text-center">
                      {dev.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Metadata cuối trang */}
            <p className="mt-12 text-[9px] text-gray-600 tracking-[0.3em] uppercase opacity-50">
              Official Technology Partner 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
