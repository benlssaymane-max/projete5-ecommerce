import dynamic from 'next/dynamic';
import KpiStrip from '@/components/ui/KpiStrip';

const HeroSection = dynamic(() => import('@/components/3d/HeroSection'), {
  ssr: false,
  loading: () => <section className="section-pad min-h-[72vh]" />
});

const StoryPanels = dynamic(() => import('@/components/ui/StoryPanels'));
const CinematicScroll = dynamic(() => import('@/components/ui/CinematicScroll'));
const FeaturedProducts = dynamic(() => import('@/components/shop/FeaturedProducts'));

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
