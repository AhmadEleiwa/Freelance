import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './MostRatedPublisher.css'

const MostRatedPublisher= () =>{
    const [users, setUsers] = useState([
        1,2,3,4,5,6
    ])


    return <div className="publisher-container">
        <h2>Top-Rated publusher</h2>
        <div className="list">
            {users&& users.map(user =>
            <NavLink key={user}>
                <div className="card">
                    <img src="http://localhost:5000/uploads/images/user.jpg" alt="" />
                    <p>ahmad</p>
                </div>
            </NavLink>
            )
            }
        </div>
    </div>
}

export default MostRatedPublisher