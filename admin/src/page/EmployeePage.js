import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import 'react-toastify/dist/ReactToastify.css';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    courses: '',
    avatar: null,
  });
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://employee-management-backend-psi.vercel.app/api/employee/getAllEmployee');
      // console.log(response.avatar);
      setEmployees(response.data);
    } catch (error) {
      toast.error('Error fetching employees');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newEmployee.name) newErrors.name = 'Name is required';
    if (!newEmployee.email || !/\S+@\S+\.\S+/.test(newEmployee.email)) newErrors.email = 'Valid email is required';
    if (!newEmployee.phone) newErrors.phone = 'Phone number is required';
    if (!newEmployee.designation) newErrors.designation = 'Designation is required';
    if (!newEmployee.gender) newErrors.gender = 'Gender is required';
    if (!newEmployee.courses) newErrors.courses = 'Courses are required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewEmployee((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    Object.keys(newEmployee).forEach((key) => formData.append(key, newEmployee[key]));

    try {
      if (isEditing) {
        await axios.put(`https://employee-management-backend-psi.vercel.app/api/employee/updateAEmployee/${editingEmployee._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Employee updated successfully');
      } else {
        await axios.post('https://employee-management-backend-psi.vercel.app/api/employee/createemployee', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Employee added successfully');
      }
      fetchEmployees();
      setModalOpen(false);
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        designation: '',
        gender: '',
        courses: '',
        avatar: null,
      });
      setErrors({});
      setIsEditing(false);
    } catch (error) {
      toast.error(isEditing ? 'Error updating employee' : 'Error adding employee');
    }
  };

  const editEmployee = (employee) => {
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      designation: employee.designation.join(', '),
      gender: employee.gender.join(', '),
      courses: employee.courses.join(', '),
      avatar: null,
    });
    setEditingEmployee(employee);
    setIsEditing(true);
    setModalOpen(true);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://employee-management-backend-psi.vercel.app/api/employee/deleteAEmployee/${id}`);
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      toast.error('Error deleting employee');
    }
  };

  return (
    <div className="p-6">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
        </div>
        <div>
          <button
            onClick={() => {
              setIsEditing(false);
              setModalOpen(true);
            }}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Employee
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
          <form onSubmit={addEmployee} className="space-y-4">
            {/* Form Fields */}
            <div>
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="Name"
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <select
                name="designation"
                value={newEmployee.designation}
                onChange={handleInputChange}
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.designation ? 'border-red-500' : ''}`}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Developer">Developer</option>
              </select>
              {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
            </div>
            <div>
              <select
                name="gender"
                value={newEmployee.gender}
                onChange={handleInputChange}
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.gender ? 'border-red-500' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <div>
              <select
                name="courses"
                value={newEmployee.courses}
                onChange={handleInputChange}
                className={`p-2 border border-gray-300 rounded-md w-full ${errors.courses ? 'border-red-500' : ''}`}
              >
                <option value="">Select Courses</option>
                <option value="MSC">MSC</option>
                <option value="MCS">MCS</option>
                <option value="BSC">BSC</option>
              </select>
              {errors.courses && <p className="text-red-500 text-sm">{errors.courses}</p>}
            </div>
            <div>
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
            >
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
          </form>
        </Modal>
      )}

      {/* Employee List */}
      <table className="min-w-full divide-y divide-gray-200 mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.avatar ? (
                  <img   src={employee.avatar ? `https://employee-management-backend-psi.vercel.app/uploads/${employee.avatar}` : 'path/to/default/image.jpg'} 
                  alt="Avatar" className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.designation.join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => editEmployee(employee)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePage;
