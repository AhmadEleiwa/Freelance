import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './List.css'


const List = props => {


    return <div className='search-container'>
        <h2>Products about  <span>{props.title}</span></h2>

        <div className='items-list'>
            {props.items && props.items.map(item => <div key={item.id} className="card">
                <NavLink to={'/view/'+item.id} className="card-img"   >
                    <img src={`http://localhost:5000/${item.image[0]}`} alt='None' />
                    <p className='title'>{item.productName}</p>
                    <p className='decsription'>{item.description.length > 30 ? item.description.substring(0, 30) + "..." : item.description.substring(0, 30)}</p>
                </NavLink>
            </div>
            )}

        </div>
    </div>
}


export default List