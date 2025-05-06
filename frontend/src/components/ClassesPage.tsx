import React, { useEffect, useState } from 'react';
import { fetchClasses, Class, addClass } from '../api'; // Import API functions

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Classes List</h1>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>
            <h2>{classItem.name}</h2>
            <p>Level: {classItem.level}</p>
            <p>Form Teacher: {classItem.formTeacher}</p>
          </li>
        ))}
      </ul>
      {/* Add a class button or form could go here */}
    </div>
  );
};

export default ClassesPage;
