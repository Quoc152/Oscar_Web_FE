"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo/techvify_logo_white.svg";
import { Ticket } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [remainingVotes, setRemainingVotes] = useState(5);

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

          {/* VOTE COUNTER - DESKTOP */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-4 px-5 py-2 bg-dark-blue/40 border border-golden/30 rounded-full backdrop-blur-sm group hover:border-golden/60 transition-all">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-none mb-1">
                  Lượt bầu còn lại
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-golden leading-none tracking-tighter">
                    {remainingVotes}{" "}
                    <span className="text-xs text-golden/60">/ 5</span>
                  </span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 mx-1" />
              <div className="relative">
                <Ticket className="text-golden w-6 h-6 animate-pulse" />
                {/* Hiệu ứng glow sau icon */}
                <div className="absolute inset-0 bg-golden/20 blur-md rounded-full" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-golden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-6 animate-in slide-in-from-top duration-300">
            <div className="bg-dark-blue/90 border border-golden/20 p-6 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    Tài khoản của bạn
                  </p>
                  <p className="text-white text-sm font-medium">
                    Bình chọn Oscar 2026
                  </p>
                </div>
                <div className="bg-golden/10 px-4 py-2 rounded-xl border border-golden/30 flex flex-col items-center">
                  <span className="text-2xl font-black text-golden">
                    {remainingVotes}
                  </span>
                  <span className="text-[8px] text-golden font-bold uppercase">
                    Phiếu còn
                  </span>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
