"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationPopup from "@/components/ui/NotificationPopup";
import CountdownTimer from "@/components/sections/CountdownTimer";

export default function HeroSection() {
  const { isAuthenticated, login } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });

  const showNotification = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    title?: string,
  ) => {
    setNotification({ show: true, type, message, title });
  };

  const handleStartVoting = () => {
    // Kiểm tra localStorage trước
    if (isAuthenticated) {
      scrollToVoteSection();
    } else {
      setShowAuthPopup(true);
    }
  };

  const scrollToVoteSection = () => {
    setTimeout(() => {
      const voteSection = document.getElementById("vote");
      if (voteSection) {
        const headerHeight = 80; // Chiều cao header
        const elementPosition =
          voteSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleConfirm = async () => {
    if (!employeeId.trim()) {
      setError("Vui lòng nhập mã nhân viên");
      return;
    }

    // Kiểm tra format mã nhân viên
    if (employeeId.trim().length < 4) {
      setError("Mã nhân viên không hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(employeeId.trim());
      setShowAuthPopup(false);
      setEmployeeId("");

      // Thông báo đăng nhập thành công
      showNotification(
        "success",
        "Chào mừng bạn đến với Oscar Techvify 2026!",
        "Đăng nhập thành công",
      );

      scrollToVoteSection();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra mã nhân viên.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-dvh flex items-center justify-center pt-20 bg-background">
      {" "}
      {/* 1. LAYER NỀN: HIỆU ỨNG ÁNH SÁNG & SAO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(0,96,255,0.25)_0%,rgba(0,96,255,0.08)_40%,rgba(1,1,15,1)_70%)]" />
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Các luồng sáng lấp lánh */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[120px] animate-pulse shadow-[0_0_80px_rgba(0,96,255,0.2)]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] shadow-[0_0_100px_rgba(223,61,204,0.15)]" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-[160px]" />
      </div>
      {/* 2. LAYER NỘI DUNG CHÍNH */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex flex-col items-center">
          {/* Header dẫn dắt */}
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-primary" />
            <p className="text-gradient-tech text-[10px] sm:text-xs font-black tracking-[0.5em] uppercase">
              Techvify Oscar Awards 2026
            </p>
            <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-primary" />
          </div>

          {/* Tiêu đề chính */}
          <div className="relative mb-10 text-center">
            <div className="absolute inset-0 blur-[100px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,96,255,0.15)_0%,rgba(223,61,204,0.1)_50%,transparent_100%)]" />
            <h1 className="relative font-(family-name:--font-sora) font-bold tracking-tight leading-[1.1]">
              <span className="block text-5xl sm:text-7xl lg:text-8xl text-white/90 mb-3">
                TECHVIFY MULTIVERSE
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl text-gradient-tech font-semibold pb-2">
                Evolution Saga
              </span>
            </h1>
          </div>

          {/* Thông tin sự kiện */}
          {/* <div className="mb-6 text-center animate-in fade-in duration-1000 delay-300">
            <p className="text-white/80 text-sm sm:text-lg font-medium tracking-widest mb-2 italic">
              Lễ trao giải Oscar Techvify - 30.01.2026
            </p>
          </div> */}

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Nút bấm kích hoạt Popup */}
          <div className="flex flex-col sm:flex-row gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button
              onClick={handleStartVoting}
              className="group relative cursor-pointer px-10 py-4 overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(223,61,204,0.4)]"
            >
              <div className="absolute inset-0 bg-linear-to-r from-grad-start via-grad-via to-grad-end" />
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                Bắt đầu bình chọn
              </span>
            </button>
          </div>

          {/* Chỉ báo cuộn trang */}
          <div className="mt-16 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-primary text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">
              Scroll
            </span>
            <div className="relative w-px h-16 bg-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll-down_2s_infinite_ease-in-out]" />
            </div>
          </div>
        </div>
      </div>
      {/* POPUP XÁC THỰC (Đã sửa lỗi dư thừa thẻ div) */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-primary/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative">
              <h4 className="text-gradient-tech text-[10px] font-black uppercase tracking-[0.3em] mb-2">
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
                    placeholder="VD: T0123"
                    value={employeeId}
                    onChange={(e) =>
                      setEmployeeId(e.target.value.toUpperCase())
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleConfirm();
                    }}
                    disabled={isLoading}
                    className="w-full bg-secondary/60 border border-primary/20 rounded-xl p-4 text-white text-lg font-bold focus:border-primary/50 outline-none transition-all placeholder:text-gray-700 disabled:opacity-50"
                  />
                  {error && (
                    <p className="text-red-400 text-xs pl-1">{error}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="cursor-pointer w-full py-4 bg-linear-to-r from-grad-start via-grad-via to-grad-end text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_20px_rgba(223,61,204,0.3)] hover:shadow-accent/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN TRUY CẬP"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthPopup(false);
                      setError("");
                      setEmployeeId("");
                    }}
                    disabled={isLoading}
                    className="cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                  >
                    HỦY BỎ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* NotificationPopup */}
      <NotificationPopup
        show={notification.show}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </section>
  );
}
