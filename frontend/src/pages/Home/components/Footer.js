import React from "react";
import './Footer.css'

const Footer = () =>{
    return <div className="footer">
        <div className="content">   
            <div className="list">
                <h1>Categories</h1>
                <p>Graphics & Design</p>
                <p>Digital Marketing</p>
                <p>Writing & Translation</p>
                <p>Video & Animation</p>
                <p>Music & Audio</p>

            </div>
            <div className="list">
            <h1>Support</h1>
                <p>Help & Support</p>
                <p>Selling </p>
                <p>Buying </p>
            </div>
            <div className="list">
            <h1>About</h1>
                <p>Careers</p>
                <p>Privacy Policy</p>
            </div>
        </div>
        <div className="contact">

        </div>
    </div>
}

export default Footer