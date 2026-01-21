"use client";

import { Artist } from "@/lib/types";
import Image from "next/image";

interface ArtistCardProps {
  artist: Artist;
  onVoteClick: (artist: Artist) => void;
}

export default function ArtistCard({ artist, onVoteClick }: ArtistCardProps) {
  return (
    <div className="flex flex-col bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-golden/40 transition-all duration-500 group relative">
      {/* 1. Portrait Image Container */}
      <div className="relative h-72 overflow-hidden bg-gray-900">
        <Image
          src={artist.image || "/avatar_default.jpg"}
          alt={artist.name}
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        {/* Lớp phủ Gradient tạo chiều sâu cho ảnh */}
        <div className="absolute inset-0 bg-linear-to-t from-midnight via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. Swapping Info & Button Section - Tăng chiều cao lên h-28 để đủ chỗ cho English Name */}
      <div className="relative h-28 p-5 overflow-hidden bg-midnight/50 backdrop-blur-sm">
        <div className="flex flex-col h-full transition-transform duration-500 ease-in-out transform group-hover:-translate-y-[115%]">
          {/* STATE 1: Artist Info (Mặc định) */}
          <div className="flex flex-col items-center justify-center min-h-full transition-opacity duration-300 group-hover:opacity-0">
            {/* Tên chính - Giới hạn 1 dòng */}
            <h3 className="text-white font-black text-lg tracking-tighter uppercase leading-tight text-center w-full line-clamp-1">
              {artist.name}
            </h3>

            {/* English Name - Hiển thị ngay dưới tên chính, nhỏ và mờ hơn */}
            <p className="text-golden-light/60 text-[10px] font-medium uppercase tracking-widest mt-1 text-center w-full line-clamp-1 italic">
              {artist.englishname || "Oscar Candidate"}
            </p>

            <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em] mt-2">
              {artist.category}
            </p>
          </div>

          {/* Khoảng cách đệm giữa 2 trạng thái */}
          <div className="min-h-4" />

          {/* STATE 2: Vote Button (Hiện lên khi hover) */}
          <div className="flex flex-col items-center justify-center min-h-full">
            <button
              onClick={() => onVoteClick(artist)}
              className="cursor-pointer w-full py-3.5 bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight text-[11px] font-black uppercase tracking-[0.2em] rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-golden/50 transition-all active:scale-95"
            >
              Bình chọn ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
