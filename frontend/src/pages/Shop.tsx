import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SweetCard } from "@/components/sweet/SweetCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { CATEGORIES, Sweet, SweetCategory } from "@/types/sweet";
import { cn } from "@/lib/utils";
import { getSweets, purchaseSweet } from "@/api/sweets";
import { toast } from "sonner";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get("category") as SweetCategory | null;

  // 🔹 Fetch sweets from backend
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await getSweets();
      setSweets(data);
    } catch (error) {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleCategoryChange = (category: SweetCategory | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  // 🔹 Buy sweet (backend + refresh stock)
  const handlePurchase = async (sweetId: string) => {
    try {
      await purchaseSweet(sweetId);
      toast.success("Sweet purchased 🍬");
      fetchSweets(); // refresh stock
    } catch (error) {
      toast.error("Out of stock");
    }
  };

  // 🔹 Filtering logic
  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesSearch =
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || sweet.category === selectedCategory;

      const matchesPrice =
        sweet.price >= priceRange[0] && sweet.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [sweets, searchQuery, selectedCategory, priceRange]);

  const maxPrice = Math.max(0, ...sweets.map((s) => s.price));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-candy-pink/10 via-candy-coral/10 to-candy-yellow/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Sweet Collection
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore our handcrafted selection of premium sweets
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search sweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 h-12"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-card rounded-2xl p-6 mb-8 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleCategoryChange(null);
                    setPriceRange([0, maxPrice]);
                    setSearchQuery("");
                  }}
                >
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium",
                      !selectedCategory
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    )}
                  >
                    All
                  </button>

                  {CATEGORIES.map((category) => (
                    <button
                      key={category.value}
                      onClick={() =>
                        handleCategoryChange(category.value)
                      }
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium",
                        selectedCategory === category.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      )}
                    >
                      {category.emoji} {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price: ₹{priceRange[0]} – ₹{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={(v) =>
                    setPriceRange(v as [number, number])
                  }
                  max={maxPrice}
                  step={1}
                />
              </div>
            </div>
          )}

          {/* Results */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredSweets.length} sweets
          </p>

          {/* Products */}
          {loading ? (
            <p className="text-center">Loading sweets...</p>
          ) : filteredSweets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSweets.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onBuy={() => handlePurchase(sweet._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🍬</span>
              <h3 className="text-xl font-semibold">No sweets found</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
