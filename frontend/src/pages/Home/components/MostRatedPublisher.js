import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './MostRatedPublisher.css'

const MostRatedPublisher = () => {
    const [users, setUsers] = useState()


    useEffect(() => {
        fetch('http://localhost:5000/user/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setUsers(data.users))
    }, [])

    return <div className="publisher-container">
        <h2>Top-Rated publusher</h2>
        <div className="list">
            {users && users.map(user =>
                <NavLink to={'/'} key={user.id}>
                    <div className="card">
                        <div className="img" style={{backgroundImage:`url(http://localhost:5000/${user.image})`}} ></div>
                        {/* <img src={`http://localhost:5000/${user.image}`} alt="" /> */}
                        <p>{user.name}</p>
                    </div>
                </NavLink>
            )
            }

        </div>
    </div>
}

export default MostRatedPublisher