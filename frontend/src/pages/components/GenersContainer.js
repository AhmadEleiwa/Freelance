import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './GenersContainer.css'


const GenersContainer = props =>{
    const [tags,setTags] = useState([
        1,2,3,4,5,6,7,8,9
    ])

    return <div className="geners">
        <h1>Geners</h1>
        <div className="list">
        {tags.map(item =>
        <div className="card">
            <NavLink to={'/'} className="card-img"  style={{backgroundImage:'url(http://localhost:5000/static/images/image2.jpg)'}} >
            <div className="black-shadow"></div>
            <h2>FPS</h2>
            </NavLink>
            <h3>FPS</h3>
            <p>Check out the latest  and greatest assets from the fps genere</p>
        </div>
        )}
    </div>
    </div>
}



export default GenersContainer