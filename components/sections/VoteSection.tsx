"use client";

import { useState } from "react";
import ArtistCard from "@/components/ui/ArtistCard";
import { Category } from "@/lib/types";

const categories: Category[] = [
  {
    id: "male-artists",
    name: "NAM NHÂN VIÊN ĐƯỢC YÊU THÍCH NHẤT",
    round: "Vòng 1",
    artists: [
      { id: "1", name: "Captain Boy", image: "", category: "Nam nhân viên" },
      { id: "2", name: "Neuthchami", image: "", category: "Nam nhân viên" },
      { id: "3", name: "JDol", image: "", category: "Nam nhân viên" },
      {
        id: "4",
        name: "Quang Hùng MasterD",
        image: "",
        category: "Nam nhân viên",
      },
      { id: "5", name: "Rhyder", image: "", category: "Nam nhân viên" },
    ],
  },
  {
    id: "female-artists",
    name: "NỮ NHÂN VIÊN ĐƯỢC YÊU THÍCH NHẤT",
    round: "Vòng 1",
    artists: [
      { id: "6", name: "Hương Giang", image: "", category: "Nữ nhân viên" },
      { id: "7", name: "Chi Pu", image: "", category: "Nữ nhân viên" },
      { id: "8", name: "Tlinh", image: "", category: "Nữ nhân viên" },
      { id: "9", name: "Mỹ Tâm", image: "", category: "Nữ nhân viên" },
      { id: "10", name: "Bích Phương", image: "", category: "Nữ nhân viên" },
    ],
  },
];

export default function VoteSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [voteAmount, setVoteAmount] = useState(1);

  const currentCategory = categories[activeCategory];

  const handleOpenVote = (artist: any) => {
    setSelectedArtist(artist);
    setVoteAmount(1);
    setShowPopup(true);
  };

  return (
    <section
      id="vote"
      className="relative w-full py-20 bg-background overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs (Top menu) */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={` cursor-pointer px-6 py-3 rounded-lg font-black transition-all duration-300 text-sm uppercase tracking-widest ${
                activeCategory === index
                  ? "bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight shadow-lg"
                  : "bg-dark-blue/40 border border-golden/20 text-gray-400 hover:text-golden-light"
              }`}
            >
              {category.name.split("-")[0].trim()}
            </button>
          ))}
        </div>

        {/* Cấu trúc chính: Sidebar Trái + Grid Phải */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* SIDEBAR LEFT: Thông tin hạng mục  */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
            <span className="text-golden-light text-[10px] font-bold uppercase tracking-[0.3em]">
              Giải thưởng Techvify
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase leading-none mt-4 mb-6">
              {currentCategory.name}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-golden/30 pl-4">
              Dành tặng cho nghệ sĩ/nhân viên có đóng góp xuất sắc nhất trong
              năm 2025. Cuộc bình chọn thuộc vòng {currentCategory.round}.
            </p>
          </div>

          {/* GRID RIGHT: Danh sách */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-270 overflow-y-auto pr-4 custom-scrollbar">
              {currentCategory.artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onVoteClick={handleOpenVote}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP: Nhập số lượng bình chọn */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-midnight border border-golden/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden">
            {/* Hiệu ứng ánh sáng chạy ngang qua Modal */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-golden/10 rounded-full blur-3xl" />

            <h4 className="text-golden text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Xác nhận bình chọn
            </h4>
            <p className="text-white text-2xl font-black uppercase mb-8 leading-tight">
              {selectedArtist?.name}
            </p>

            <div className="space-y-6">
              <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest text-center block">
                Số lượng phiếu bầu (Tối đa 5)
              </label>

              {/* BỘ TĂNG GIẢM SANG TRỌNG */}
              <div className="flex items-center justify-between bg-dark-blue/40 border border-white/5 rounded-2xl p-2 group">
                <button
                  onClick={() => setVoteAmount(Math.max(1, voteAmount - 1))}
                  className=" cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-golden/20 text-golden text-xl transition-all hover:bg-golden/10 active:scale-90"
                >
                  −
                </button>

                <div className="flex flex-col items-center">
                  <span
                    className="text-4xl font-black text-golden drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-in zoom-in duration-200"
                    key={voteAmount}
                  >
                    {voteAmount}
                  </span>
                  <span className="text-[8px] text-golden/50 font-bold uppercase tracking-tighter">
                    Phiếu
                  </span>
                </div>

                <button
                  onClick={() => setVoteAmount(Math.min(5, voteAmount + 1))}
                  className=" cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-golden/20 text-golden text-xl transition-all hover:bg-golden/10 active:scale-90"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => {
                    console.log(
                      `Voted ${voteAmount} for ${selectedArtist?.id}`,
                    );
                    setShowPopup(false);
                  }}
                  className="cursor-pointer w-full py-4 bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_20px_rgba(138,110,47,0.3)] hover:shadow-golden/40 transition-all active:scale-95"
                >
                  GỬI PHIẾU BÌNH CHỌN
                </button>

                <button
                  onClick={() => setShowPopup(false)}
                  className=" cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  QUAY LẠI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
