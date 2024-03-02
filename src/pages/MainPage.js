import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    let customerID = searchParams.get('doctorID');
    const doctorID = parseInt(customerID,10)
    const [customers, setCustomer] = useState(null)
    const [hoveredButton, setHoveredButton] = useState(null);
    let foundCustomer 
    useEffect(() => {
        const fetchcustomers = async() => {
            const response = await fetch('/doctor')
            const json = await response.json()

            if(response.ok) {
                setCustomer(json)
            }
        }
        fetchcustomers()
    }, [])

    if(customers!==null) {
        foundCustomer = customers.find((customer) => customer.Doctor_ID === doctorID);

        const create = () => {
            navigate(`/create?doctorID=${foundCustomer.Doctor_ID}`);
        }
        const summ = () => {
            navigate(`/summary?doctorID=${foundCustomer.Doctor_ID}`);
        }

      const buttonStyle = {
        backgroundColor: '#f5f5f5',
        color: '#555',
        padding: '10px 20px',
        margin: '5px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease-in-out',
    };

    const leftButtonStyle = {
        ...buttonStyle,
        backgroundColor: hoveredButton === 'search' ? '#ddd' : '#f5f5f5'
    };

    const rightButtonStyle = {
        ...buttonStyle,
        backgroundColor: hoveredButton === 'create' ? '#ddd' : '#f5f5f5'
    };
        
    const handleMouseOver = (buttonName) => {
        setHoveredButton(buttonName);
    };
  
    const handleMouseOut = () => {
        setHoveredButton(null);
    };
    
    return (
        <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            width: '500px',
        }}>
            <h2>Welcome {foundCustomer.Doctor_Name}!</h2>
            <div className="button-container">
                <div className="left-buttons">
                    <button
                        style={leftButtonStyle}
                        onClick={summ}
                        onMouseOver={() => handleMouseOver('search')}
                        onMouseOut={handleMouseOut}
                    >
                        Search patient
                    </button>
                </div>
                <div className="right-buttons">
                    <button
                        style={rightButtonStyle}
                        onClick={create}
                        onMouseOver={() => handleMouseOver('create')}
                        onMouseOut={handleMouseOut}
                    >
                        New patient
                    </button>
                </div>
            </div>
        </div>
    );
    }
};

export default MainPage;