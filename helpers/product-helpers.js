var db = require('../config/connection')
var promise = require('promise')
var collection = require('../config/collection')
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
    }
}