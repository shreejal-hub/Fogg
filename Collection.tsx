import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { CartSheet } from "@/components/CartSheet";
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
    price: "$89.99",
    size: "100ml EDP",
    topNotes: ["Bergamot", "Black Pepper", "Cardamom"],
    heartNotes: ["Oud", "Leather", "Rose"],
    baseNotes: ["Amber", "Musk", "Patchouli"],
    longevity: "8-10 hours",
    sillage: "Strong",
    season: "Fall/Winter",
    occasion: "Evening, Special Events",
  },
  {
    id: 2,
    name: "FOGG Imperial",
    tagline: "Regal & Refined",
    description: "Citrus meets wood in this sophisticated masterpiece",
    image: product2,
    price: "$79.99",
    size: "100ml EDT",
    topNotes: ["Lemon", "Grapefruit", "Mint"],
    heartNotes: ["Cedar", "Vetiver", "Jasmine"],
    baseNotes: ["Sandalwood", "Tonka Bean", "White Musk"],
    longevity: "6-8 hours",
    sillage: "Moderate",
    season: "Spring/Summer",
    occasion: "Business, Daily Wear",
  },
  {
    id: 3,
    name: "FOGG Essence",
    tagline: "Pure & Powerful",
    description: "Timeless elegance in every drop",
    image: product3,
    price: "$94.99",
    size: "100ml Parfum",
    topNotes: ["Lavender", "Neroli", "Pink Pepper"],
    heartNotes: ["Iris", "Geranium", "Sage"],
    baseNotes: ["Vanilla", "Benzoin", "Cedarwood"],
    longevity: "10-12 hours",
    sillage: "Very Strong",
    season: "All Seasons",
    occasion: "Versatile, Signature Scent",
  },
];

const otherCollections = [
  {
    id: 4,
    name: "FOGG Coastal",
    tagline: "Fresh & Aquatic",
    description: "Oceanic notes blended with crisp citrus for a refreshing experience",
    image: product1,
    price: "$64.99",
    size: "75ml EDT",
    topNotes: ["Sea Salt", "Bergamot", "Mandarin"],
    heartNotes: ["Marine Accord", "Lavender", "Geranium"],
    baseNotes: ["Driftwood", "Amber", "White Musk"],
    longevity: "5-7 hours",
    sillage: "Light to Moderate",
    season: "Spring/Summer",
    occasion: "Casual, Daytime",
  },
  {
    id: 5,
    name: "FOGG Velvet",
    tagline: "Smooth & Sensual",
    description: "A warm embrace of vanilla and spice that lingers beautifully",
    image: product2,
    price: "$69.99",
    size: "75ml EDP",
    topNotes: ["Saffron", "Cinnamon", "Orange Blossom"],
    heartNotes: ["Turkish Rose", "Jasmine", "Praline"],
    baseNotes: ["Vanilla", "Cashmeran", "Sandalwood"],
    longevity: "7-9 hours",
    sillage: "Moderate to Strong",
    season: "Fall/Winter",
    occasion: "Date Night, Evening",
  },
  {
    id: 6,
    name: "FOGG Luminous",
    tagline: "Bright & Uplifting",
    description: "Sparkling citrus and florals create an aura of radiant energy",
    image: product3,
    price: "$59.99",
    size: "75ml EDT",
    topNotes: ["Yuzu", "Pear", "Freesia"],
    heartNotes: ["Peony", "White Tea", "Magnolia"],
    baseNotes: ["Blonde Woods", "Musk", "Amber"],
    longevity: "4-6 hours",
    sillage: "Light",
    season: "Spring/Summer",
    occasion: "Office, Daily Wear",
  },
  {
    id: 7,
    name: "FOGG Heritage",
    tagline: "Classic & Distinguished",
    description: "Traditional barbershop notes reimagined with modern sophistication",
    image: product1,
    price: "$74.99",
    size: "75ml EDT",
    topNotes: ["Lavender", "Basil", "Lemon"],
    heartNotes: ["Oakmoss", "Clary Sage", "Geranium"],
    baseNotes: ["Vetiver", "Patchouli", "Tonka Bean"],
    longevity: "6-8 hours",
    sillage: "Moderate",
    season: "All Seasons",
    occasion: "Business, Formal",
  },
];

const Collection = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="font-playfair text-3xl font-bold">FOGG</h1>
          <CartSheet />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Signature Collection
          </h2>
          <div className="h-1 w-32 bg-gradient-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our meticulously crafted fragrances, each designed to embody confidence, 
            sophistication, and timeless elegance. Every bottle tells a unique story.
          </p>
        </div>
      </section>

      {/* Signature Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.tagline}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <h3 className="font-playfair text-4xl font-bold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-primary text-lg font-semibold mb-4 tracking-wider">
                        {product.tagline}
                      </p>
                      <p className="text-muted-foreground text-lg mb-4">
                        {product.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.size}
                      </p>
                    </div>

                    {/* Fragrance Notes */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                          Top Notes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.topNotes.map((note) => (
                            <span
                              key={note}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                          Heart Notes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.heartNotes.map((note) => (
                            <span
                              key={note}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                          Base Notes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.baseNotes.map((note) => (
                            <span
                              key={note}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/50 rounded-lg border border-border/50">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Longevity</p>
                        <p className="font-semibold">{product.longevity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Sillage</p>
                        <p className="font-semibold">{product.sillage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Best Season</p>
                        <p className="font-semibold">{product.season}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Occasion</p>
                        <p className="font-semibold">{product.occasion}</p>
                      </div>
                    </div>

                    {/* Price and Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="font-playfair text-3xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Button 
                        size="lg" 
                        className="gap-2"
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          size: product.size,
                        })}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Collections Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Other Collections
            </h2>
            <div className="h-1 w-32 bg-gradient-gold mx-auto mb-6" />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Explore more distinctive fragrances from our diverse collection, 
              each crafted with premium ingredients and expert artistry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherCollections.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.tagline}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <CardContent className="p-6">
                  <h3 className="font-playfair text-2xl font-bold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-primary text-sm font-semibold mb-3 tracking-wider">
                    {product.tagline}
                  </p>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {product.size}
                  </p>

                  {/* Fragrance Notes Compact */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wide mb-1">
                        Notes
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {product.topNotes[0]}, {product.heartNotes[0]}, {product.baseNotes[0]}
                      </p>
                    </div>
                  </div>

                  {/* Price and Cart */}
                  <div className="flex items-center justify-between">
                    <span className="font-playfair text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="gap-2"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        size: product.size,
                      })}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
