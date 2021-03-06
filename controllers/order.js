const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  //populate the user info to req.body.order before saving
  req.body.order.user = req.profile;
  console.log(req.body.order);
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "failed to save order in DB",
      });
    }
    return res.json(order);
  });
};

exports.getMyOrders = (req,res) => {
  Order.find({user:req.profile._id})
  .exec((err,orders)=> {
    if(err) {
      return res.status(400).json({
        error: "No orders were made"
      });
    }
    res.json(orders);
  } );

}

exports.getAllOrders = (req, res) => {
  Order.find({})
    .populate("user", "_id name email")
    .sort({createdAt:"desc"})
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in db",
        });
      }
      return res.json(orders);
    });
};

//get status of all orders by admin
exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
};

//update the status of order by admin
exports.updateOrderStatus = (req, res) => {
  let id = req.order._id;
  //req.body is json file of input for updation of recoreds with respect to put request
  User.findByIdAndUpdate(
    id,
    { $set: { status: req.body.status } },
    { new: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "can not update order status",
        });
      }
      res.json(order);
    }
  );
};
