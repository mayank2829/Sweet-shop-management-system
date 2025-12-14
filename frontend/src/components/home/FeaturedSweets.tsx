import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SweetCard } from '@/components/sweet/SweetCard';
import { mockSweets } from '@/data/mockSweets';
import { useNavigate } from 'react-router-dom';

export function FeaturedSweets() {
  const navigate = useNavigate();
  const featuredSweets = mockSweets.filter(s => s.featured).slice(0, 3);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="text-4xl font-display font-bold mt-2">
              Featured Sweets
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Our most loved treats, handpicked for your delight
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/shop')}
            className="gap-2 self-start md:self-auto"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSweets.map((sweet, index) => (
            <div
              key={sweet.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SweetCard sweet={sweet} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
