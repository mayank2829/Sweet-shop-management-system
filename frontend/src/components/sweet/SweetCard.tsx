import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sweet, CATEGORIES } from "@/types/sweet";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SweetCardProps {
  sweet: Sweet;
  featured?: boolean;
  onBuy?: () => void; // 🔹 backend purchase
}

export function SweetCard({ sweet, featured, onBuy }: SweetCardProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const cartItem = items.find((item) => item.sweet._id === sweet._id);
  const isOutOfStock = sweet.quantity === 0;
  const category = CATEGORIES.find((c) => c.value === sweet.category);

  // 🔹 ADD TO CART (after backend purchase)
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to buy sweets");
      navigate("/login");
      return;
    }

    if (isOutOfStock) return;

    try {
      // call backend purchase if provided
      if (onBuy) {
        await onBuy();
      }

      addToCart(sweet);
      toast.success(`${sweet.name} added to cart 🍬`);
    } catch (error) {
      toast.error("Out of stock");
    }
  };

  const handleUpdateQuantity = (delta: number) => {
    if (!cartItem) return;

    const newQty = cartItem.quantity + delta;

    if (newQty <= 0) {
      updateQuantity(sweet._id, 0);
      return;
    }

    if (newQty > sweet.quantity) {
      toast.error("Not enough stock");
      return;
    }

    updateQuantity(sweet._id, newQty);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-candy transition-all duration-500 hover:-translate-y-2",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "h-64 md:h-80" : "h-48"
        )}
      >
        <img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-medium">
            {category?.emoji} {category?.label}
          </span>
        </div>

        {/* Out of Stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="px-4 py-2 rounded-full bg-card text-foreground font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Featured */}
        {sweet.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full gradient-candy text-primary-foreground text-xs font-bold">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3
            className={cn(
              "font-display font-semibold line-clamp-1",
              featured ? "text-xl" : "text-lg"
            )}
          >
            {sweet.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {sweet.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-primary">
              ₹{sweet.price.toFixed(2)}
            </span>
            {!isOutOfStock && (
              <p className="text-xs text-muted-foreground">
                {sweet.quantity} in stock
              </p>
            )}
          </div>

          {/* Cart Controls */}
          {cartItem ? (
            <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(-1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold">
                {cartItem.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(1)}
                disabled={cartItem.quantity >= sweet.quantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              variant={isOutOfStock ? "secondary" : "default"}
              size="sm"
              className="gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
