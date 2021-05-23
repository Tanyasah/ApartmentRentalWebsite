const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name rent _id description broker_id productImage productImage2 brokerPhNo bhk availability securitydep brokerage startdate feature sqft broker_name")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            rent: doc.rent,
            productImage: doc.productImage,
            _id: doc._id,
            broker_id: doc.broker_id,
            description: doc.description,
            productImage2: doc.productImage2,
            brokerPhNo: doc.brokerPhNo,
            bhk: doc.bhk,
            availability: doc.availability,
            securitydep: doc.securitydep,
            brokerage: doc.brokerage,
            startdate: doc.startdate,
            feature: doc.feature,
            sqft: doc.sqft,
            broker_name:doc.broker_name,
            request: {
              type: "GET",
              url: "http://localhost:3001/products/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    rent: req.body.rent,
    productImage: req.body.productImage,//file.path,
    broker_id: req.body.broker_id,
    description: req.body.description,
    productImage2: req.body.productImage2,
    brokerPhNo: req.body.brokerPhNo,
    bhk:req.body.bhk,
    availability: req.body.availability,
    securitydep: req.body.securitydep,
    brokerage: req.body.brokerage,
    startdate: req.body.startdate,
    feature: req.body.feature,
    sqft: req.body.sqft,
    broker_name: req.body.broker_name
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        
        createdProduct: {
          name: result.name,
          rent: result.rent,
          _id: result._id,
          broker_id: result.broker_id,
          description: result.description,
          productImage2:  result.productImage2,
          brokerPhNo:  result.brokerPhNo,
          bhk: result.bhk,
          availability:  result.availability,
          securitydep:  result.securitydep,
          brokerage: result.brokerage,
          startdate:  result.startdate,
          feature:  result.feature,
          sqft: result.sqft,
          broker_name: result.broker_name,
          request: {
            type: "GET",
            url: "http://localhost:3001/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name rent _id productImage broker_id description productImage2 brokerPhNo bhk availability securitydep brokerage startdate feature sqft broker_name")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3001/products"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3001/products/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted"//,
       // request: {
        // type: "POST",
        // url: "http://localhost:3001/products"//,
        // body: { name: "String", price: "Number" }
      // }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};