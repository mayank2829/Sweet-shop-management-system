import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedSweets } from '@/components/home/FeaturedSweets';
import { CategorySection } from '@/components/home/CategorySection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedSweets />
      <CategorySection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
