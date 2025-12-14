const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const controller = require("../controllers/sweet.controller");

router.post("/", auth, controller.addSweet);
router.get("/", auth, controller.getSweets);
router.post("/:id/purchase", auth, controller.purchaseSweet);
router.post("/:id/restock", auth, admin, controller.restockSweet);

module.exports = router;
