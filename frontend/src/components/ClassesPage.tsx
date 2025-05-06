import React, { useEffect, useState } from 'react';
import { fetchClasses } from '../api'; // Import the fetchClasses function to get class data
import { useNavigate } from 'react-router-dom';

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetchedClasses = await fetchClasses();
        setClasses(fetchedClasses);
      } catch (error) {
        setError('Failed to fetch classes');
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleAddClassesClick = () => {
    navigate('/add-class');
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="classes-page-container">
      <h1>Classes List</h1>

      {classes.length === 0 ? (
        <div className="empty-classes">
          <p>No classes available</p>
        </div>
      ) : (
        <table className="classes-table">
          <thead>
            <tr>
              <th>Class Level</th>
              <th>Class Name</th>
              <th>Form Teacher</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td>{classItem.level}</td>
                <td>{classItem.name}</td>
                <td>{classItem.formteacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Button to add a new class */}
      <div className="add-class-button-container">
        <button className="add-class-button" onClick={handleAddClassesClick}>Add New Class</button>
      </div>
    </div>
  );
};

export default ClassesPage;
