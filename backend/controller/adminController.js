const Items = require('../models/items');

exports.getAllProducts = async (req, res) => {
  const productItems = await Items.find();
  res.json(productItems);
}



exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, images } = req.body;

    const newItem = new Items({
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      image: images
    });

    await newItem.save();
    res.status(201).json({ message: "Product added successfully", product: newItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const {itemId} = req.params;
  try {
    const deletedItem = await Items.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", product: deletedItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

exports.updateProduct = async (req, res) => {
  const {productId} = req.params;
  const { name, description, price, category, subCategory, sizes, bestseller, images } = req.body;
  try{
    const product = await Items.findById(productId);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    } else{
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.subCategory = subCategory;
      product.sizes = sizes;
      product.bestseller = bestseller !== undefined ? bestseller : product.bestseller;
      product.image = images.length>0 ? images:product.image;
      await product.save();
      res.json({message: "Product updated successfully", product});
    }
  } catch(err){
    res.status(500).json({message: "Server error", error: err.message});
  }
}