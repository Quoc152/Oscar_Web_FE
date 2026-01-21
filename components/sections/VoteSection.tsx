"use client";

import { useState } from "react";
import ArtistCard from "@/components/ui/ArtistCard";
import { Category } from "@/lib/types";

const categories: Category[] = [
  {
    id: "male-artists",
    name: "NAM CA SĨ ĐƯỢC YÊU THÍCH NHẤT - VÒNG 3",
    round: "Vòng 3",
    artists: [
      { id: "1", name: "Captain Boy", image: "", category: "Nam ca sĩ" },
      { id: "2", name: "Neuthchami", image: "", category: "Nam ca sĩ" },
      { id: "3", name: "JDol", image: "", category: "Nam ca sĩ" },
      { id: "4", name: "Quang Hùng MasterD", image: "", category: "Nam ca sĩ" },
      { id: "5", name: "Rhyder", image: "", category: "Nam ca sĩ" },
    ],
  },
  {
    id: "female-artists",
    name: "NỮ CA SĨ ĐƯỢC YÊU THÍCH NHẤT - VÒNG 3",
    round: "Vòng 3",
    artists: [
      { id: "6", name: "Hương Giang", image: "", category: "Nữ ca sĩ" },
      { id: "7", name: "Chi Pu", image: "", category: "Nữ ca sĩ" },
      { id: "8", name: "Tlinh", image: "", category: "Nữ ca sĩ" },
      { id: "9", name: "Mỹ Tâm", image: "", category: "Nữ ca sĩ" },
      { id: "10", name: "Bích Phương", image: "", category: "Nữ ca sĩ" },
    ],
  },
  {
    id: "new-artists",
    name: "GƯƠNG MẶT MỚI ĐƯỢC YÊU THÍCH NHẤT - VÒNG 3",
    round: "Vòng 3",
    artists: [
      { id: "11", name: "Anh Tú", image: "", category: "Gương mặt mới" },
      {
        id: "12",
        name: "Phạm Đình Thái Ngọc",
        image: "",
        category: "Gương mặt mới",
      },
      {
        id: "13",
        name: "Trương Thảo Nhi",
        image: "",
        category: "Gương mặt mới",
      },
      { id: "14", name: "Vũ Thảo My", image: "", category: "Gương mặt mới" },
      { id: "15", name: "Khánh Vân", image: "", category: "Gương mặt mới" },
    ],
  },
];

export default function VoteSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = categories[activeCategory];

  return (
    <section id="vote" className="relative w-full py-20 bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-bold tracking-widest uppercase">
            Làn Sóng Xanh 2025
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            BÌNH CHỌN NGAY HÔM NAY
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Chọn những nghệ sĩ yêu thích nhất của bạn. Bình chọn của bạn rất
            quan trọng!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 text-sm uppercase tracking-wider ${
                activeCategory === index
                  ? "bg-primary text-black shadow-lg shadow-primary/50"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:border-primary/50"
              }`}
            >
              {category.name.split("-")[0].trim()}
            </button>
          ))}
        </div>

        {/* Category Title and Round */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            {currentCategory.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-gray-400 text-sm">
              {currentCategory.round}
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {currentCategory.artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onVote={(artistId) => {
                console.log(`Voted for artist: ${artistId}`);
              }}
            />
          ))}
        </div>

        {/* Vote Info */}
        <div className="mt-16 bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Mỗi người dùng có thể bình chọn một lần cho mỗi hạng mục
          </p>
          <p className="text-primary font-bold">
            Cuộc bình chọn sẽ kết thúc vào cuối hôm nay!
          </p>
        </div>
      </div>
    </section>
  );
}
