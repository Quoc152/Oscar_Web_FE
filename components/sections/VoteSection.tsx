"use client";

import { useState, useEffect } from "react";
import ArtistCard from "@/components/ui/ArtistCard";
import { Category, Artist } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { fetchCandidates, type Candidate } from "@/lib/api/candidates";
import { submitVote } from "@/lib/api/vote";
import NotificationPopup from "@/components/ui/NotificationPopup";

export default function VoteSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [voteAmount, setVoteAmount] = useState(1);
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);

  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });

  const {
    isAuthenticated,
    login,
    dailyVoteRemaining,
    decrementVote,
    employeeId: loggedInEmployeeId,
  } = useAuth();

  const showNotification = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    title?: string,
  ) => {
    setNotification({ show: true, type, message, title });
  };

  // Fetch candidates khi component mount
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setIsLoadingCandidates(true);
        const candidates = await fetchCandidates();

        // Phân loại theo gender
        const maleArtists: Artist[] = candidates
          .filter((c) => c.gender === 1)
          .map((c) => ({
            id: c.employeeId,
            name: c.vnname,
            image: c.avatar,
            category: "Nam nhân viên",
            employeeId: c.employeeId,
            englishname: c.englishname,
            votecount: c.votecount,
          }));

        const femaleArtists: Artist[] = candidates
          .filter((c) => c.gender !== 1)
          .map((c) => ({
            id: c.employeeId,
            name: c.vnname,
            image: c.avatar,
            category: "Nữ nhân viên",
            employeeId: c.employeeId,
            englishname: c.englishname,
            votecount: c.votecount,
          }));

        setCategories([
          {
            id: "male-artists",
            name: "NAM NHÂN VIÊN ĐƯỢC YÊU THÍCH NHẤT",
            round: "Vòng 1",
            artists: maleArtists,
          },
          {
            id: "female-artists",
            name: "NỮ NHÂN VIÊN ĐƯỢC YÊU THÍCH NHẤT",
            round: "Vòng 1",
            artists: femaleArtists,
          },
        ]);
      } catch (error) {
        console.error("Error loading candidates:", error);
      } finally {
        setIsLoadingCandidates(false);
      }
    };

    loadCandidates();
  }, []);

  const currentCategory = categories[activeCategory];

  // Helper: Kiểm tra xem có trong thời gian vote không
  const isVotingAllowed = () => {
    // Nếu bypass countdown thì cho phép vote
    const bypassCountdown = process.env.NEXT_PUBLIC_BYPASS_COUNTDOWN === "true";
    if (bypassCountdown) return true;

    const now = new Date().getTime();
    const startTime = new Date(
      process.env.NEXT_PUBLIC_VOTE_START_TIME || "2026-01-22T00:00:00",
    ).getTime();
    const endTime = new Date(
      process.env.NEXT_PUBLIC_VOTE_END_TIME || "2026-01-30T23:59:59",
    ).getTime();

    return now >= startTime && now < endTime;
  };

  const handleOpenVote = (artist: any) => {
    // 1. Kiểm tra thời gian vote
    if (!isVotingAllowed()) {
      const now = new Date().getTime();
      const startTime = new Date(
        process.env.NEXT_PUBLIC_VOTE_START_TIME || "2026-01-22T00:00:00",
      ).getTime();

      if (now < startTime) {
        showNotification(
          "warning",
          "Chưa đến thời gian bình chọn. Vui lòng chờ thêm!",
          "Chưa mở bình chọn",
        );
      } else {
        showNotification(
          "error",
          "Thời gian bình chọn đã kết thúc!",
          "Đã đóng",
        );
      }
      return;
    }

    // 2. Kiểm tra đăng nhập
    if (!isAuthenticated) {
      setSelectedArtist(artist);
      setShowAuthPopup(true);
      return;
    }

    // 3. Kiểm tra còn lượt vote không
    if (dailyVoteRemaining <= 0) {
      showNotification(
        "warning",
        "Bạn đã hết lượt bình chọn hôm nay!",
        "Hết lượt vote",
      );
      return;
    }

    setSelectedArtist(artist);
    // Set vote amount dựa vào số lượt còn lại, tối thiểu là 1
    setVoteAmount(Math.min(1, dailyVoteRemaining));
    setShowPopup(true);
  };

  const handleLoginConfirm = async () => {
    // Validation
    if (!employeeId.trim()) {
      setError("Vui lòng nhập mã nhân viên");
      return;
    }

    // Kiểm tra format mã nhân viên (ví dụ: T0117)
    if (employeeId.trim().length < 4) {
      setError("Mã nhân viên không hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(employeeId.trim());
      setShowAuthPopup(false);
      setEmployeeId("");
      // Sau khi login thành công, mở popup vote luôn nếu có artist được chọn
      if (selectedArtist) {
        setShowPopup(true);
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra mã nhân viên.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVote = async () => {
    if (!loggedInEmployeeId || !selectedArtist) {
      return;
    }

    // Validation số lượng vote
    if (voteAmount < 1 || voteAmount > 5) {
      showNotification("error", "Số lượng phiếu không hợp lệ!", "Lỗi");
      return;
    }

    // Kiểm tra đủ lượt vote không
    if (voteAmount > dailyVoteRemaining) {
      showNotification(
        "warning",
        `Bạn chỉ còn ${dailyVoteRemaining} lượt bình chọn!`,
        "Không đủ lượt",
      );
      return;
    }

    setIsVoting(true);

    try {
      // Gọi API vote
      await submitVote(
        loggedInEmployeeId,
        selectedArtist.employeeId || selectedArtist.id,
        voteAmount,
      );

      // Giảm số lượt vote ĐÚNG SỐ LƯỢNG đã nhập
      decrementVote(voteAmount);

      // Đóng popup và reset
      setShowPopup(false);
      setVoteAmount(1);

      const artistName = selectedArtist.name;
      setSelectedArtist(null);

      // Thông báo thành công
      showNotification(
        "success",
        `Đã bình chọn thành công ${voteAmount} phiếu cho ${artistName}!`,
        "Thành công",
      );
    } catch (error) {
      console.error("Vote error:", error);
      showNotification("error", "Bình chọn thất bại. Vui lòng thử lại!", "Lỗi");
    } finally {
      setIsVoting(false);
    }
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
        {/* Loading State */}
        {isLoadingCandidates ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gradient-tech text-lg font-bold animate-pulse">
              Đang tải dữ liệu...
            </div>
          </div>
        ) : (
          <>
            {/* Category Tabs (Top menu) */}
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  className={` cursor-pointer px-6 py-3 rounded-lg font-black transition-all duration-300 text-sm uppercase tracking-widest ${
                    activeCategory === index
                      ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover"
                      : "bg-secondary/60 border border-primary/20 text-gray-400 hover:text-primary hover:border-primary/40"
                  }`}
                >
                  {category.name.split("-")[0].trim()}
                </button>
              ))}
            </div>

            {/* Cấu trúc chính: Sidebar Trái + Grid Phải */}
            {currentCategory && (
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* SIDEBAR LEFT: Thông tin hạng mục  */}
                <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
                  <span className="text-gradient-tech text-[10px] font-bold uppercase tracking-[0.3em]">
                    Giải thưởng Techvify
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white uppercase leading-none mt-4 mb-6">
                    {currentCategory.name}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-primary/30 pl-4">
                    Dành tặng cho nhân viên được yêu thích nhất trong năm 2025.
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
            )}
          </>
        )}
      </div>

      {/* MODAL POPUP: Nhập số lượng bình chọn */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-primary/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl shadow-primary/10 relative overflow-hidden">
            {/* Hiệu ứng ánh sáng chạy ngang qua Modal */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <h4 className="text-gradient-tech text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Xác nhận bình chọn
            </h4>
            <p className="text-white text-2xl font-black uppercase mb-8 leading-tight">
              {selectedArtist?.englishname || selectedArtist?.name}
            </p>

            <div className="space-y-6">
              <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest text-center block">
                Số lượng phiếu bầu (Tối đa 5)
              </label>

              {/* BỘ TĂNG GIẢM SANG TRỌNG */}
              <div className="flex items-center justify-between bg-secondary/60 border border-primary/10 rounded-2xl p-2 group">
                <button
                  onClick={() => setVoteAmount(Math.max(1, voteAmount - 1))}
                  disabled={isVoting}
                  className=" cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-primary/30 text-primary text-xl transition-all hover:bg-primary/10 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  −
                </button>

                <div className="flex flex-col items-center">
                  <span
                    className="text-4xl font-black text-gradient-tech drop-shadow-[0_0_15px_rgba(0,96,255,0.5)] animate-in zoom-in duration-200"
                    key={voteAmount}
                  >
                    {voteAmount}
                  </span>
                  <span className="text-[8px] text-primary/50 font-bold uppercase tracking-tighter">
                    Phiếu
                  </span>
                </div>

                <button
                  onClick={() =>
                    setVoteAmount(
                      Math.min(5, Math.min(dailyVoteRemaining, voteAmount + 1)),
                    )
                  }
                  disabled={isVoting}
                  className=" cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-primary/30 text-primary text-xl transition-all hover:bg-primary/10 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              {/* Hiển thị warning nếu vote amount > remaining */}
              {voteAmount > dailyVoteRemaining && (
                <p className="text-red-400 text-xs text-center">
                  Bạn chỉ còn {dailyVoteRemaining} lượt bình chọn!
                </p>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleSubmitVote}
                  disabled={isVoting || voteAmount > dailyVoteRemaining}
                  className="cursor-pointer w-full py-4 bg-linear-to-r from-grad-start via-grad-via to-grad-end text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_20px_rgba(223,61,204,0.3)] hover:shadow-accent/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVoting ? "ĐANG GỬI..." : "GỬI PHIẾU BÌNH CHỌN"}
                </button>

                <button
                  onClick={() => {
                    setShowPopup(false);
                    setVoteAmount(1);
                  }}
                  disabled={isVoting}
                  className=" cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                >
                  QUAY LẠI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP XÁC THỰC ĐĂNG NHẬP */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-primary/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative">
              <h4 className="text-gradient-tech text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                Yêu cầu đăng nhập
              </h4>
              <p className="text-white text-2xl font-black uppercase mb-8 leading-tight">
                Nhập mã nhân viên
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest pl-1">
                    Mã số nhân viên của bạn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: T0123"
                    value={employeeId}
                    onChange={(e) =>
                      setEmployeeId(e.target.value.toUpperCase())
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleLoginConfirm();
                    }}
                    disabled={isLoading}
                    className="w-full bg-secondary/60 border border-primary/20 rounded-xl p-4 text-white text-lg font-bold focus:border-primary/50 outline-none transition-all placeholder:text-gray-700 disabled:opacity-50"
                  />
                  {error && (
                    <p className="text-red-400 text-xs pl-1">{error}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLoginConfirm}
                    disabled={isLoading}
                    className="cursor-pointer w-full py-4 bg-linear-to-r from-grad-start via-grad-via to-grad-end text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_20px_rgba(223,61,204,0.3)] hover:shadow-accent/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthPopup(false);
                      setError("");
                      setEmployeeId("");
                    }}
                    disabled={isLoading}
                    className="cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                  >
                    HỦY BỎ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      <NotificationPopup
        show={notification.show}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </section>
  );
}
