import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '@/types/sweet';
import { cn } from '@/lib/utils';

const categoryColors = [
  'from-candy-pink/20 to-candy-pink/5 hover:from-candy-pink/30',
  'from-candy-coral/20 to-candy-coral/5 hover:from-candy-coral/30',
  'from-candy-yellow/20 to-candy-yellow/5 hover:from-candy-yellow/30',
  'from-candy-mint/20 to-candy-mint/5 hover:from-candy-mint/30',
  'from-candy-lavender/20 to-candy-lavender/5 hover:from-candy-lavender/30',
  'from-candy-orange/20 to-candy-orange/5 hover:from-candy-orange/30',
];

export function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Browse By
          </span>
          <h2 className="text-4xl font-display font-bold mt-2">
            Sweet Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category, index) => (
            <button
              key={category.value}
              onClick={() => navigate(`/shop?category=${category.value}`)}
              className={cn(
                "group p-6 rounded-2xl bg-gradient-to-br transition-all duration-300 hover:-translate-y-2 hover:shadow-card",
                categoryColors[index % categoryColors.length]
              )}
            >
              <span className="text-4xl mb-3 block group-hover:scale-125 transition-transform duration-300">
                {category.emoji}
              </span>
              <span className="font-display font-semibold text-foreground">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
