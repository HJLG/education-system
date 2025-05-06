import React, { useState } from 'react';
import { addTeacher } from '../api';  // Import addTeacher function

const AddTeacherPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTeacher = {
      id: 0,  // Placeholder value, backend will generate this
      name,
      subject,
      email,
      contactnumber: contactNumber
    };
     

    try {
      const addedTeacher = await addTeacher(newTeacher);
      setSuccess(`Teacher "${addedTeacher.name}" added successfully!`);
      setError(null);
      setName('');
      setSubject('');
      setEmail('');
      setContactNumber('');
    } catch (error) {
      setSuccess(null);
      setError('Failed to add teacher');
    }
  };

  return (
    <div className='add-teacher-form'>
      <h1>Add New Teacher</h1>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacherPage;
