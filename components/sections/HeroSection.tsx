"use client";

import React, { useState } from "react";

export default function HeroSection() {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const handleConfirm = () => {
    console.log("Xác nhận mã nhân viên:", employeeId);
    setShowAuthPopup(false);

    setTimeout(() => {
      const voteSection = document.getElementById("vote");
      if (voteSection) {
        voteSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-midnight">
      {/* 1. LAYER NỀN: HIỆU ỨNG ÁNH SÁNG & SAO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,215,0,0.25)_0%,rgba(100,80,0,0.08)_40%,rgba(10,10,10,1)_70%)]" />
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Các luồng sáng lấp lánh */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-golden/15 rounded-full blur-[120px] animate-pulse shadow-[0_0_80px_rgba(255,215,0,0.2)]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dark-blue/25 rounded-full blur-[150px] shadow-[0_0_100px_rgba(70,130,180,0.15)]" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-golden/10 rounded-full blur-[160px]" />
      </div>

      {/* 2. LAYER NỘI DUNG CHÍNH */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center">
          {/* Header dẫn dắt */}
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-golden" />
            <p className="text-golden-light text-[10px] sm:text-xs font-black tracking-[0.5em] uppercase">
              Techvify Presents
            </p>
            <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-golden" />
          </div>

          {/* Tiêu đề chính với hiệu ứng Golden Gradient */}
          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 blur-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,215,0,0.3)_0%,rgba(255,215,0,0.1)_40%,transparent_70%)]" />
            <h1 className="relative text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] bg-linear-to-b from-golden-light via-golden to-golden-dark bg-clip-text text-transparent drop-shadow-[0_20px_25px_rgba(255,215,0,0.2),0_10px_10px_rgba(0,0,0,0.6)]">
              A Night <br />
              <span className="text-5xl sm:text-7xl lg:text-8xl">of Stars</span>
            </h1>
          </div>

          {/* Thông tin sự kiện */}
          <div className="mb-10 text-center animate-in fade-in duration-1000 delay-300">
            <p className="text-white/80 text-sm sm:text-lg font-medium tracking-widest mb-2">
              Lễ trao giải Oscar Techvify • 30.01.2026
            </p>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Vinh danh những cá nhân xuất sắc và những đóng góp vượt bậc. Sự
              hiện diện của bạn làm nên linh hồn của buổi tiệc.
            </p>
          </div>

          {/* Nút bấm kích hoạt Popup (Đã sửa lỗi onClick) */}
          <div className="flex flex-col sm:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button
              onClick={() => setShowAuthPopup(true)}
              className="group relative cursor-pointer px-10 py-4 overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,215,0,0.4)]"
            >
              <div className="absolute inset-0 bg-linear-to-r from-golden-dark via-golden-light to-golden-dark" />
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative text-midnight font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                Bắt đầu bình chọn
              </span>
            </button>
          </div>

          {/* Chỉ báo cuộn trang */}
          <div className="mt-16 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-golden text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">
              Scroll
            </span>
            <div className="relative w-px h-16 bg-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-golden animate-[scroll-down_2s_infinite_ease-in-out]" />
            </div>
          </div>
        </div>
      </div>

      {/* POPUP XÁC THỰC (Đã sửa lỗi dư thừa thẻ div) */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-midnight border border-golden/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-golden/10 rounded-full blur-3xl" />

            <div className="relative">
              <h4 className="text-golden text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Xác thực danh tính
              </h4>
              <p className="text-white text-2xl font-black uppercase mb-8 leading-tight">
                Nhập mã nhân viên
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest pl-1">
                    Mã số nhân viên của bạn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: TVF12345"
                    value={employeeId}
                    onChange={(e) =>
                      setEmployeeId(e.target.value.toUpperCase())
                    }
                    className="w-full bg-dark-blue/40 border border-white/10 rounded-xl p-4 text-white text-lg font-bold focus:border-golden/50 outline-none transition-all placeholder:text-gray-700"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleConfirm}
                    className="cursor-pointer w-full py-4 bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_20px_rgba(138,110,47,0.3)] hover:shadow-golden/40 transition-all active:scale-95"
                  >
                    XÁC NHẬN TRUY CẬP
                  </button>
                  <button
                    onClick={() => setShowAuthPopup(false)}
                    className="cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    HỦY BỎ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
