const API_URL = "http://localhost:3001/api";

export const getSweets = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/sweets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const purchaseSweet = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/sweets/${id}/purchase`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Purchase failed");
  }

  return res.json();
};
