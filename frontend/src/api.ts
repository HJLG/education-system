import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Backend URL

// Interface for Teacher data
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  contactnumber: string;

}

// Interface for Class data
export interface Class {
  id: number;
  level: string;
  name: string;
  teacherEmail: string;
  formTeacher: string;
}

// Fetch teachers from the backend
export const fetchTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/teachers`);
    console.log(response.data.data)
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

// Add a new teacher
export const addTeacher = async (teacher: Teacher): Promise<Teacher> => {
  try {
    const requestData = {
      name : teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      contactNumber: teacher.contactnumber
    }
    const response = await axios.post(`${API_URL}/api/teachers`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw error;
  }
};

// Fetch classes from the backend
export const fetchClasses = async (): Promise<Class[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/classes`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Add a new class
export const addClass = async (newClass: Class): Promise<Class> => {
  try {
    const response = await axios.post(`${API_URL}/api/classes`, newClass);
    return response.data;
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};
