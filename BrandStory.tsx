import { Sparkles, Award, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Ingredients",
    description: "Sourced from the finest corners of the world",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Recognized globally for excellence in fragrance",
  },
  {
    icon: Globe,
    title: "Globally Trusted",
    description: "Worn by the confident in over 50 countries",
  },
];

export const BrandStory = () => {
  return (
    <section className="py-24 bg-gradient-dark relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            The Art of Confidence
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-8" />
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            FOGG was born from a singular vision: to create fragrances that don't just complement your presence—they announce it. Every bottle is a testament to boldness, every spray a declaration of confidence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that the right fragrance isn't worn—it's embodied. It becomes part of who you are, an invisible armor of sophistication that commands respect and admiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-8 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4 animate-glow">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
