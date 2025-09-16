const mongoose=require('mongoose');

const itemsSchema=mongoose.Schema({
    name:{ type:String,required:true},
    description:{ type:String,required:true},
    price:{type:Number,required:true},
    image:[{type:String,required:true}],
    bestseller:{type:Boolean,default:false},
    sizes:[{type:String,required:true}],
    category:{type:String,required:true},
    subCategory:{type:String,required:true}
});

module.exports=mongoose.model("Items",itemsSchema);