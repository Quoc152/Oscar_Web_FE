"use client";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 bg-linear-to-b from-background via-background/50 to-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-125 h-125 bg-golden/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-125 h-125 bg-dark-blue/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            Giải Thưởng Âm Nhạc
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">
            LÀNSÓNG XANH 2025
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Làn Sóng Xanh là chương trình trao giải âm nhạc hàng năm lớn nhất
              tại Việt Nam, được tổ chức bởi Đài Truyền hình Công Công Việt Nam
              (VTV). Chương trình có mục đích tôn vinh những giá trị tốt đẹp
              trong âm nhạc và công nhân bằng tấm lòng sáng tạo, đóng góp tích
              cực cho phát triển nền âm nhạc Việt.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">28</div>
              <h3 className="text-white font-bold mb-2">NĂM THÀNH CÔNG</h3>
              <p className="text-gray-400 text-sm">
                Hơn hai mươi tám năm liên tục kết nối những tâm hồn yêu nhạc
              </p>
            </div>

            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">1000+</div>
              <h3 className="text-white font-bold mb-2">NGHỆ SĨ</h3>
              <p className="text-gray-400 text-sm">
                Hơn một ngàn nghệ sĩ đã tham gia và nhận vinh danh
              </p>
            </div>

            <div className="bg-linear-to-br from-primary/10 to-blue-700/10 border border-primary/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-3">100M+</div>
              <h3 className="text-white font-bold mb-2">LƯỢT BÌNH CHỌN</h3>
              <p className="text-gray-400 text-sm">
                Hàng trăm triệu lượt bình chọn từ khán giả trên toàn quốc
              </p>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-lg p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full" />
              ĐỐI TÁC CÔNG NGHỆ
            </h3>
            <p className="text-gray-400 mb-4">
              Làn Sóng Xanh 2025 được hỗ trợ bởi các đơn vị công nghệ hàng đầu
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="text-sm text-gray-500 font-bold">EVENTISTA</div>
              <div className="w-px h-6 bg-white/20" />
              <div className="text-sm text-gray-500 font-bold">
                BRANDING PARTNER
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-md mx-auto">
          <div className="h-32 bg-linear-to-br from-blue-900/20 to-primary/10 rounded-lg backdrop-blur-sm border border-primary/20" />
          <div className="h-32 bg-linear-to-br from-primary/20 to-blue-700/20 rounded-lg backdrop-blur-sm border border-primary/30" />
          <div className="h-32 bg-linear-to-br from-blue-900/20 to-primary/10 rounded-lg backdrop-blur-sm border border-primary/20" />
        </div>
      </div>
    </section>
  );
}
