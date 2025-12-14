const Sweet = require("../models/Sweet");

exports.addSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.json(sweet);
};

exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (sweet.quantity === 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  res.json({ message: "Purchased successfully" });
};

exports.restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  sweet.quantity += req.body.quantity;
  await sweet.save();

  res.json({ message: "Restocked" });
};
