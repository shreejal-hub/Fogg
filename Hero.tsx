import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-perfume.jpg";
import { CartSheet } from "@/components/CartSheet";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cart Button */}
      <div className="absolute top-6 right-6 z-20">
        <CartSheet />
      </div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-foreground tracking-tight">
          FOGG
        </h1>
        <div className="h-1 w-32 bg-gradient-gold mx-auto mb-8" />
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light tracking-wide">
          Embrace Your Confidence
        </p>
        <p className="text-base md:text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
          Premium fragrances crafted for those who dare to stand out. 
          Experience the boldness of true luxury.
        </p>
        <div className="flex justify-center items-center">
          <Link to="/collection">
            <Button variant="hero" size="xl" className="group">
              Discover Collection
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
