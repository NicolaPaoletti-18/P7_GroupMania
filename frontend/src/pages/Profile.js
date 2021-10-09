import React, { useContext }  from "react";

//import { UidContext } from "../components/Routers/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

//import Log from "../components/Log";




const Profil = () => {
  //const uid = useContext(UidContext);
  //{uid ? (// ): //)} <Log signIn ={true} signUp = {false}/><div className="log-container">
    /*<div className='img-container'>
      <img src = './images/icon-above-font.png' alt=''/>
   </div>
    </div>*/

 return (
 <div className="profil-page">
 
     <UpdateProfil />
  
    
   
 
 </div>
 );

};

export default Profil;