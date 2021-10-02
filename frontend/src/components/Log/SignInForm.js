
import React, { useState } from "react";
import axios from 'axios';



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    console.log('pass1');
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,//http://localhost:5000/,${process.env.REACT_APP_API_URL}
      withCredentials: true,
      data:{
        email,
        password,
      },
     
    })
     .then((res) => {
      console.log('pass2');
       if(res.data.errors){
         emailError.innerHTML = res.data.errors.email;
         passwordError.innerHTML = res.data.errors.password;
       } else{
         window.location = '/conversation';
       }
     })
     .catch((error) => {
      console.log('pass3');
       console.log(error)
     });
  };

  return (
    <form action ='' onSubmit={handleLogin} id='sign-up-form'>
      <label htmlFor ='email'>Email</label>
      <br/>
      <input 
          type ='text' 
          name='email' 
          id='email' 
          onChange ={(e) => setEmail (e.target.value)} 
          value={email}
       />
       <div className ='email error'> </div>
       <br/>
      <label htmlFor ='password'>Mot de passe</label>
      <br/>
      <input 
          type='password' 
          name='password' 
          id='password'
          onChange ={(e) => setPassword (e.target.value)} 
          value={password}
      />
      <div className ='password error'> </div>
      <br/>
      <input type='submit' value='Se conneter' />
    </form>

  );

};

export default SignIn;




