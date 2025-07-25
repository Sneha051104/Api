const Teacher = require('../Models/Teacher');
const teacherModel = require('../Models/Teacher')
const cloudinary = require('../Utils/cloudinary');
const fs = require('fs');

class teacherController {
    static createTeacher = async (req, res) => {
        try {
            const { name, email } = req.body;

            if (!name || !email || !req.files || !req.files.image) {
                return res.status(400).json({ message: 'Name , emails and image are required' });
            }

            const file = req.files.image;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "teachers",
            });

            // Remove temp file
            fs.unlinkSync(file.tempFilePath);

            const product = await teacherModel.create({
                name,
                email,
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
    }

    static getAllTeachers = async (req, res) => {
        try {
            const products = await teacherModel.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static getTeacherById = async (req, res) => {
        try {
            const product = await teacherModel.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Teacher not found" });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static updateTeacher = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const file = req.files?.image;

            const teacher = await teacherModel.findById(id);
            if (!teacher) return res.status(404).json({ message: "Teacher not found" });

            // If new image is uploaded, delete old one and upload new
            if (file) {
                // Delete old image
                await cloudinary.uploader.destroy(teacher.image.public_id);

                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'teachers',
                });

                fs.unlinkSync(file.tempFilePath);

                teacher.image = {
                    public_id: result.public_id,
                    url: result.secure_url
                };
            }

            if (name) teacher.name = name;
            if (email) teacher.email = email;

            await teacher.save();

            res.status(200).json({ message: "Product updated", teacher });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static deleteTeacher = async (req, res) => {
        try {
          const { id } = req.params;
          const teacher = await teacherModel.findById(id);
          if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    
          // Delete image from Cloudinary
          await cloudinary.uploader.destroy(teacher.image.public_id);
    
          await teacher.deleteOne();
    
          res.status(200).json({ message: "Teacher deleted" });
        } catch (error) {
          res.status(500).json({ message: "Server error", error });
        }
      };
}
module.exports = teacherController;