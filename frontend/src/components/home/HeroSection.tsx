import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating candy decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-candy-pink/20 animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-candy-yellow/20 animate-float blur-xl" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-candy-coral/20 animate-float blur-xl" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-1/3 w-16 h-16 rounded-full bg-candy-mint/20 animate-float blur-xl" style={{ animationDelay: '1.5s' }} />
      
      {/* Large decorative circles */}
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full border border-primary/10" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full border border-accent/10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Handcrafted with love</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Life is{' '}
              <span className="candy-text">sweeter</span>
              <br />
              with every bite
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Discover our handcrafted collection of premium chocolates, 
              artisanal candies, and delightful treats made with the finest ingredients.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="candy"
                onClick={() => navigate('/shop')}
                className="gap-2"
              >
                Explore Sweets
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/register')}
              >
                Join Our Family
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-display font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Sweet Varieties</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Fresh Daily</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-float">
              <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-candy-pink/30 via-candy-coral/20 to-candy-yellow/30 backdrop-blur-3xl flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=600&fit=crop"
                  alt="Delicious chocolates"
                  className="w-80 h-80 rounded-3xl object-cover shadow-candy rotate-6 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Floating product cards */}
            <div className="absolute top-10 -left-10 bg-card p-3 rounded-2xl shadow-card animate-bounce-soft">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍫</span>
                <div>
                  <p className="text-sm font-semibold">Dark Chocolate</p>
                  <p className="text-xs text-muted-foreground">Best Seller</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-20 -right-5 bg-card p-3 rounded-2xl shadow-card animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧁</span>
                <div>
                  <p className="text-sm font-semibold">Fresh Cupcakes</p>
                  <p className="text-xs text-muted-foreground">Made Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
