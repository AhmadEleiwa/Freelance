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
        // console.log(item.product)
        
    },[item])
    return <div className="most-popular">
        {item&& <div className="img" style={{backgroundImage:`url(http://localhost:5000/${item.product.image[0]})`}} ></div>}
        
        {item && <div className="content">
            <p className="creator">{item.user.name}</p>
            <p className="title">{item.product.productName}</p>
            <p className="description">{item.product.description}</p>
            <NavLink to={`/view/${item.product.id}`}>Find Out</NavLink>
        </div>}
    </div>
}

export default MostPopularContainer