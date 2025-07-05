import FlashSaleSection from "@/components/home/FlashSaleSection";
import HeroImageSection from "@/components/home/HeroImageSection";
import TodayProductSection from "@/components/home/TodayProductSection";
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";

const HomePage = async () => {
  const { success, data } = await serverFetch(api.category.getTree());

  const categories = success ? data : [];

  return (
    <div className="py-10 space-y-10">
      <HeroImageSection />

      <FlashSaleSection />

      <TodayProductSection categories={categories} />
    </div>
  );
}

export default HomePage;
