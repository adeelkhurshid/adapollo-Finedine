import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ExperienceSection from "@/components/ExperienceSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <ExperienceSection />
        <ReservationSection />
      </main>
      <Footer />
    </LenisProvider>
  );
}
