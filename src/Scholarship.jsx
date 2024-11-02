import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './scholarship.css';

const Scholarship = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const formik = useFormik({
    initialValues: {
      name: '',
      college: '',
      marks: '',
      year: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      college: Yup.string().required('Required'),
      marks: Yup.number().required('Required'),
      year: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('college', values.college);
      formData.append('marks', values.marks);
      formData.append('year', values.year);
      formData.append('photo', photoFile); // 'photoFile' should be the uploaded image file

      axios.post('http://localhost:3001/scholarship', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Server response:', response);
        alert('Scholarship form submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting scholarship form:', error);
        alert('There was an error submitting the form.');
      });
    },
  });

  const handlePhotoUpload = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  // Handle navigation to home
  const handleBack = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="scholar-container">
      <h2>Scholarship Application</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        {/* College Field */}
        <div>
          <label htmlFor="college">College:</label>
          <input
            id="college"
            name="college"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.college}
          />
          {formik.touched.college && formik.errors.college ? (
            <div>{formik.errors.college}</div>
          ) : null}
        </div>

        {/* Marks Field */}
        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            id="marks"
            name="marks"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.marks}
          />
          {formik.touched.marks && formik.errors.marks ? (
            <div>{formik.errors.marks}</div>
          ) : null}
        </div>

        {/* Year Field */}
        <div>
          <label htmlFor="year">Current Academic Year:</label>
          <input
            id="year"
            name="year"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.year}
          />
          {formik.touched.year && formik.errors.year ? (
            <div>{formik.errors.year}</div>
          ) : null}
        </div>

        {/* Photo Upload */}
        <div>
          <label htmlFor="photo">Upload Photo:</label>
          <input type="file" onChange={handlePhotoUpload} />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>

        {/* Back Button */}
        <button type="button" onClick={handleBack} className="back-button">
          Back
        </button>
      </form>

      <br />
      <h4>Related Scholarship Links</h4>
      <a href="https://mahadbtmahait.gov.in/" target="_blank" rel="noopener noreferrer">
        Babasaheb Ambedkar Samajkalyan Scholarship Portal
      </a>
    </div>
  );
};

export default Scholarship;
