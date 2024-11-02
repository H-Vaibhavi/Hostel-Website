// AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminPanel.css'; // You can create a CSS file for styling

const AdminPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scholarships'); // Your backend endpoint
        setScholarships(response.data);
      } catch (err) {
        console.error('Error fetching scholarship data:', err);
        setError('Failed to fetch scholarship data');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-panel">
      <h2>Scholarship Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
            <th>Marks</th>
            <th>Year</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr key={scholarship._id}>
              <td>{scholarship.name}</td>
              <td>{scholarship.college}</td>
              <td>{scholarship.marks}</td>
              <td>{scholarship.year}</td>
              <td>
                <img src={`http://localhost:3001/${scholarship.photo}`} alt={scholarship.name} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
