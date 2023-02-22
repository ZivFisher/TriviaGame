import React from "react";
import { HomePageContent } from "../../components/home-page-content/HomePageContent";
import './HomePage.scss';


export const HomePage : React.FC = () =>  {
    return ( 
        <div className="homePageContainer">
            <HomePageContent />
        </div>
     );
}
