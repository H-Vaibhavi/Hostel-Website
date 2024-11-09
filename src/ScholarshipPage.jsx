// Import React and CSS file
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './ScholarshipPage.css';
import Navbar from './Navbar';
import './Scholarship';


const ScholarshipPage = () => {
  return (
    <div>
         <Navbar /> {}
         <h1>Scholarship Section</h1>
    <div className="admission-container">
      
      {/* Admission Procedure Section */}
      <div className="section">
        <h2>Admission Procedure</h2>
        <p>
            <ol>
                <li>Contact to your nearest Social Welfare Office (Samaj Kalyan)</li>
                <li>If registration is online then fill out the hostel registration form on <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in</a> .
                If registration is offline then please contact to your district Social Welfare office immediately.</li>
                <li>The forms of hostel admission made available during or after the exam (10th, 12th, Graduation etc.).</li>
                <li>Collect the form from the office. Make a xerox copy of that form for your reference. Read and understand the form clearly.</li>
                <li>If you are unclear at any point, better to fill the form by HB pencil first. Later you can erase it and fill the form by pen.</li>
                <li>Keep all the documents ready, as mentioned in the form and as per the sequence.</li>
                <li>You have to attach xerox copies only to the form and not the original certificates.
                <strong>DO NOT HANDOVER ORIGINAL CERTIFICATES/DOCUMENTS TO ANYONE.</strong></li>
                <li>Hostel admission process takes around 15 days to 1 month.</li>
                <li>If your application gets short-listed, you will receive a letter (or phone call) from the office and will might have face-to-face interview.</li>
                <li>If gets selected, you will receive selection letter (or phone call) from the office.</li>
                </ol>
                <strong>Hostel admission procedure (for Maharashtra):</strong>
            <ul>
                <li>Go to <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in/</a></li>
                <li>If you are already registered yourself on <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in/</a> then LOGIN with your username and password</li>
                <li>If you didn't registered on <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in/</a> before, then click on 'New Student Registration' and REGISTER ONLINE as a student on <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in/</a></li>
                <li>Even though your school/college/university admission is not yet confirmed, still submit hostel admission form online</li>
                <li>Your hostel admission application will be (online) delivered to hostel rector</li>
                <li>Rector will finalized the students for hostel admission and will send that list to Assistant Commissioner, Social Welfare</li>
                <li>Hostel eligible students list will be published at Assistant Commissioner Office, Social Welfare Department, All Districts</li>
                <li>The list will also be published onto <a href="https://mahaeschol.maharashtra.gov.in/">https://mahaeschol.maharashtra.gov.in/</a></li>
                <li>Selected students should go to rector (= hostel office) of the hostel with all the documents mentioned below</li>
                <li>Hostel rector will be responsible for hostel admission. So keep in touch with hostel rector</li>
            </ul>
            Important hostel admission dates (<a href="https://sjsa.maharashtra.gov.in/">https://sjsa.maharashtra.gov.in/</a>):
        </p>
      </div>

      {/* Documents Section */}
      <div className="section">
        <h2>Documents</h2>
        <p>
            <strong>Mandatory Documents</strong>
            <ol>
                <li>Latest mark-sheet (मार्कशिट)</li>
                <li>School leaving and/or college/university transfer certificate (शाळा/कॉलेज सोडल्याचा दाखला)</li>
                <li>Board certificate (बोर्ड दाखला)</li>
                <li>Caste certificate (जातीचा दाखला)</li>
                <li>Income certificate (उत्पन्नाचा दाखला)</li>
                <li>Three (3) passport size photos. Make sure all these photos are same. (३ पासपोर्ट साईज फोटो)</li>
                <li>Caste verification certificate (if asked) (जात पडताळणी दाखला - विचारल्यास)</li>
                <li>Domicile certificate (if asked) (रहिवासी दाखला - विचारल्यास)</li>
                <li>Nationality certificate (if asked) (राष्ट्रीयत्वाचा दाखला - विचारल्यास)</li>
            </ol>
        </p>
        
        <p>
        <strong>Optional (good to have) documents (खालील कागदपत्र असल्यास उत्तम):</strong>
            <ol>
                <li>Identity proof (School / College / University I-Card OR Election Card OR Passport OR Driving Licence OR Aadhaar Card OR PAN Card etc.) (ओळखपत्र)</li>
                <li>Address proof (Light-bill, Passport, Aadhaar etc.) (राहत असल्याचा पुरावा)</li>
                <li>Age proof (mentioned in your school leaving and/or college/university transfer certificate) (वयाचा पुरावा)</li>
                <li>NOC (No Objection Certificate)</li>
                <li>Studen's bank account passbook (विद्यार्थ्याचं बँक पासबुक)</li>
            </ol>
        </p>
    
        <p>
        <strong>Additional (good to have) Things:</strong>
            <ol>
                <li>Two envelops</li>
                <li>Postage stamps</li>
                <li>Revenew stamps</li>
                <li>Both blue and black ink pens</li>
                <li>Pencil and eraser</li>
                <li>Additional xerox (at least two copies) of all the documents you have</li>
                <li>Stapler with enough staple pins</li>
            </ol>
        </p>
      </div>

      {/* Eligibility Section */}
      <div className="section">
        <h2>Eligibility</h2>
        <p>
            <ol>
                <li>10th (for Junior college education)</li>
                <li>11th (for 12th education)</li>
                <li>12th (for Senior college education)</li>
                <li>Graduation (for Post Graduation education)</li>
                <li>Post Graduation (for M.Phil, Ph.D etc. education)</li>
                <li>Graduation (or last year of graduation) (for competitive - UPSC/MPSC/Bank Probationary Officer/Staff Selection etc. - examination you will have to take admission in college, university)</li>
                <li>Distance - from your current location to the expected hostel location. The more the distance, the more chances to get admission in hostel.
                (विद्यार्थ्याचं राहत ठिकाण अन तुमची शाळा/कॉलेज/विद्यापीठ यातील अंतर)</li>
                <li>Need - It is important that you 'really' need the hostel. Hostel rector checks your need also.
                (विद्यार्थ्याची हॉस्टेलची निकड/गरज किती आहे)</li>
                <li>Income - The income limit mentions in the form.
                (घरातील एकूण उत्पन्न)</li>
                <li>Should be able to pay hostel's monthly/yearly fees (not always but if mentioned in the form. Mostly applicable to private hostels only.)</li>
            </ol>
        </p>
      </div>

      {/* Selection Criteria Section */}
      <div className="section">
        <h2>Selection Criteria</h2>
        <p>
            <ol>
                <li>Selection criteria mostly based on the eligibility points.</li>
                <li>You should first get an admission.</li>
                <li>Distance matters the most in selection criteria. For example if you are leaving in Nagpur, and got admission in Pune, then you fit in the criteria.</li>
                <li>Your hostel need gets checked before and during the process. If at any stage, concern person noticed that you are not in need of hostel, your application will be rejected.</li>
                <li>Should be able to pay hostel's monthly/yearly fees (if mentioned in the form)</li>
                <li>Quantity - There are always limited seats available in all hostels. That means, the selection happens on first-come first-serve basis. So you have to apply as soon as possible.</li>
                <li>Gender - If a hostel is specifically for females, then only female candidates can apply.
                    If a hostel is only for males, then only male candidates can apply.
                    If a hostel is for both males and females, then both male and female candidates can apply.</li>
                <li>Income - Hostels run for needy candidates. The income limit also mentions in the form.</li>
            </ol>
        </p>
      </div>

      {/* Important Dates Section */}
      <div className="section">
        <h2>Apply For Scholarship Now</h2>
        <Link to="/Scholarship" className="button">Apply Now</Link>
      </div>
    </div>
    </div>
  );
};

export default ScholarshipPage;
