import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { BrandStory } from "@/components/BrandStory";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProductShowcase />
      <BrandStory />
      <Footer />
    </div>
  );
};

export default Index;
