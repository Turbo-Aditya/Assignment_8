const express = require('express');
const Router = express.Router();
const authController = require("../controllers/auth.controller");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
   
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true); 
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); 
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter 
  });


Router.post('/register', authController.register);
Router.put('/edit', authController.editUser);
Router.delete('/delete', authController.deleteUser);
Router.get('/getAll', authController.getAll);
Router.post('/uploadImage', upload.single('file'), authController.uploadImages);

module.exports = Router;
