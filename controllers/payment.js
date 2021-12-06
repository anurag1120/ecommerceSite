const braintree = require("braintree");

/*const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});*/

//after creating account 
const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId: "kzjtwjn5dn6whsd7",
    publicKey: "yr6vx7nfn5dmqxdw",
    privateKey: "19dab22f6021b9a4b964b412cf5db5aa"
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (error, response) => {
    // pass clientToken to your front-end
        if(error){
            return res.status(500).send(error);
        }
        else{
            return res.send(response);
        }
  });
};

exports.processPayment = ( req, res) => {

    var nonceFromTheClient = req.body.paymentMethodNonce ; 
    var amountFromTheClient = req.body.amount ;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              return res.status(500).send(err);
          }
          else{
              res.send(result);
          }
      });
}