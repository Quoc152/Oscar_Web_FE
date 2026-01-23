"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface NotificationPopupProps {
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function NotificationPopup({
  show,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
}: NotificationPopupProps) {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseDelay, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-400" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case "success":
        return "border-green-400/30 bg-green-900/20";
      case "error":
        return "border-red-400/30 bg-red-900/20";
      case "warning":
        return "border-yellow-400/30 bg-yellow-900/20";
      case "info":
        return "border-blue-400/30 bg-blue-900/20";
    }
  };

  const getTitleColorClass = () => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
    }
  };

  return (
    <div className="overflow-hidden fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative max-w-md w-full p-6 rounded-2xl border overflow-hidden ${getColorClasses()} shadow-2xl animate-in slide-in-from-top-4 duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Content */}
        <div className="flex gap-4 items-start">
          <div className="shrink-0 mt-1">{getIcon()}</div>

          <div className="flex-1">
            {title && (
              <h3
                className={`text-lg font-black uppercase mb-2 ${getTitleColorClass()}`}
              >
                {title}
              </h3>
            )}
            <p className="text-white text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
            <div
              className={`h-full ${
                type === "success"
                  ? "bg-green-400"
                  : type === "error"
                    ? "bg-red-400"
                    : type === "warning"
                      ? "bg-yellow-400"
                      : "bg-blue-400"
              }`}
              style={{
                animation: `shrink ${autoCloseDelay}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
