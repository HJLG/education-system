import React, { useState } from 'react';
import { addClass, Class } from '../api';  // Import the addClass API function

const AddClassPage: React.FC = () => {
  const [level, setLevel] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newClass: Class = {
      id: 0,  // Placeholder value, assuming backend generates this
      level,
      name,
      teacherEmail,
      formTeacher: '',  // Placeholder, will be fetched by the backend
    };

    try {
      const addedClass = await addClass(newClass);
      setSuccess(`Class "${addedClass.name}" added successfully!`);
      setError(null);
      // Reset form
      setLevel('');
      setName('');
      setTeacherEmail('');
    } catch (error) {
      setSuccess(null);
      setError('Failed to add class');
    }
  };

  return (
    <div>
      <h1>Add New Class</h1>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Level:</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Class Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Teacher Email:</label>
          <input
            type="email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClassPage;
