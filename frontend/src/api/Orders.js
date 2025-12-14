const API_URL = "http://localhost:3001/api";

export const placeOrder = async (items, totalAmount) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, totalAmount }),
  });

  if (!res.ok) {
    throw new Error("Order failed");
  }

  return res.json();
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
