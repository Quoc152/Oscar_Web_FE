"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/public/logo/techvify_logo_ver2.png";

export default function Footer() {
  return (
    <footer className="relative w-full bg-background/80 backdrop-blur-sm border-t border-white/10">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Image src={Logo} alt="Techvify Logo" width={150} height={50} />
            </div>
          </div> */}

          {/* Divider */}
          {/* <div className="border-t border-white/10 mb-8" /> */}

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-500 text-sm text-center">
              2025 © Techvify. All Rights Reserved
            </p>
            {/* <div className="flex gap-6">
              <h5 className="text-gray-500 text-sm">Liên hệ hỗ trợ:</h5>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                quocle152@gmail.com
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
