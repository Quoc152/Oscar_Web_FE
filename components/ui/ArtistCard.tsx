"use client";

import { Artist } from "@/lib/types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ArtistCardProps {
  artist: Artist;
  onVoteClick: (artist: Artist) => void;
}

export default function ArtistCard({ artist, onVoteClick }: ArtistCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-golden/40 transition-all duration-500 group relative">
      {/* 1. Portrait Image Container */}
      <div className="relative w-full h-72 md:h-80 overflow-hidden bg-gray-900">
        <Image
          src={artist.image || "/avatar_default.jpg"}
          alt={artist.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-midnight via-transparent to-transparent opacity-80 z-10" />
      </div>
      {/* 2. Info & Button Section */}
      <div className="relative h-auto md:h-28 overflow-hidden bg-midnight/50 backdrop-blur-sm">
        <div
          className={`flex flex-col h-full transition-transform duration-500 ease-in-out transform 
            ${isMobile ? "p-4" : "group-hover:-translate-y-full"}`}
        >
          {/* STATE 1: Artist Info */}
          <div
            className={`flex flex-col items-center justify-center transition-opacity duration-300 
              ${isMobile ? "opacity-100 mb-4" : "h-28 min-h-28 group-hover:opacity-0"}`}
          >
            <h3 className="text-golden font-black text-base md:text-lg tracking-tighter uppercase leading-tight text-center w-full line-clamp-1 italic font-heading">
              {artist.englishname || artist.name}
            </h3>
            <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.2em] mt-1 md:mt-2">
              {artist.category}
            </p>
          </div>

          {/* STATE 2: Vote Button - Cũng chiếm full h-28 trên Desktop để căn giữa nút */}
          <div
            className={`flex flex-col items-center justify-center 
              ${isMobile ? "" : "h-28 min-h-28 px-5"}`}
          >
            <button
              onClick={() => onVoteClick(artist)}
              className="cursor-pointer w-full py-3 md:py-3.5 bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-golden/50 transition-all active:scale-95"
            >
              Bình chọn ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
