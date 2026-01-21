"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-background/80 backdrop-blur-sm border-t border-white/10">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <Image
                src="/logo/techvify_logo_white.svg"
                alt="Techvify Logo"
                width={150}
                height={50}
              />
              <p className="text-gray-500 text-sm leading-relaxed mt-5">
                Chương trình trao giải âm nhạc hàng năm, tôn vinh những nghệ sĩ
                tài ba và những bài hát hay nhất.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                LIÊN KẾT NHANH
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#vote"
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    Bình Chọn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    Về Chương Trình
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    Điều Khoản Sử Dụng
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                  >
                    Chính Sách Bảo Mật
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                LIÊN HỆ
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-500 text-sm break-all">
                    info@lansongxanh.vn
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-500 text-sm">+84 24 123 456</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-500 text-sm">
                    Hà Nội, Việt Nam
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                THEO DÕI
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary transition-colors flex items-center justify-center group"
                >
                  <Facebook
                    size={18}
                    className="text-white group-hover:text-black transition-colors"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary transition-colors flex items-center justify-center group"
                >
                  <Instagram
                    size={18}
                    className="text-white group-hover:text-black transition-colors"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary transition-colors flex items-center justify-center group"
                >
                  <Twitter
                    size={18}
                    className="text-white group-hover:text-black transition-colors"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary transition-colors flex items-center justify-center group"
                >
                  <Linkedin
                    size={18}
                    className="text-white group-hover:text-black transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Làn Sóng Xanh. Bản quyền được bảo vệ. Tất cả quyền được bảo
              lưu.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                Liên hệ hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
