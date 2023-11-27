// Prevention page to not user who is not an admin go to Admin page

import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-img-container"/>
            <div className="unauthorized-text-container">
                <h1>Access Denied</h1>
                <p>You do not have an access to this page.</p>
                <p>You are not an administrator.</p>
            </div>
            <button className="mt-4 go-back-btn" onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default Unauthorized;