// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: [String],
    enum: ['HR', 'Sales', 'Developer'],
    required: true,
  },
  gender: {
    type: [String],
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  courses: {
    type: [String],
    enum: ['MSC', 'MCS', 'BSC'],
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
