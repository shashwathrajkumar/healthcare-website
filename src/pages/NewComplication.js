import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom";
const Add = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [accounts, setAccount] = useState(null)
    const location = useLocation();
    let patientID = parseInt(new URLSearchParams(location.search).get("patientID"), 10);
    useEffect(() => {
        const fetchAccounts = async () => {
          const response = await fetch('/patient');
          const json = await response.json()
          if (response.ok) {
            setAccount(json)
          }
        };
        fetchAccounts();
      }, []);

    const Newcomp = async() => {
        const complication = document.getElementById("comp").value;
        const prescription = document.getElementById("presc").value;
        if(accounts!==null) {
            const foundAccounts = accounts.filter((account) => account.Patient_ID === patientID);
            if (foundAccounts) {
                const id  = foundAccounts.map((account) => (
                    account._id
                ));
                const desc = foundAccounts.map((account) => (
                    account.Description
                ));
                if (Array.isArray(desc)) {
                    try {
                        const response = await fetch(`/patient/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ $push: { Description: { $each: [{ complication, prescription }]} } })
                        });
    
                        if (!response.ok) {
                            throw new Error('Failed to update complication');
                        }
    
                        alert('Complication added successfully');

                    } catch (error) {
                        console.error('Error updating complication:', error);
                        alert('Failed to update complication. Please try again.');
                    }
                } else {
                    console.error('Description is not an array:', foundAccounts.Description);
                    alert('Failed to update complication. Description is not in the expected format.');
                }
            } else {
                alert('Patient not found');
            }
        }
    }

    const handleHover = () => {
        setIsHovered(true);
      };
    
    const handleLeave = () => {
        setIsHovered(false);
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
          <h2>New complication</h2>
          <label>Enter complication: </label>
          <br></br>
          <input type="text" id="comp" />
          <div style={{ marginTop: "20px" }}>
              <label>Enter prescription: </label>
              <br></br>
              <textarea id="presc" />
          </div >
          <button
            onClick={Newcomp}
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            >
            Add
          </button>
        </div>
      );
}

export default Add