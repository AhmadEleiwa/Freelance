import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './MostPopularList.css'


const MostPopularList = props => {
    const [item, setItem] = useState()
    const [tap, setTap] = useState('popular')

    const taps = useRef()

    useEffect(() => {
        fetch('http://localhost:5000/product/' + tap, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then(data => setItem(data.products.slice(0, 10)))
    
    }, [tap])


    const tapClickHandler = event => {
        const nodes = taps.current.childNodes;
        for (let i = 0; i < nodes.length; i++)
            nodes[i].classList.remove('active')
        event.currentTarget.classList.add('active')
        setTap(event.currentTarget.value)
    }
    return <div className='container'>
        <h2>Popular</h2>
        <div className='taps' ref={taps}>
            <button className='tap active' value={'popular'} onClick={tapClickHandler}>Most Popular</button>
            <button className='tap' value={"top-sales"} onClick={tapClickHandler}>Top Sales</button>
        </div>
        <div className='items-list'>
            {item && item.map(item => <div key={item.id} className="card">
                <NavLink to={'/view/'+item.id} className="card-img"   >
                    {/* <img src={`http://localhost:5000/${item.image[0]}`} alt='None' /> */}
                    <div className='img' style={{backgroundImage:`url(http://localhost:5000/${item.image[0]})`}} ></div>
                    <p className='title'>{item.productName}</p>
                    <p className='decsription'>{item.description.length > 30 ? item.description.substring(0, 30) + "..." : item.description.substring(0, 30)}</p>
                </NavLink>
            </div>
            )}

        </div>
    </div>
}


export default MostPopularList