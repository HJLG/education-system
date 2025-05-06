import React, { useEffect, useState } from 'react';
import { fetchTeachers, addClass } from '../api';  
import { useNavigate } from 'react-router-dom';

const AddClassPage: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]); 
  const [formData, setFormData] = useState({
    id: 0,
    level: '',
    name: '',
    teacherEmail: '', 
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teacherData = await fetchTeachers();
        setTeachers(teacherData);  
      } catch (error) {
        setError('Failed to fetch teachers');
      }
    };

    loadTeachers();
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addClass(formData);
      console.log(response)
      alert('Class added successfully!');
      navigate("/classes")
    } catch (err) {
      setError('Failed to add class');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="add-class-container">
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Class Level</label>
          <select name="level" value={formData.level} onChange={handleChange} required>
            <option value="">Select Level</option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
            <option value="Primary 6">Primary 6</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Form Teacher</label>
          <select name="teacherEmail" value={formData.teacherEmail} onChange={handleChange} required>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.email}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClassPage;
