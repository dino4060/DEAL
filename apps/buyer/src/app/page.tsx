import FlashSaleSection from "@/components/home/FlashSaleSection";
import HeroImageSection from "@/components/home/HeroImageSection";
import TodayProductSection from "@/components/home/TodayProductSection";

const HomePage = async () => {

  return (
    <div className="py-10 space-y-10">
      <HeroImageSection />

      <FlashSaleSection />

      <TodayProductSection />
    </div>
  );
}

export default HomePage;
