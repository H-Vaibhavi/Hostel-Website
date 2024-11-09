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
      formData.append('photo', photoFile);
      formData.append('caste', casteFile);
      formData.append('income', incomeFile);
      formData.append('marksheet', marksheetFile);

      axios.post('http://localhost:3001/scholarship', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        alert('Scholarship form submitted successfully!');
      })
      .catch(error => {
        alert('There was an error submitting the form.');
      });
    },
  });

  const handlePhotoUpload = (event) => setPhotoFile(event.target.files[0]);
  const handleCasteUpload = (event) => setCasteFile(event.target.files[0]);
  const handleIncomeUpload = (event) => setIncomeFile(event.target.files[0]);
  const handleMarksheetUpload = (event) => setMarksheetFile(event.target.files[0]);

  const handleBack = () => navigate('/ScholarshipPage');

  return (
    <div className="scholar-container">
      <h2>Scholarship Application</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
        </div>

        <div>
          <label htmlFor="college">College:</label>
          <input id="college" name="college" type="text" {...formik.getFieldProps('college')} />
          {formik.touched.college && formik.errors.college && <div>{formik.errors.college}</div>}
        </div>

        <div>
          <label htmlFor="marks">Marks:</label>
          <input id="marks" name="marks" type="number" {...formik.getFieldProps('marks')} />
          {formik.touched.marks && formik.errors.marks && <div>{formik.errors.marks}</div>}
        </div>

        <div>
          <label htmlFor="year">Current Academic Year:</label>
          <input id="year" name="year" type="text" {...formik.getFieldProps('year')} />
          {formik.touched.year && formik.errors.year && <div>{formik.errors.year}</div>}
        </div>

        <div>
          <label htmlFor="photo">Upload Photo:</label>
          <input type="file" onChange={handlePhotoUpload} />
        </div>

        <div>
          <label htmlFor="caste">Upload Caste Certificate:</label>
          <input type="file" onChange={handleCasteUpload} />
        </div>

        <div>
          <label htmlFor="income">Upload Income Certificate:</label>
          <input type="file" onChange={handleIncomeUpload} />
        </div>

        <div>
          <label htmlFor="marksheet">Upload Marksheet:</label>
          <input type="file" onChange={handleMarksheetUpload} />
        </div>

        <div>
          <button type="submit" className='submit-button'>Submit</button>
          <button type="button" onClick={handleBack} className="back-button">Back</button>
        </div>
      </form>

      <h4>Related Scholarship Links</h4>
      <a href="https://mahadbtmahait.gov.in/" target="_blank" rel="noopener noreferrer">
        Babasaheb Ambedkar Samajkalyan Scholarship Portal
      </a>
    </div>
  );
};

export default Scholarship;
