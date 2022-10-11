import React from "react";

import './DiscoverContainer.css'


const DiscoverContainer = props =>{
    return <div className="discover" style={{backgroundImage:"url(http://localhost:5000/static/images/image2.jpg)"}}>
            <div className="black-shadow"></div>
            <div className="content">
                <h1>Discover More</h1>
                <p>Find assets you've never seen before</p>
                <button>Discover</button>
            </div>
    </div>
}


export default DiscoverContainer