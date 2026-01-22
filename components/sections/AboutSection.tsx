"use client";

import React from "react";
import Image from "next/image";

const DEVELOPERS = [
  {
    name: "Ken",
    role: "FE",
    image: "/developer/Ken.jpg",
  },
  {
    name: "Toby",
    role: "BE",
    image: "/developer/Toby.jpg",
  },
  {
    name: "Mike",
    role: "BE + DevOps",
    image: "",
  },
];

const ACADEMY_CONTENT = {
  header: {
    subTitle: "Techvify Oscar Awards 2025",
    title: "Welcome to techvify",
    description:
      "Techvify Corporation is your trusted AI-Powered Digital Transformation Partner. With 500+ seasoned engineers, we deliver high-quality AI Solutions & Software that accelerate innovation and drive business growth.",
  },
  stats: [
    { value: "350+", label: "Project Completed" },
    { value: "120+", label: "Global Clients" },
    { value: "95%", label: "Avg. Customer Satisfaction Score" },
  ],
  technologyPartner: {
    title: "ĐỐI TÁC CÔNG NGHỆ CHIẾN LƯỢC",
    description:
      "Sự kiện được đồng hành bởi những đơn vị tiên phong, cùng kiến tạo hệ sinh thái công nghệ đột phá và nâng tầm giá trị sáng tạo.",
    list: [
      { name: "EVENTISTA", role: "TECHNOLOGY PLATFORM" },
      { name: "BRANDING PARTNER", role: "CREATIVE STRATEGY" },
    ],
  },
  footerLabel: "Official Technology Partner 2026",
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 bg-linear-to-b from-background via-background/50 to-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-125 h-125 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-125 h-125 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            {ACADEMY_CONTENT.header.subTitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mt-3">
            {ACADEMY_CONTENT.header.title}
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              {ACADEMY_CONTENT.header.description}
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACADEMY_CONTENT.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6"
              >
                <div className="text-3xl font-bold text-primary mb-3">
                  {stat.value}
                </div>
                <h3 className="text-white font-bold mb-2 uppercase">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>

          {/* Partners Section*/}
          {/* <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
              {ACADEMY_CONTENT.technologyPartner.title}
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl italic border-l-2 border-white/5 pl-4">
              {ACADEMY_CONTENT.technologyPartner.description}
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              {ACADEMY_CONTENT.technologyPartner.list.map((p, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col">
                    <span className="text-white font-black tracking-tighter text-base">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest">
                      {p.role}
                    </span>
                  </div>
                  {i !== ACADEMY_CONTENT.technologyPartner.list.length - 1 && (
                    <div className="hidden sm:block w-px h-8 bg-white/10" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div> */}
        </div>

        {/* Developers Section */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-12 flex items-center gap-4 before:h-px before:w-8 before:bg-white/10 after:h-px after:w-8 after:bg-white/10">
              Developed By
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-5xl px-4">
              {DEVELOPERS.map((dev) => (
                <div
                  key={dev.name}
                  className="group relative flex flex-col items-center"
                >
                  <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                  <div className="relative w-full flex flex-col items-center p-6 md:p-8 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-xl hover:border-primary/50 hover:-translate-y-2 transition-all duration-500">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
                      <Image
                        src={dev.image || "/avatar_default.jpg"}
                        alt={dev.name}
                        fill
                        className="rounded-full object-cover ring-4 ring-white/5 group-hover:ring-primary/50"
                      />
                    </div>
                    <span className="text-gray-400 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase group-hover:text-gradient-tech transition-colors text-center">
                      {dev.name}
                    </span>
                    <span className="text-[12px] text-gray-600 mt-1 uppercase tracking-tighter text-center">
                      {dev.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-[9px] text-gray-600 tracking-[0.3em] uppercase opacity-50">
              {ACADEMY_CONTENT.footerLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
