import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VoteSectionServer from "@/components/sections/VoteSectionServer";
import AboutSection from "@/components/sections/AboutSection";
import TopEmployeesByGenderSection from "@/components/sections/TopEmployeesByGenderSection";
import { getUserData } from "@/lib/actions/auth";
import { getCandidates } from "@/lib/actions/vote";

/**
 * Home Page - Server Component
 * Fetch dữ liệu trực tiếp từ server, không xuất hiện trong Network tab
 */
export const dynamic = "force-dynamic"; // Mark page as dynamic

export default async function Home() {
  // Fetch dữ liệu người dùng từ auth_token cookie
  const userData = await getUserData();
  
  // Fetch danh sách ứng viên
  const candidates = await getCandidates();

  return (
    <main className="w-full min-h-screen bg-background text-white overflow-hidden">
      <Header />
      <HeroSection userData={userData} />
      <TopEmployeesByGenderSection candidates={candidates} />
      <VoteSectionServer 
        userData={userData}
        candidates={candidates}
      />
      <AboutSection />
      <Footer />
    </main>
  );
}
