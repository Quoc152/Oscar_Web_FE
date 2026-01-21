"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertCircle } from "lucide-react";

interface ConfirmPopupProps {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmPopup({
  show,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  onConfirm,
  onCancel,
  type = "warning",
}: ConfirmPopupProps) {
  const [mounted, setMounted] = useState(false);

  // Đảm bảo Portal chỉ chạy ở phía Client
  useEffect(() => {
    setMounted(true);
    if (show) {
      document.body.style.overflow = "hidden"; // Khóa cuộn trang khi hiện Popup
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show || !mounted) return null;

  const getColorClasses = () => {
    switch (type) {
      case "danger":
        return "border-red-400/30 bg-midnight";
      case "warning":
        return "border-golden/30 bg-midnight";
      case "info":
        return "border-blue-400/30 bg-midnight";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-400";
      case "warning":
        return "text-golden";
      case "info":
        return "text-blue-400";
    }
  };

  // Tạo giao diện đồng bộ với phong cách Oscar
  const content = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className={`relative max-w-sm w-full p-8 rounded-2xl border shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 ${getColorClasses()}`}
      >
        {/* Hiệu ứng ánh sáng vàng nhẹ phía sau */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-golden/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className={`p-3 rounded-full bg-white/5 mb-4 ${getIconColor()}`}>
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3
            className={`text-xl font-black uppercase tracking-widest mb-3 ${getIconColor()}`}
          >
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          <button
            onClick={onConfirm}
            className={`cursor-pointer w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
              type === "danger"
                ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                : "bg-linear-to-r from-golden-dark via-golden-light to-golden-dark text-midnight shadow-lg shadow-golden/20"
            }`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="cursor-pointer w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
