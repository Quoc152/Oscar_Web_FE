"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Candidate } from "@/lib/api/candidates";

interface TopEmployeesByGenderSectionProps {
  candidates: Candidate[];
}

export default function TopEmployeesByGenderSection({
  candidates,
}: TopEmployeesByGenderSectionProps) {
  const [activeGender, setActiveGender] = useState<"male" | "female">("male");

  // Sort and filter candidates by gender and votes
  const topMaleEmployees = useMemo(() => {
    return candidates
      .filter((c) => c.gender === 1)
      .sort((a, b) => (b.votecount || 0) - (a.votecount || 0))
      .slice(0, 5);
  }, [candidates]);

  const topFemaleEmployees = useMemo(() => {
    return candidates
      .filter((c) => c.gender !== 1)
      .sort((a, b) => (b.votecount || 0) - (a.votecount || 0))
      .slice(0, 5);
  }, [candidates]);

  const displayedEmployees =
    activeGender === "male" ? topMaleEmployees : topFemaleEmployees;

  // Rearrange to order: 4 2 1 3 5 (desktop only)
  const rearrangedEmployees = useMemo(() => {
    if (displayedEmployees.length === 0) return [];
    const arr = [...displayedEmployees];
    return [
      { employee: arr[3] || null, rank: 4 },
      { employee: arr[1] || null, rank: 2 },
      { employee: arr[0] || null, rank: 1 },
      { employee: arr[2] || null, rank: 3 },
      { employee: arr[4] || null, rank: 5 },
    ].filter((item) => item.employee !== null);
  }, [displayedEmployees]);

  const getGradientColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 via-orange-400 to-pink-500";
      case 2:
        return "from-blue-500 via-purple-500 to-pink-500";
      case 3:
        return "from-orange-400 via-orange-500 to-pink-500";
      case 4:
        return "from-blue-500 via-purple-500 to-pink-500";
      case 5:
        return "from-blue-500 via-purple-500 to-pink-500";
      default:
        return "from-blue-500 via-purple-500 to-pink-500";
    }
  };

  const getCardStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          container: "w-40 sm:w-48 lg:w-56",
          imageHeight: "h-40 sm:h-48 lg:h-56",
          badgeSize: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-lg sm:text-xl lg:text-2xl",
        };
      case 2:
        return {
          container: "w-32 sm:w-40 lg:w-48",
          imageHeight: "h-32 sm:h-40 lg:h-48",
          badgeSize: "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-base sm:text-lg",
        };
      case 3:
        return {
          container: "w-32 sm:w-40 lg:w-48",
          imageHeight: "h-32 sm:h-40 lg:h-48",
          badgeSize: "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-base sm:text-lg",
        };
      case 4:
        return {
          container: "w-28 sm:w-36 lg:w-44",
          imageHeight: "h-28 sm:h-36 lg:h-44",
          badgeSize: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sm sm:text-base",
        };
      case 5:
        return {
          container: "w-28 sm:w-36 lg:w-44",
          imageHeight: "h-28 sm:h-36 lg:h-44",
          badgeSize: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sm sm:text-base",
        };
      default:
        return {
          container: "w-28 sm:w-36 lg:w-44",
          imageHeight: "h-28 sm:h-36 lg:h-44",
          badgeSize: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-sm sm:text-base",
        };
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      case 4:
        return "4";
      case 5:
        return "5";
      default:
        return rank;
    }
  };

  return (
    <section
      id="top-employees"
      className="relative w-full py-16 sm:py-20 bg-background overflow-x-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-gradient-tech text-xs sm:text-sm font-bold tracking-widest uppercase">
            Bảng xếp hạng
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white mt-2 sm:mt-3 mb-2 sm:mb-4">
            Top 5 Nhân viên
          </h2>
        </div>

        {/* Gender Toggle */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8 sm:mb-12">
          {[
            { id: "male", label: "NAM NHÂN VIÊN" },
            { id: "female", label: "NỮ NHÂN VIÊN" },
          ].map((gender) => (
            <button
              key={gender.id}
              onClick={() => setActiveGender(gender.id as "male" | "female")}
              className={`cursor-pointer px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 uppercase tracking-widest ${
                activeGender === gender.id
                  ? "bg-linear-to-r from-grad-start to-grad-end text-white shadow-lg shadow-primary/40"
                  : "bg-secondary/60 border border-primary/20 text-gray-400 hover:text-primary hover:border-primary/50"
              }`}
            >
              {gender.label}
            </button>
          ))}
        </div>

        {/* Rankings - Horizontal on Desktop, Vertical on Mobile */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-end gap-3 sm:gap-4 lg:gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          {/* Mobile: Show in order 1-5, Desktop: Show in order 4-2-1-3-5 */}
          {(typeof window !== "undefined" && window.innerWidth < 1024
            ? displayedEmployees.map((emp, idx) => ({ employee: emp, rank: idx + 1 }))
            : rearrangedEmployees
          ).map(({ employee, rank }) => {
            if (!employee || !employee.avatar) return null;
            const styles = getCardStyles(rank);
            const gradColor = getGradientColor(rank);

            return (
              <div
                key={employee.employeeId}
                className="flex-shrink-0 flex flex-col items-center lg:items-center"
              >
                {/* Card */}
                <div
                  className={`relative bg-linear-to-br ${gradColor} p-1 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 ${styles.container}`}
                >
                  {/* Badge */}
                  <div
                    className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 ${styles.badgeSize} bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-black shadow-lg z-10`}
                  >
                    {getRankBadge(rank)}
                  </div>

                  {/* Inner Card */}
                  <div className="bg-card rounded-2xl sm:rounded-3xl p-2 sm:p-3 lg:p-4 h-full flex flex-col">
                    {/* Image */}
                    <div
                      className={`relative w-full ${styles.imageHeight} rounded-lg sm:rounded-2xl overflow-hidden mb-2 sm:mb-3 border-2 border-white/10`}
                    >
                      <Image
                        src={employee.avatar}
                        alt={employee.vnname}
                        fill
                        className="object-cover"
                        priority={rank === 1}
                      />
                    </div>

                    {/* Name */}
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-gradient-tech font-black text-[10px] sm:text-xs lg:text-sm tracking-tighter uppercase leading-tight text-center line-clamp-2">
                        {employee.englishname}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Chưa có dữ liệu
            </p>
          </div>
        )}
      </div>
    </section>
  );
}