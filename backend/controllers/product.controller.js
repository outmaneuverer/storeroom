import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
const newProduct = new Product(product);

try {
    newProduct.save();
    res.status(201).json({success: true, data: newProduct});
} catch (error) {
    console.log("error creating product", error.message);
    res.status(500).json({success: false, message: error});
}
};

export const deleteProduct =  async(req, res) => {
    const {id} = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, data: deletedProduct});
    } catch (error) {
        console.log("error deleting product", error.message);
        res.status(500).json({success: false, message: error});
    }
}

export const getProducts =async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error getting products", error.message);
        res.status(500).json({success: false, message: error});
    }
};

export const updateProduct =  async(req, res) => {
    const {id} = req.params;
    const {name, price, image} = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, image}, {new: true});
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.log("error updating product", error.message);
        res.status(500).json({success: false, message: error});
    }
};


