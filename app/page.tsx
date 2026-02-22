import HeroSection from '@/components/3d/HeroSection';
import StoryPanels from '@/components/ui/StoryPanels';
import FeaturedProducts from '@/components/shop/FeaturedProducts';
import CinematicScroll from '@/components/ui/CinematicScroll';
import KpiStrip from '@/components/ui/KpiStrip';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <KpiStrip />
      <StoryPanels />
      <CinematicScroll />
      <FeaturedProducts />
    </main>
  );
}