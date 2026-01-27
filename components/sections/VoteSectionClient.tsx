"use client";

import { useState, useEffect } from "react";
import ArtistCard from "@/components/ui/ArtistCard";
import { Category, Artist } from "@/lib/types";
import { Candidate } from "@/lib/api/candidates";
import { submitVoteAction } from "@/lib/actions/vote";
import { loginAction } from "@/lib/actions/auth";
import NotificationPopup from "@/components/ui/NotificationPopup";
import { useRouter } from "next/navigation";

interface UserData {
  employeeId: string;
  dailyVoteRemaining: number;
}

interface VoteSectionClientProps {
  userData: UserData | null;
  candidates: Candidate[];
}

/**
 * Client Component cho Vote Section
 * Nhận dữ liệu từ Server Component qua props
 * Không có logic fetch hoặc tính toán giới hạn vote
 */
export default function VoteSectionClient({
  userData,
  candidates,
}: VoteSectionClientProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [voteAmount, setVoteAmount] = useState<number | "">(1);
  const [authString, setAuthString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

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

  const showNotification = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    title?: string,
  ) => {
    setNotification({ show: true, type, message, title });
  };

  // Phân loại candidates theo gender khi component mount
  useEffect(() => {
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
  }, [candidates]);

  const currentCategory = categories[activeCategory];

  // Helper: Kiểm tra xem có trong thời gian vote không
  const isVotingAllowed = () => {
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
    if (!userData) {
      setSelectedArtist(artist);
      setShowAuthPopup(true);
      return;
    }

    // 3. Kiểm tra còn lượt vote không (từ server)
    if (userData.dailyVoteRemaining <= 0) {
      showNotification(
        "warning",
        "Bạn đã hết lượt bình chọn hôm nay!",
        "Hết lượt vote",
      );
      return;
    }

    setSelectedArtist(artist);
    setVoteAmount(Math.min(1, userData.dailyVoteRemaining));
    setShowPopup(true);
  };

  const handleLoginConfirm = async () => {
    if (!authString.trim()) {
      setError("Vui lòng nhập mã nhân viên + ngày sinh");
      return;
    }

    const trimmed = authString.trim();
    if (trimmed.length < 12) {
      setError("Vui lòng nhập đầy đủ: Mã NV + Ngày sinh (VD: T012301012000)");
      return;
    }

    const birthdate = trimmed.slice(-8);
    if (!/^\d{8}$/.test(birthdate)) {
      setError("Ngày sinh không hợp lệ (8 chữ số cuối phải là DDMMYYYY)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Gọi Server Action để login
      const result = await loginAction(authString.trim());

      if (!result.success) {
        setError(result.error || "Đăng nhập thất bại");
        return;
      }

      // Đóng popup và refresh page để load lại userData từ server
      setShowAuthPopup(false);
      setAuthString("");
      router.refresh();

      // Sau khi refresh, mở popup vote nếu có artist được chọn
      if (selectedArtist) {
        setShowPopup(true);
      }
    } catch (err: any) {
      setError(err?.message || "Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVote = async () => {
    if (!userData || !selectedArtist) {
      return;
    }

    const voteCount = typeof voteAmount === "number" ? voteAmount : 1;

    // Validation số lượng vote cơ bản
    if (voteCount < 1) {
      showNotification("error", "Số lượng phiếu không hợp lệ!", "Lỗi");
      return;
    }

    // Kiểm tra đủ lượt vote không (từ server)
    if (voteCount > userData.dailyVoteRemaining) {
      showNotification(
        "warning",
        `Bạn chỉ còn ${userData.dailyVoteRemaining} lượt bình chọn!`,
        "Không đủ lượt",
      );
      return;
    }

    setIsVoting(true);

    try {
      // Gọi Server Action để submit vote
      const result = await submitVoteAction(
        selectedArtist.employeeId || selectedArtist.id,
        voteCount,
      );

      if (!result.success) {
        showNotification("error", result.error || "Bình chọn thất bại", "Lỗi");
        return;
      }

      // Đóng popup và reset
      setShowPopup(false);
      setVoteAmount(1);

      const artistName = selectedArtist.englishname;
      setSelectedArtist(null);

      // Thông báo thành công
      showNotification(
        "success",
        `Đã bình chọn thành công ${voteCount} phiếu cho ${artistName}!`,
        "Thành công",
      );

      // Refresh để cập nhật dailyVoteRemaining từ server
      router.refresh();
    } catch (error: any) {
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
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`cursor-pointer px-6 py-3 rounded-lg font-black transition-all duration-300 text-sm uppercase tracking-widest ${
                activeCategory === index
                  ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover"
                  : "bg-secondary/60 border border-primary/20 text-gray-400 hover:text-primary hover:border-primary/40"
              }`}
            >
              {category.name.split("-")[0].trim()}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {currentCategory && (
          <div
            key={currentCategory.id}
            className="flex flex-col lg:flex-row gap-12 items-start"
          >
            {/* Sidebar */}
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

            {/* Grid */}
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
      </div>

      {/* MODAL POPUP: Nhập số lượng bình chọn */}
      {showPopup && userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-primary/30 p-8 rounded-2xl max-w-sm w-full shadow-2xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <h4 className="text-gradient-tech text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Xác nhận bình chọn
            </h4>
            <p className="text-white text-2xl font-black uppercase mb-8 leading-tight">
              {selectedArtist?.englishname || selectedArtist?.name}
            </p>

            <div className="space-y-6">
              <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest text-center block">
                Số lượng phiếu bầu
              </label>

              {/* Bộ tăng giảm */}
              <div className="flex items-center justify-between bg-secondary/60 border border-primary/10 rounded-2xl p-2 group">
                <button
                  onClick={() => {
                    const current =
                      typeof voteAmount === "number" ? voteAmount : 1;
                    setVoteAmount(Math.max(1, current - 1));
                  }}
                  disabled={isVoting}
                  className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-primary/30 text-primary text-xl transition-all hover:bg-primary/10 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  −
                </button>

                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={voteAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setVoteAmount("" as any);
                        return;
                      }
                      if (!/^\d+$/.test(value)) return;

                      const numValue = parseInt(value, 10);
                      if (
                        numValue >= 1 &&
                        numValue <= userData.dailyVoteRemaining
                      ) {
                        setVoteAmount(numValue);
                      } else if (numValue > userData.dailyVoteRemaining) {
                        setVoteAmount(userData.dailyVoteRemaining);
                      }
                    }}
                    onBlur={() => {
                      if (voteAmount === "" || voteAmount === 0) {
                        setVoteAmount(1);
                      }
                    }}
                    disabled={isVoting}
                    className="w-20 text-4xl font-black text-gradient-tech text-center bg-transparent border-none outline-none drop-shadow-[0_0_15px_rgba(0,96,255,0.5)] disabled:opacity-50 caret-primary focus:drop-shadow-[0_0_25px_rgba(223,61,204,0.8)] transition-all duration-300"
                  />
                  <span className="text-[8px] text-primary/50 font-bold uppercase tracking-tighter">
                    Phiếu
                  </span>
                </div>

                <button
                  onClick={() => {
                    const current =
                      typeof voteAmount === "number" ? voteAmount : 1;
                    setVoteAmount(
                      Math.min(userData.dailyVoteRemaining, current + 1),
                    );
                  }}
                  disabled={isVoting}
                  className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl border border-primary/30 text-primary text-xl transition-all hover:bg-primary/10 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              {/* Warning */}
              {typeof voteAmount === "number" &&
                voteAmount > userData.dailyVoteRemaining && (
                  <p className="text-red-400 text-xs text-center">
                    Bạn chỉ còn {userData.dailyVoteRemaining} lượt bình chọn!
                  </p>
                )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleSubmitVote}
                  disabled={
                    isVoting ||
                    (typeof voteAmount === "number" &&
                      voteAmount > userData.dailyVoteRemaining)
                  }
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
                  className="cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
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
                Nhập mã định danh
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest pl-1">
                    Mã nhân viên + Ngày sinh
                  </label>
                  <input
                    type="text"
                    placeholder="VD: T012301012000"
                    value={authString}
                    onChange={(e) =>
                      setAuthString(e.target.value.toUpperCase())
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
                      setAuthString("");
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
