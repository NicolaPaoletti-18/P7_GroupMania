import React from "react";
import axios from "axios";
import cookie from 'js-cookie';

const Logout = () => {

  const removeCookie = (key) => {
    if (window === 'undefind') {
      cookie.remove (key, {expires : 1})
    }
  }

  const Logout = async () => {
    await axios ({
      method : 'get',
      url: `${process.env.REACT_APP_API_URL}/api/user/Logout`,
      withCredentials: true,
    })
    .then(() => removeCookie('jwt'))
    .catch((err) => console.log(err));

    window.location = '/';
  };
  
  return (
    <div>
      <li onClick = {Logout}>
      <i class="fas fa-door-open"></i>
      </li>
    </div>
  )
}

export default Logout;