import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // 🔜 In next phase, this will call backend order API
    clearCart();
    toast.success("Order placed successfully 🎉");
    navigate("/shop");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-display font-bold mb-8">
          Checkout
        </h1>

        {items.length === 0 ? (
          <p className="text-muted-foreground">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Order Summary */}
            <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.sweet._id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {item.sweet.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.sweet.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">
                  Total
                </span>
                <span className="text-xl font-bold text-primary">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* Place Order */}
            <Button
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
