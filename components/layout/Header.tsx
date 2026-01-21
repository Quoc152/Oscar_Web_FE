"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">✦</span>
            </div>
            <span className="text-white font-bold text-lg tracking-wider">
              LÀNSÓNG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#vote"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              BÌNH CHỌN
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              VỀ CHƯƠNG TRÌNH
            </Link>
            <Link
              href="#partners"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              ĐỐI TÁC
            </Link>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-gradient-to-r from-primary to-blue-700 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
              ĐĂNG NHẬP
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              href="#vote"
              className="block text-gray-300 hover:text-primary transition-colors text-sm font-medium py-2"
            >
              BÌNH CHỌN
            </Link>
            <Link
              href="#about"
              className="block text-gray-300 hover:text-primary transition-colors text-sm font-medium py-2"
            >
              VỀ CHƯƠNG TRÌNH
            </Link>
            <Link
              href="#partners"
              className="block text-gray-300 hover:text-primary transition-colors text-sm font-medium py-2"
            >
              ĐỐI TÁC
            </Link>
            <button className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-primary to-blue-700 text-black font-bold rounded-lg">
              ĐĂNG NHẬP
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
