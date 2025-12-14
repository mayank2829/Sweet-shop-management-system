import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    // ✅ Go to checkout page (real-life flow)
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any sweets yet
            </p>
            <Button
              size="lg"
              variant="candy"
              onClick={() => navigate("/shop")}
              className="gap-2"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.sweet._id}
                className="flex gap-4 bg-card rounded-2xl p-4 shadow-soft"
              >
                <img
                  src={item.sweet.image}
                  alt={item.sweet.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold">
                      {item.sweet.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.sweet.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.sweet._id,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.sweet._id,
                            item.quantity + 1
                          )
                        }
                        disabled={
                          item.quantity >= item.sweet.quantity
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <span className="font-display font-bold text-lg">
                      ₹{(
                        item.sweet.price * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start"
                  onClick={() =>
                    removeFromCart(item.sweet._id)
                  }
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal
                  </span>
                  <span>
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Shipping
                  </span>
                  <span className="text-candy-mint font-medium">
                    Free
                  </span>
                </div>

                <div className="h-px bg-border" />

                <div className="flex justify-between font-display font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                variant="candy"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                className="w-full mt-3"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
