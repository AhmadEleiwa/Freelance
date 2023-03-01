import React from "react";
import DiscoverContainer from "./components/DiscoverContainer";
import Footer from "./components/Footer";
import GenersContainer from "./components/GenersContainer";
import MostPopularContainer from "./components/MostPopularContainer";
import MostPopularList from "./components/MostPopularList";
import MostRatedPublisher from "./components/MostRatedPublisher";



const Home = props =>{
    document.title =  `Freelance` 
    return <div >


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