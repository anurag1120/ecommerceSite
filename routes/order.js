const express = require("express");
const router = express.Router();

const { updateStock } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

const {
  getMyOrders,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  getOrderById
} = require("../controllers/order");

//params extractor
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual routes
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read all orders
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
//get orders of the user
router.get(
  "/order/my/:userId",
  isSignedIn,
  isAuthenticated,
  getMyOrders
)
//status of all orders and update order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
