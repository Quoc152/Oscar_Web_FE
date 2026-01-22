"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo/techvify_logo_white.svg";
import { Ticket } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ConfirmPopup from "@/components/ui/ConfirmPopup";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { isAuthenticated, dailyVoteRemaining, employeeId, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src={Logo}
              alt="Techvify Logo"
              width={180}
              height={45}
              priority
            />
          </Link>

          {/* VOTE COUNTER - DESKTOP - Chỉ hiển thị khi đã đăng nhập */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex h-12 items-center gap-2 px-5 bg-dark-blue/40 border border-golden/30 rounded-full backdrop-blur-sm">
                <div className="flex flex-col items-end justify-center">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none mb-1">
                    Nhân viên
                  </span>
                  <span className="text-sm font-black text-golden leading-none tracking-tight">
                    {employeeId}
                  </span>
                </div>
              </div>

              {/* 2. Vote Counter - Chiều cao h-12 */}
              <div className="flex h-12 items-center gap-4 px-6 bg-dark-blue/40 border border-golden/30 rounded-full backdrop-blur-sm group hover:border-golden/60 transition-all">
                <div className="flex flex-col items-end justify-center">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-none mb-1">
                    Lượt bầu còn lại
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-golden leading-none tracking-tighter">
                      {dailyVoteRemaining}{" "}
                      <span className="text-xs text-golden/60 font-medium">
                        / 5
                      </span>
                    </span>
                  </div>
                </div>

                {/* Vạch chia tỉ lệ lại h-6 để cân đối trong khung h-12 */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                <div className="relative flex items-center justify-center">
                  <Ticket className="text-golden w-5 h-5 animate-pulse" />
                  <div className="absolute inset-0 bg-golden/20 blur-md rounded-full" />
                </div>
              </div>

              {/* 3. Logout Button - Chiều cao h-12, chiều rộng w-12 để tạo hình tròn hoàn hảo */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="cursor-pointer h-12 w-12 flex items-center justify-center bg-dark-blue/40 border border-red-500/30 rounded-full backdrop-blur-sm hover:border-red-500/60 hover:bg-red-500/10 transition-all group"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <button
              className="md:hidden text-golden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && (
          <nav className="md:hidden pb-6 animate-in slide-in-from-top duration-300">
            <div className="bg-dark-blue/90 border border-golden/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    Tài khoản của bạn
                  </p>
                  <p className="text-white text-sm font-medium">
                    Bình chọn Oscar 2026
                  </p>
                  <p className="text-golden text-xs font-bold">
                    Mã: {employeeId}
                  </p>
                </div>
                <div className="bg-golden/10 px-4 py-2 rounded-xl border border-golden/30 flex flex-col items-center">
                  <span className="text-2xl font-black text-golden">
                    {dailyVoteRemaining}
                  </span>
                  <span className="text-[8px] text-golden font-bold uppercase">
                    Phiếu còn
                  </span>
                </div>
              </div>

              {/* Logout Button Mobile */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="cursor-pointer w-full py-3 px-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      <ConfirmPopup
        show={showLogoutConfirm}
        type="danger"
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất? Bạn sẽ cần đăng nhập lại để tiếp tục bình chọn."
        confirmText="Đăng xuất"
        cancelText="Hủy bỏ"
        onConfirm={() => {
          logout();
          setShowLogoutConfirm(false);
          setMobileMenuOpen(false);
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
}
