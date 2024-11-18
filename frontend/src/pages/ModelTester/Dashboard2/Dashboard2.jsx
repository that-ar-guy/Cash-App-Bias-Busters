import React, { useState, useEffect, useRef } from "react";
import ChartComponent2 from "../ChartComponenet2/ChartComponent2.jsx";
import ControlButton2 from "../ControlButtons2/ControlButtons2.jsx";
import "./Dashboard2.css";
import swal from 'sweetalert2';

const Dashboard2 = () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [currUser, setCurrUser] = useState("");

  const backgroundColours = [
    "#00CC00", // Darker bright green 1
    "#66CC66", // Darker bright green 2
    "#66FF66", // Bright green 3 (unchanged)
    "#99CC99", // Darker bright green 4
    "#99FF99", // Bright green 5 (unchanged)
  ];

  const [graphData, setGraphData] = useState({
    labels: ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"],
    datasets: [
      {
        label: "Models",
        data: [0, 0, 0, 0, 0],
        backgroundColor: backgroundColours,
      },
    ],
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const tempUploadedFiles = ['model1', 'model2', 'model3', 'model4', 'model5'];

  const [generationResults, setGenerationResults] = useState([]);

  const fetchEmailAndDemographics = async () => {
    const url = `${VITE_BACKEND_URL}/get-email`;

    try {
      const emailResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const emailData = await emailResponse.json();
      console.log(emailData);

      if (emailData && emailData.email) {
        setCurrUser(emailData.email); // Set the user email if it exists
      } else {
        setCurrUser("");

        swal.fire({
          icon: "error",
          title: "Please log in first",
          text: "You need to log in to access this page.",
          confirmButtonText: "Go to Login",
          timer: 5000,
          timerProgressBar: true,
        }).then(() => {

          window.location.href = "/";
        });
      }
    } catch (error) {
      console.error("Error fetching email:", error);

      // If there is any error fetching email, show the same alert
      swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching your email. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchEmailAndDemographics();

    // Load uploaded files from localStorage
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles"));
    if (storedFiles) {
      setUploadedFiles(storedFiles); // Update the state with uploaded files
    }
  }, []);

  const handleGenerateClick = async () => {
    if (!currUser) {
      alert("Error: No current user found.");
      return;
    }

    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/generate-for-all-models`,
        {
          method: "POST",
          body: new URLSearchParams({
            curr_user: currUser,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error generating models: " + errorData.error);
        return;
      }

      const data = await response.json();
      setGenerationResults(data);
      console.log("Model Tester Generation Results:", data);

      const meanData = data.map(result => result.mean);

      setGraphData({
        labels: uploadedFiles,
        datasets: [
          {
            label: "Bias",
            data: meanData,
            backgroundColor: backgroundColours,
          },
        ],
      });

    } catch (error) {
      console.error("Error during model generation:", error);
      alert("Error during model generation: " + error.message);
    }
  };


  return (
    <div className="dashboard-main">
      {/* Pass setUploadedFiles to ControlButton2 */}
      <div className="button-container">
        <ControlButton2 setUploadedFiles={setUploadedFiles} />

        {uploadedFiles.length > 0 && <div className="action-button-container">
          <button onClick={handleGenerateClick} className="generate-btn">
            Generate
          </button>
        </div>}
      </div>

      {generationResults.length > 0 && (
        <div className="result-section">
          {generationResults.map((result, index) => (
            <ul key={index}>
              <li className="result-item">
                <div className="result-details">
                  <strong className="output-name">File:</strong>
                  <span className="output-value">{uploadedFiles[index]}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">Race:</strong>
                  <span className="output-value">{result.race}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">Gender:</strong>
                  <span className="output-value">{result.gender}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">Age:</strong>
                  <span className="output-value">{result.age_groups}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">State:</strong>
                  <span className="output-value">{result.state}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">Variance:</strong>
                  <span className="output-value">{result.variance}</span>
                </div>
                <div className="result-details">
                  <strong className="output-name">Bias:</strong>
                  <span className="output-value">{result.mean}</span>
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}

      <div className="chart-section">
        {Object.keys(graphData).length > 0 && (
          <ChartComponent2 chartData={graphData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard2;
