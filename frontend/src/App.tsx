import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeachersPage from './components/TeachersPage';  // Your Teachers component
import ClassesPage from './components/ClassesPage';    // Your Classes component
import AddClassPage from './components/AddClassPage';  // New AddClassPage component
import './styles.css';
import AddTeacherPage from './components/AddTeacherPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Header and Navigation Bar */}
        <header className="header">
          <div className="logo">Education System</div>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/teachers">Teachers</Link>
              </li>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>
                <Link to="/add-class">Add Class</Link> 
              </li>
              <li>
                <Link to="/add-teacher">Add Teacher</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routing Pages */}
        <Routes>
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/add-class" element={<AddClassPage />} />
          <Route path="/add-teacher" element={<AddTeacherPage/>} />
          <Route
            path="/"
            element={
              <div className="welcome-message">
                <h1>Welcome to the Education System</h1>
                <p>Select a page from the navigation bar</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
