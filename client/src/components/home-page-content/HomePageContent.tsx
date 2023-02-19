import React from "react";
import Button from "@mui/material/Button";

export const HomePageContent: React.FC =  () => {
    return ( 
        <div>
            <h1 className="homePageHeader">חידונים מטורפים</h1>
            <p>!בחנו את החברים שלכם בטריוויה שאתם יצרתם</p>
            <p>שלום, user context</p>
            <div className="homePageButtons">
                <Button>צור חידון חדש</Button>
                <Button>החידונים שלי</Button>
            </div>
        </div>
     );
}

