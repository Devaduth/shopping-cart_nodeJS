var db = require('../config/connection')
var promise = require('promise')
var collection = require('../config/collection')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectID
module.exports = {
    addProduct: (product, callback) => {

        db.get().collection('product').insertOne(product).then((data) => {

            callback(data.ops[0]._id)
        })
    },
    getAllProducts: () => {
        return new promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (proId) => {
        return new promise((resolve, reject) => {
            console.log(proId);
            console.log(objectId(proId));
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({ _id: objectId(proId) }).then((response) => {
                //console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,productDetails)=>{
        return new promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:productDetails.Name,
                    Description:productDetails.Description,
                    Price:productDetails.Price,
                    Category:productDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}