// Prevention page to not user enters in unauthorized page & features

import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-img-container"/>
            <div className="unauthorized-text-container">
                <h1>Access Denied</h1>
                <p>Log In required.</p>
            </div>
            <button className="mt-4 go-back-btn" onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default Unauthorized;