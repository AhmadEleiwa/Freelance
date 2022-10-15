import React from "react";
import DiscoverContainer from "./DiscoverContainer";
import Footer from "./Footer";
import GenersContainer from "./GenersContainer";
import MostPopularContainer from "./MostPopularContainer";
import MostPopularList from "./MostPopularList";
import MostRatedPublisher from "./MostRatedPublisher";



const Home = () =>{
    return <div>


        <DiscoverContainer />
        <GenersContainer />
        <MostPopularContainer />
        <MostPopularList />

        <MostRatedPublisher />
        {/* <hr style={{color:'#D3DEDC', opacity:0.4}} /> */}

        <Footer />

    </div>
}


export default Home