"use client";

import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
  canVote: boolean;
  isEnded: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const startTime = new Date(
      process.env.NEXT_PUBLIC_VOTE_START_TIME || "2026-01-22T00:00:00",
    ).getTime();
    const endTime = new Date(
      process.env.NEXT_PUBLIC_VOTE_END_TIME || "2026-01-30T23:59:59",
    ).getTime();

    let targetTime = 0;
    let label = "";
    let canVote = false;
    let isEnded = false;

    // Feature flag để bypass countdown khi test - CHỈ override canVote
    const bypassCountdown = process.env.NEXT_PUBLIC_BYPASS_COUNTDOWN === "true";

    if (now < startTime) {
      // Giai đoạn 1: Chờ đến lúc bắt đầu
      targetTime = startTime;
      label = "Thời gian bắt đầu bình chọn";
      canVote = bypassCountdown; // Bypass cho phép vote sớm
    } else if (now >= startTime && now < endTime) {
      // Giai đoạn 2: Đang trong thời gian bầu chọn
      targetTime = endTime;
      label = "Thời gian kết thúc bình chọn";
      canVote = true; // Luôn cho vote trong thời gian này
    } else {
      // Giai đoạn 3: Đã kết thúc
      isEnded = true;
      canVote = bypassCountdown; // Bypass có thể vote cả sau khi kết thúc
    }

    const difference = targetTime - now;

    if (isEnded || difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        label: "Bình chọn đã kết thúc",
        canVote: bypassCountdown, // Bypass vẫn cho vote
        isEnded: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      label,
      canVote,
      isEnded: false,
    };
  }, []);

  useEffect(() => {
    // Tránh lỗi Hydration
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Không render cho đến khi mounted để tránh hydration mismatch
  if (!mounted || !timeLeft) {
    return (
      <div className="flex flex-col items-center gap-6 my-10">
        <div className="h-32 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 my-10 animate-in fade-in duration-1000">
      <div className="flex items-center gap-3">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            timeLeft.canVote
              ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)]"
              : timeLeft.isEnded
                ? "bg-red-400 shadow-[0_0_10px_rgba(239,68,68,1)]"
                : "bg-primary shadow-[0_0_10px_rgba(0,96,255,1)]"
          }`}
        />
        <h3 className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
          {timeLeft.label}
        </h3>
      </div>

      {!timeLeft.isEnded && (
        <div className="flex gap-4 md:gap-8">
          {[
            { label: "Ngày", value: timeLeft.days },
            { label: "Giờ", value: timeLeft.hours },
            { label: "Phút", value: timeLeft.minutes },
            { label: "Giây", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-secondary/40 border border-white/10 backdrop-blur-md w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 group-hover:border-primary/30">
                  <span className="text-2xl md:text-4xl font-black text-gradient-tech tracking-tighter">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
