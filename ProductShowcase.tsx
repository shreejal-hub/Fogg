import { Card } from "@/components/ui/card";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const products = [
  {
    id: 1,
    name: "FOGG Noir",
    tagline: "Dark & Mysterious",
    description: "A bold blend of oud and amber for the confident soul",
    image: product1,
  },
  {
    id: 2,
    name: "FOGG Imperial",
    tagline: "Regal & Refined",
    description: "Citrus meets wood in this sophisticated masterpiece",
    image: product2,
  },
  {
    id: 3,
    name: "FOGG Essence",
    tagline: "Pure & Powerful",
    description: "Timeless elegance in every drop",
    image: product3,
  },
];

export const ProductShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            Signature Collection
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each fragrance tells a story of confidence, crafted to perfection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-playfair text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary text-sm font-semibold mb-3 tracking-wider">
                  {product.tagline}
                </p>
              <p className="text-muted-foreground text-sm">
                {product.description}
              </p>
            </div>
          </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
