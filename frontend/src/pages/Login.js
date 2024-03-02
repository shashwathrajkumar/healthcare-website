import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [customers, setCustomer] = useState(null);
  const navigate = useNavigate();

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

  const Customerexists = () => {
    if (customers) {
        const inputElement = document.getElementById("hospid");
        const inputval = parseInt(inputElement.value,10)
        const inputElement1 = document.getElementById("docid");
        const inputval1 = parseInt(inputElement1.value,10)
        if(inputval) {
            const foundCustomer = customers.find((customer) => customer.Hospital_ID === inputval);
            if (foundCustomer) {
                const foundDoctor = customers.find((customer) => customer.Doctor_ID === inputval1);
                if(inputval1) {
                  if(foundDoctor) {
                    const pwd = document.getElementById("password")
                    if(pwd.value!=='') {
                        if(foundCustomer.Password === pwd.value) {
                          const pwdstr = (inputval+inputval1).toString();
                          if(pwdstr===pwd.value) {
                            navigate(`/register?doctorID=${foundCustomer.Doctor_ID}`);
                          } else {
                            navigate(`/main?doctorID=${foundCustomer.Doctor_ID}`);
                          }
                        } else {
                            alert("Incorrect password")
                        }
                    } else {
                        alert("Enter password")
                    }
                  } else {
                    alert("Doctor ID is invalid")
                  }
                } else {
                  alert("Enter Doctor ID")
                }
            } else {
                alert("Hospital ID is invalid")
            }
        } else {
            alert("Enter Hospital ID")
        }
    } else {
        alert("Database error")
    }
  };


  const [loginButtonStyle, setLoginButtonStyle] = useState({
    // Style for the login button
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



  // Hover handlers for the login button
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
      <h1>Welcome to HealthVault!</h1>
      <hr></hr>
      <h2>Login</h2>
      <div style={{ marginTop: '20px' }}>
        <label>
          Enter hospital ID: <br></br>{' '}
        </label>
        <input type="text" maxLength="6" id="hospid" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          Enter doctor ID: <br></br>{' '}
        </label>
        <input type="text" maxLength="7" id="docid" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          Enter Password: <br></br>{' '}
        </label>
        <input type="password" id="password" />
      </div>
      <div style={{ marginTop: '20px' }}>
      <button
        style={loginButtonStyle}
        onClick={Customerexists}
        onMouseEnter={handleLoginHover}
        onMouseLeave={handleLoginLeave}
      >
        Login
      </button>
      </div>

    </div>
  );
};

export default LoginPage;
