const express = require('express');
const Employee = require('../models/employeeSchema');




const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, designation, gender, courses } = req.body;
        const avatar = req.file ? req.file.filename : null;
    
        const employee = new Employee({ name, email, phone, designation, gender, courses, avatar });
        await employee.save();
        res.status(201).json(employee);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    
}

const getAllEmployee = async (req,res) => {
    try {
        const employees = await Employee.find();
        if(!employees){
            return res.status(404).json({ message: "No employees found" });
        }
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getASingleEmployee = async (req,res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const updateAEmployee = async (req,res) =>{
    try {
        const { name, email, phone, designation, gender, courses } = req.body;
        const avatar = req.file ? req.file.filename : req.body.avatar;
    
        const employee = await Employee.findByIdAndUpdate(
          req.params.id,
          { name, email, phone, designation, gender, courses, avatar },
          { new: true, runValidators: true }
        );
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }    
}

const deleteAEmployee = async (req,res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }    
}
module.exports={createEmployee,getAllEmployee,getASingleEmployee,updateAEmployee,deleteAEmployee}