import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Sweet } from "@/types/sweet";

interface CartItem {
  sweet: Sweet;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (sweet: Sweet) => void;
  removeFromCart: (sweetId: string) => void;
  updateQuantity: (sweetId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 🔐 LocalStorage key
const CART_KEY = "sweetshop_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  // ✅ Load cart from localStorage on first render
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (sweet: Sweet) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.sweet._id === sweet._id
      );

      if (existing) {
        return prev.map((item) =>
          item.sweet._id === sweet._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { sweet, quantity: 1 }];
    });
  };

  const removeFromCart = (sweetId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.sweet._id !== sweetId)
    );
  };

  const updateQuantity = (sweetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.sweet._id === sweetId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  };

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.sweet.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }
  return context;
}
