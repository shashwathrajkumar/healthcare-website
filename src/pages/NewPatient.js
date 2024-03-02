import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const generateUniqueAccountID = (existingAccounts) => {
  let randomAccountID;
  const isDuplicate = (account) => account.Patient_ID === randomAccountID;

  do {
    randomAccountID = Math.floor(Math.random() * 9000) + 1000;
  } while (existingAccounts.some(isDuplicate));

  return randomAccountID;
};

const fetchAccountsAndGenerateID = async () => {
  const response = await fetch("/patient");
  if (response.ok) {
    const json = await response.json();
    return generateUniqueAccountID(json);
  }
  return null;
};

const Openacc = () => { 
  const [randomAccountID, setRandomAccountID] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let doctorID = parseInt(new URLSearchParams(location.search).get("doctorID"), 10);

  useEffect(() => {
    const fetchAndSetRandomID = async () => {
      const generatedID = await fetchAccountsAndGenerateID();
      setRandomAccountID(generatedID);
    };

    fetchAndSetRandomID();
  }, []);

  const Open = async () => {
    const desc = {complication: "First Entry", prescription: "None"};
    const name = document.getElementById("patname").value;
    const age = document.getElementById("age");
    const bg = document.getElementById("bg").value;
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const diabetic = document.getElementById("diab").checked ? "Yes" : "No";
    const chol = document.getElementById("height");
    const cholval = parseInt(chol.value,10);
    const ageval = parseInt(age.value,10);
    const heightval = parseInt(height.value,10);
    const weightval = parseInt(weight.value,10);
    
    const account = { Patient_Name: name, Patient_ID: randomAccountID, Gender: gender, Age: ageval, Blood_Group: bg, Height: heightval, Weight: weightval, Diabetic: diabetic, Cholestrol: cholval, Description: desc };
    const response = await fetch('/patient', {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      alert(`New patient created with id: ${randomAccountID}`);
      navigate(`/main?doctorID=${doctorID}`);
    } else {
      alert("An error occurred");
    }
    const json = await response.json();
    console.log(json);
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#45a049" : "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        width: "500px",
      }}
    >
      <h2>New patient</h2>
      <label>Enter Patient Name: </label>
      <input type="text" id="patname" />
      <div style={{ marginTop: "20px" }}>
        <label>Patient Age: </label>
        <input type="text" id="age" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Gender: </label>
        <input type="radio" id="male" name="gender" value="male" onChange={handleGenderChange} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" onChange={handleGenderChange} />
        <label htmlFor="female">Female</label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Blood Group: </label>
        <input type="text" id="bg" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Patient Height: </label>
        <input type="text" id="height" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Patient weight: </label>
        <input type="text" id="weight" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Cholestrol: </label>
        <input type="text" id="chol" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Is patient diabetic? </label>
        <input type="checkbox" id="diab" />
      </div>
      <div
        style={{ marginTop: "20px" }}
      >                   
        <button
          onClick={Open}
          style={buttonStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Openacc;


