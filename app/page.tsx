import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import VoteSection from '@/components/sections/VoteSection';
import AboutSection from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <HeroSection />
      <VoteSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
