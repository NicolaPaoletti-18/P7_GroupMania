import React, {useContext} from "react";
import Log from "../components/Log/index";
import { UidContext } from "../components/Routers/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Home = () => {
 const uid =useContext(UidContext);


 return (
<div className="profile-page">
    
  {uid ? (

    <UpdateProfil />

    ) : (
   <div className="log-container">
    <div className='img-container'>
      <img src = './images/icon-above-font.png' alt=''/>
    </div>

    <Log signIn ={true} signUp = {false}/>
  
   </div>

  )}

</div>
 );

};

export default Home;