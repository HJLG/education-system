import React, { useEffect, useState } from 'react';
import { fetchTeachers, Teacher } from '../api';
import { useNavigate } from 'react-router-dom'; 

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const fetchedTeachers = await fetchTeachers();
        console.log(fetchedTeachers);
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Failed to fetch teachers');
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const handleAddTeacherClick = () => {
    navigate('/add-teacher');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {teachers.length === 0 ? (
        <div className="empty-teachers">
          <p>No teachers available</p>
          <button onClick={handleAddTeacherClick}>Add Teacher</button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.contactnumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        <div className="add-teacher-container">
        <button onClick={handleAddTeacherClick}>Add New Teacher</button>
      </div>
    </div>
  );
};

export default TeachersPage;
