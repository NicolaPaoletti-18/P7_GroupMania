import React, {useState} from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async(e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const emailError = document.querySelector('.email.error');
    const firstNameError = document.querySelector('.firstName.error');
    const lastNameError = document.querySelector('.lastName.error');
    const passwordError = document.querySelector('.password.error');
    const termsError = document.querySelector('.terms.error');

    passwordError.innerHTML ='';
    termsError.innerHTML = '';

    if( !terms.checked){
      termsError.innerHTML = 'Veuillez valider les conditionen générales!';
    } else{
      await axios ({
        method:'post',
        url:`http://localhost:4000/api/user/signup`, //${process.env.REACT_APP_API_URL}
        data: {
          email,
          firstName,
          lastName,
          password
        }
      })
      .then((res) => {
        console.log(res)
        if(res.data.errors){
          emailError.innerHTML = res.data.errors.email;
          firstNameError.innerHTML = res.data.errors.firstName;
          lastNameError.innerHTML = res.data.errors.lastName;
          passwordError.innerHTML = res.data.errors.password;
        }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
  <form action ='' onSubmit={handleRegister} id='sign-up-form'>
    <label htmlFor='email'> Email </label>
    <br/>
    <input 
        type='text' 
        name='email' 
        id='email' 
        onChange= {(e) =>setEmail(e.target.value)} 
        value={email} 
    />
    <div className='email error'></div>
    <br/>
    <label htmlFor='firstName'> Prénom</label>
    <br/>
    <input 
        type='text' 
        name='firstName' 
        id='firstName' 
        onChange= {(e) => setFirstName(e.target.value)} 
        value={firstName} 
    />
    <div className='FirstName error'></div>
    <br/>
    <label htmlFor='lastName'>Nom</label>
    <br/>
    <input 
        type='text' 
        name='lastName' 
        id='lastName' 
        onChange= {(e) => setLastName(e.target.value)} 
        value={lastName} 
    />
    <div className='lastName error'></div>
    <br/>
    <label htmlFor='password'>Mot de passe</label>
    <br/>
    <input 
        type='password' 
        name='password' 
        id='password' 
        onChange= {(e) => setPassword(e.target.value)} 
        value={password} 
    />
    <div className='password error'></div>
    <br/>
    <input type='checkbox' id='terms'/>
    <label htmlFor='terms'> J'accepte les 
      <a href='/' target='_blanck' rel='noopener noreferrer'>conditions générales</a></label>
      <div className='terms error'></div>
    <br/>
    <input type='submit' value='Valider Inscripion'/>
  </form>
  );

};

export default SignUp;