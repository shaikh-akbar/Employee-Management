// routes/employees.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { createEmployee, getAllEmployee, getASingleEmployee, updateAEmployee, deleteAEmployee } = require('../controller/employeeCtrl');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only .jpg and .png files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } 
});

router.post('/createemployee', upload.single('avatar'), createEmployee);
router.get('/getAllEmployee',getAllEmployee)
router.get('/getAEmployee/:id',getASingleEmployee)
router.put('/updateAEmployee/:id', upload.single('avatar'), updateAEmployee);
router.delete('/deleteAEmployee/:id', upload.single('avatar'), deleteAEmployee);

module.exports = router;
