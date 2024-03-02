import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [customers, setCustomer] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    let customerID = searchParams.get('doctorID');
    const doctorID = parseInt(customerID,10)
    useEffect(() => {
        const fetchcustomers = async () => {
          const response = await fetch('/doctor');
          const json = await response.json();
    
          if (response.ok) {
            setCustomer(json);
          }
        };
        fetchcustomers();
    }, []);

    const Customerexists = async() => {
        if (customers) {
            const foundDoctor = customers.find((customer) => customer.Doctor_ID === doctorID);
            if(foundDoctor) {
                const inputElement = document.getElementById("password");
                const inputElement1 = document.getElementById("password1");
                if(inputElement.value!=='') {
                    if(inputElement1.value!=='') {
                        if(inputElement.value === inputElement1.value) {
                        try {
                            const id = foundDoctor._id
                            const response = await fetch(`/doctor/${id}`, {
                                method: 'PATCH',
                                headers: {
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ Password: inputElement1.value }),
                            });
                            if (response.ok) {
                                alert("Password changed successfully.");
                                navigate('/');
                            } else {
                                throw new Error('Failed to change password.');
                            }
                            } catch (error) {
                            console.error('Error changing password:', error);
                            alert("Failed to change password. Please try again.");
                            }
                        } else {
                            alert("Passwords do not match.")
                        }
                    } else {
                        alert("Enter password")
                    }
                } else {
                    alert("Enter password")
                }
            }
        }
    }

      const [loginButtonStyle, setLoginButtonStyle] = useState({
        width: '100px',
        height: '30px',
        padding: '5px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
      });
    
      const handleLoginHover = () => {
        setLoginButtonStyle((prevStyle) => ({
          ...prevStyle,
          backgroundColor: '#45a049',
        }));
      };
    
      const handleLoginLeave = () => {
        setLoginButtonStyle((prevStyle) => ({
          ...prevStyle,
          backgroundColor: '#4CAF50',
        }));
      };

      return (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            marginTop: '20px',
            width: '500px',
          }}
        >
          <h1>Mandatory Change of Password</h1>
          <hr></hr>
          <div style={{ marginTop: '20px' }}>
            <label>
              Enter a Password: <br></br>{' '}
            </label>
            <input type="password" id="password" />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label>
              Enter it again: <br></br>{' '}
            </label>
            <input type="password" id="password1" />
          </div>
          <div style={{ marginTop: '20px' }}>
          <button
            style={loginButtonStyle}
            onClick={Customerexists}
            onMouseEnter={handleLoginHover}
            onMouseLeave={handleLoginLeave}
          >
            Change
          </button>
          </div>
        </div>
      );
}

export default Register