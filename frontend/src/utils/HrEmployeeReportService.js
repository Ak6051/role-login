import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/form/employees-data';

export const fetchEmployees = async () => {
  return axios.get(API_BASE_URL);
};

// Create a new HR Employee entry
export const newcreateEmployee = async (employeeData) => {
  return axios.post(API_BASE_URL, employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return axios.put(`${API_BASE_URL}/${id}`, employeeData);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const getCompanyNames = async () => {
  return await axios.get('http://localhost:5000/api/form/company-names'); // Adjust the path according to your setup
};
