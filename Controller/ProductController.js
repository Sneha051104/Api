const productModel = require('../Models/Product');
const cloudinary = require('../Utils/Cloudinary');
const fs = require('fs');

class productController {
  static createProduct = async (req, res) => {
    try {
      const { name } = req.body;

      if (!name || !req.files || !req.files.image) {
        return res.status(400).json({ message: 'Name and image are required' });
      }

      const file = req.files.image;

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });

      // Remove temp file
      fs.unlinkSync(file.tempFilePath);

      const product = await productModel.create({
         name,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        }
      })
        


      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  static getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  static getProductById = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const file = req.files?.image;

      const product = await productModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // If new image is uploaded, delete old one and upload new
      if (file) {
        // Delete old image
        await cloudinary.uploader.destroy(product.image.public_id);

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'products',
        });

        fs.unlinkSync(file.tempFilePath);

        product.image = {
          public_id: result.public_id,
          url: result.secure_url
        };
      }

      if (name) product.name = name;

      await product.save();

      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(product.image.public_id);

      await product.deleteOne();

      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
}

module.exports = productController;