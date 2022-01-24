import React from 'react'
import './PageNotFound.css'
import { useNavigate } from "react-router-dom";

function PageNotFoundComponent() {
    const navigate = useNavigate();
    return (
        <>
            <div className="pagenotfound">
                <span style={{ fontSize: '35px' }}>Something's wrong here...</span>
                <span style={{ fontSize: '22px' }}>We can't find the page you're looking for.Check out our other Services or head back to home.</span>
                <div className="notfoundbtns">
                    <button>Services</button>
                    <button onClick={() => navigate('/home')}>Home</button>
                </div>
            </div>
        </>
    )
}

export default PageNotFoundComponent
