import React , { useState } from "react";

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = (props) => {

  const [ signUpModal, setSignUpModal]= useState(props.signUp);
  const [ signInModal, setSignInModal] = useState(props.signIn);

  const handleModals = (e) =>{
    if(e.target.id === 'register'){
    
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login'){
    
      setSignInModal(true);
      setSignUpModal(false);
    }

  };

   //JSX
  return (
   
    <div className="connection-from">

      <div className ='form-container'>
        <ul>
          <li onClick ={handleModals} id = 'register'
           className= {signUpModal ? 'active-btn' : null}>S'inscrire</li>
          <li onClick ={handleModals} id = 'login' 
          className= {signInModal ? 'active-btn' : null}> Se connecter</li>
        </ul>
      
        { signInModal && < SignInForm />}
        { signUpModal && < SignUpForm />}
      </div>

    </div>
  )
};

export default Log;