"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Artist } from "@/lib/types";

interface ArtistCardProps {
  artist: Artist;
  onVote?: (artistId: string) => void;
}

export default function ArtistCard({ artist, onVote }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  const handleVote = () => {
    setIsVoted(!isVoted);
    onVote?.(artist.id);
  };

  return (
    <div
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg h-96 bg-gradient-to-br from-gray-900 to-black">
        {/* Image container */}
        <div
          className={`w-full h-full bg-gray-800 flex items-center justify-center transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          {/* Placeholder for artist image */}
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-700/20 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <div className="text-4xl mb-2">♫</div>
              <p className="text-sm">{artist.name}</p>
            </div>
          </div>
        </div>

        {/* Overlay gradient on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        )}

        {/* Vote button - appears on hover */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={handleVote}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                isVoted
                  ? "bg-primary text-black shadow-lg shadow-primary/50"
                  : "bg-white/10 border border-white/30 text-white hover:bg-white/20"
              }`}
            >
              <Heart size={20} fill={isVoted ? "currentColor" : "none"} />
              {isVoted ? "ĐÃ BÌNH CHỌN" : "BÌNH CHỌN"}
            </button>
          </div>
        )}
      </div>

      {/* Artist name */}
      <div className="mt-4 text-center">
        <h3 className="text-white font-bold text-sm tracking-wider uppercase">
          {artist.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{artist.category}</p>
      </div>

      {/* Vote count indicator (appears when voted) */}
      {isVoted && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-primary text-black rounded-full flex items-center justify-center text-xs font-bold">
          ✓
        </div>
      )}
    </div>
  );
}
