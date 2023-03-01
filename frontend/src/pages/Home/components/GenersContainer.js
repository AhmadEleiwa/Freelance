import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './GenersContainer.css'


const GenersContainer = props =>{
    const [tags,setTags] = useState()
    useEffect(()=>{
        fetch('http://localhost:5000/tag/tags', {
            method:'GET',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
              },
        }).then((res)=>res.json()).then(data => setTags(data.tags))
        
    },[])
    return <div className="geners">
        <h1>Geners</h1>
        <div className="list">
        {tags && tags.map(item =>
        <div key={item.id} className="card">
        
            <NavLink to={`search/${item.tagName}`}className="card-img"  style={{backgroundImage:`url(http://localhost:5000/static/images/${item.image})`}} >
            <div className="black-shadow"></div>
            <h2>{item.tagName}</h2>
            </NavLink>
            <h3>{item.tagName}</h3>
            <p>{item.tagDescription}</p>

        </div>
        )}
    </div>
    </div>
}



export default GenersContainer