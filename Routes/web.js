const express = require ('express')
const ProductController = require('../Controller/ProductController');
const teacherController = require('../Controller/TeacherController');
const UserController = require('../Controller/UserController');
const isAuthenticated = require('../Middleware/auth');
// const upload = require('../Utils/multer');
const route = express.Router()


route.post('/createProduct', ProductController.createProduct);
route.get('/getAllProducts',ProductController.getAllProducts);
route.get('/viewProducts/:id',ProductController.getProductById);
route.put('/updateProduct/:id',ProductController.updateProduct);
route.delete('/deleteProduct/:id',ProductController.deleteProduct);


route.post('/createTeacher',teacherController.createTeacher);
route.get('/getAllTeachers',teacherController.getAllTeachers);
route.get('/getTeacherById/:id',teacherController.getTeacherById);
route.put('/updateTeacher/:id',teacherController.updateTeacher);
route.delete('/deleteTeacher/:id',teacherController.deleteTeacher);

route.post('/register',UserController.register);
route.post('/login' ,UserController.login);
route.get('/getProfile', isAuthenticated, UserController.getProfile);
route.post('/logout' ,UserController.logout);



module.exports=route