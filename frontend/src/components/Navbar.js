import React, {useContext} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Lougout";
import { UidContext } from "./Routers/AppContext";


const NavBar = () => {
  const uid =  useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);



  return(
   <nav>
      <div className = 'nav-container'>
       <div className = 'logo'> 
        <NavLink exact to ='/conversation'>
          <div className = 'logo'>
            <img src = '../images/icon-left-font-monochrome-black.png' alt ='logo'/>
          </div>
        </NavLink>
       </div>
       {uid ? (
         <ul> 
           <li></li>
           <li className = 'welcome'>
             <NavLink exact to='/conversation'>
               <h5>Bienvenue {userData.FirstName}</h5>
             </NavLink>
           </li>
           <Logout />
         </ul>
       ):(
         <ul>
           <li></li>
           <li>
             <NavLink exact to='/'>
             <i className="fas fa-door-closed"></i>
             </NavLink>
           </li>
         </ul>   
       )}
     </div>
   </nav>
  )
}

export default NavBar ;