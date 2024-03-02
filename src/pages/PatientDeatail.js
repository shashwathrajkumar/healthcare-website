import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
const Summary = () => {
    const navigate = useNavigate();
    const [accounts, setAccount] = useState(null)
    const [foundAccounts, setFoundAccounts] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
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

      const Check = async() => {
        const patid = document.getElementById("patid");
        const patidval = parseInt(patid.value,10);
        if(accounts!==null) {
          const foundAccounts = accounts.filter((account) => account.Patient_ID === patidval);
          const desc = foundAccounts.map((account) => (
            account.Description
          ))
          console.log(desc)
          setFoundAccounts(foundAccounts);
        }
      }

      const handleHover = () => {
        setIsHovered(true);
      };
    
      const handleLeave = () => {
        setIsHovered(false);
      };

      const Newcomp = () => {
        navigate(`/add?patientID=${foundAccounts.map((account) => (account.Patient_ID)) }`);
      }
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
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                border: '2px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                width: '500px',
                maxHeight: 'calc(100vh - 100px)', 
                overflowY: 'auto',
              }}
            >
              <h2>Search for patients</h2>
              <div style={{ marginTop: "20px" }}>
              <label>Patient ID: </label>
              <input type="text" id="patid" />
            </div >
            <div style={{ marginTop: "20px" }}>
            <button
                onClick={Check}
                style={buttonStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Submit
              </button>
              
              {foundAccounts && (
              <div style={{ marginTop: "20px" }}>
                <h3>Patient</h3>
                  {foundAccounts.map((account) => (
                    <div>
                      Patient Name: {account.Patient_Name}
                      <br></br>
                      Patient ID: {account.Patient_ID}
                      <br></br>
                      Gender: {account.Gender}
                      <br></br>
                      Age: {account.Age}
                      <br></br>
                      Blood Group: {account.Blood_Group}
                      <br></br>
                      Height: {account.Height} cm
                      <br></br>
                      Weight: {account.Weight} kg
                      <br></br>
                      Diabetic: {account.Diabetic}
                      <br></br>
                      Cholestrol: {account.Cholestrol} mG/L
                      <div style={{ marginTop: "20px"}}>
                        <h3>Medical History</h3>
                        <ol>
                          {account.Description.slice(1).map((item, index) => (
                            <li key={index}>
                              Complication: {item.complication}
                              <br></br>
                              Prescription: {item.prescription}
                              <br></br>
                              Date: {new Date(account.updatedAt).toLocaleDateString()}
                            </li>
                          ))}
                        </ol>
                        <div>
                          <button
                          onClick={Newcomp}
                          style={buttonStyle}
                          onMouseEnter={handleHover}
                          onMouseLeave={handleLeave}
                          >
                            Add complication
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              )}
            </div>
              
            </div> 
          );
          
          
      }    

export default Summary;