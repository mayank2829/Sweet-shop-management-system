const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  placeOrder,
  getMyOrders,
} = require("../controllers/order.controller");

router.post("/", auth, placeOrder);
router.get("/my", auth, getMyOrders);

module.exports = router;
