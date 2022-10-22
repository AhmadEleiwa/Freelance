import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './MostPopularContainer.css'
const MostPopularContainer = props =>{
    const [item, setItem] = useState()

     useEffect(  ()=>{
      
           fetch('http://localhost:5000/product/most', {
            method:'GET',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
              },
        }).then(res => res.json()).then(data => data.message? console.log(data.message):setItem(data) )

        
    },[item])
    return <div className="most-popular">
        <img src={`http://localhost:5000/static/images/image1.jpg`} alt="None" />
            
        <div className="content">
            <p className="creator">item.user.name</p>
            <p className="title">item.product.productName</p>
            <p className="description">tem.product.description</p>
            <NavLink>Find Out</NavLink>
        </div>
        {item && <div className="content">
            <p className="creator">{item.user.name}</p>
            <p className="title">{item.product.productName}</p>
            <p className="description">{item.product.description}</p>
            <NavLink>Find Out</NavLink>
        </div>}
    </div>
}

export default MostPopularContainer