import React from "react";
import Log from "../components/Log/index";

const Home = () => {
 return (
<div className="profile-page">
    <div className="log-container">
     <Log />
     <div className='img-container'>
      <img src = './images/icon-above-font.png' alt=''/>
    </div>
  
   </div>
 </div>
 );

};

export default Home;