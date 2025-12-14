import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Sweet! You\'re now subscribed to our newsletter!');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-candy p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/10 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Join 10,000+ sweet lovers
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Get Sweet Updates
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, 
              and a sprinkle of sweetness in your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 bg-primary-foreground/90 border-0 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
