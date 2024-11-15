import React, { useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="cards-container">
        {/* Registered Students Card */}
        <div className="card student-card">
          <h3>Registered Students</h3>
          <p>View all the registered students in the system.</p>
          <button onClick={() => fetchData("hostels")}>View Details</button>
        </div>

        {/* Contact Form Submissions Card */}
        <div className="card contact-card">
          <h3>Contact Form Data</h3>
          <p>View all the submissions from the contact form.</p>
          <button onClick={() => fetchData("contacts")}>View Details</button>
        </div>

        {/* Scholarship Applications Card */}
        <div className="card scholarship-card">
          <h3>Scholarship Applications</h3>
          <p>View all the scholarship applications submitted.</p>
          <button onClick={() => fetchData("scholarships")}>View Details</button>
        </div>
      </div>

      {/* Display Fetched Data */}
      <div className="data-display">
        {loading ? (
          <p>Loading data...</p>
        ) : data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0])
                  .slice(1, -1) // Exclude the first and last columns
                  .map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item)
                    .slice(1, -1) // Exclude the first and last columns
                    .map(([key, value], i) => (
                      <td key={i}>
                        {typeof value === "string" && value.startsWith("uploads") ? (
                          <a
                            href={`http://localhost:3001/${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                          >
                            View Document
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
