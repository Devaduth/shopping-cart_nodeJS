var db = require('../config/connection')
var collections=require('../config/collections')
var promise=require('promise')
module.exports =  {
    addProduct: (product, callback) => {

        db.get().collection('product').insertOne(product).then((data) => {

            callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new promise(async(resolve,reject)=>{
            let products=await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}