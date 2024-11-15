import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './scholarship.css';

const Scholarship = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [casteFile, setCasteFile] = useState(null);
  const [incomeFile, setIncomeFile] = useState(null);
  const [marksheetFile, setMarksheetFile] = useState(null);
  const navigate = useNavigate();

  // Formik setup for handling form validation
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
      // Create FormData object to send files with form data
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('college', values.college);
      formData.append('marks', values.marks);
      formData.append('year', values.year);

      // Append the file inputs
      formData.append('photo', photoFile);
      formData.append('casteCertificate', casteFile);
      formData.append('incomeCertificate', incomeFile);
      formData.append('marksheet', marksheetFile);

      // Sending POST request with formData
      axios.post('http://localhost:3001/scholarship', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        alert('Scholarship form submitted successfully!');
        navigate('/ScholarshipPage'); // Navigate back to the scholarship page
      })
      .catch(error => {
        console.error("There was an error submitting the form:", error);
        alert('There was an error submitting the form.');
      });
    },
  });

  // Handle file uploads
  const handleFileUpload = (setter) => (event) => {
    setter(event.target.files[0]);
  };

  const handleBack = () => navigate('/ScholarshipPage');

  return (
    <div className="scholar-container">
      <h2>Scholarship Application</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label><br></br>
          <input
            id="name"
            name="name"
            type="text"
            placeholder='Name'
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
        </div>

        <div>
          <label htmlFor="college">College Name:</label><br></br>
          <input
            id="college"
            name="college"
            type="text"
            placeholder='College Name'
            {...formik.getFieldProps('college')}
          />
          {formik.touched.college && formik.errors.college && <div>{formik.errors.college}</div>}
        </div>

        <div>
          <label htmlFor="marks">Marks:</label><br></br>
          <input
            id="marks"
            name="marks"
            type="number"
            placeholder='Marks'
            {...formik.getFieldProps('marks')}
          />
          {formik.touched.marks && formik.errors.marks && <div>{formik.errors.marks}</div>}
        </div>

        <div>
          <label htmlFor="year">Current Academic Year:</label><br></br>
          <input
            id="year"
            name="year"
            type="text"
            placeholder='Academic Year'
            {...formik.getFieldProps('year')}
          />
          {formik.touched.year && formik.errors.year && <div>{formik.errors.year}</div>}
        </div>

        {/* File Upload Inputs */}
        <div>
          <label htmlFor="photo">Upload Photo:</label><br></br>
          <input
            type="file"
            onChange={handleFileUpload(setPhotoFile)}
            required
          />
        </div>

        <div>
          <label htmlFor="casteCertificate">Upload Caste Certificate:</label><br></br>
          <input
            type="file"
            onChange={handleFileUpload(setCasteFile)}
            required
          />
        </div>

        <div>
          <label htmlFor="incomeCertificate">Upload Income Certificate:</label><br></br>
          <input
            type="file"
            onChange={handleFileUpload(setIncomeFile)}
            required
          />
        </div>

        <div>
          <label htmlFor="marksheet">Upload Marksheet:</label><br></br>
          <input
            type="file"
            onChange={handleFileUpload(setMarksheetFile)}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className='submit-button'>Submit</button>
          <button type="button" onClick={handleBack} className="back-button">Back</button>
        </div>
      </form>

      <h4>Related Scholarship Links</h4>
      <a
        href="https://mahadbtmahait.gov.in/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Babasaheb Ambedkar Samajkalyan Scholarship Portal
      </a>
    </div>
  );
};

export default Scholarship;
