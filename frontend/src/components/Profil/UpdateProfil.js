
import React, { useState } from "react";
import LeftNav from "../Routers/LeftNav";
import { useDispatch, useSelector} from 'react-redux';
import UploadImg from "./Uploadimg";
import { updateBio, updatePseudo } from "../../actions/user.actions";


const UpdateProfil = () => {
  const [bio, setBio] = useState ('');
  const [pseudo, setPseudo] = useState ('');
  const [updateForm, setUpdateForm] = useState (false);
  const userData = useSelector((state ) => state.userReducer)
  const dispatch = useDispatch;

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio), updatePseudo(userData._id, pseudo));
    //dispatch(updatePseudo(userData._id, pseudo));
    setUpdateForm(false);
  }

 

  return (

    <div className= ' profil-container'>
      <LeftNav />
      <h1> Profil de {userData.FirstName}</h1>
      <div className = 'update-container'>
        <div className = 'left-part'>
          <h3> Photo de profil</h3>
          <img src={userData.image} alt='photoprofil'/>
          <UploadImg />
        </div>
        <div className ='right-part'>
          <div className ='bio-update'>
            <h3>Bio</h3>
            {updateForm === false && (
              <>
              <p onClick ={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <button onClick ={() => setUpdateForm(!updateForm)}> Modif Bio</button>
              </>
            ) }
            {updateForm && (
              <>
              <textarea 
                type ='text' 
                defaultValue= {userData.bio} 
                onChange = {(e) => setBio(e.target.value)} > 
              </textarea>
              </>
            )}
          </div>
          <div className ='pseudo-update'>
          <h3>Pseudo</h3>
            {updateForm === false && (
              <>
              <p onClick ={() => setUpdateForm(!updateForm)}>{userData.pseudo}</p>
              <button onClick ={() => setUpdateForm(!updateForm)}> Modif Pseudo</button>
              </>
            ) }
            {updateForm && (
              <>
              <textarea 
                type ='text' 
                defaultValue= {userData.pseudo} 
                onChange = {(e) => setPseudo(e.target.value)} > 
              </textarea>
              <button onClick= {handleUpdate} > Valider modification</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {userData.dateCreation}</h4>
        </div>
      </div>
    </div>
  )
};

export default UpdateProfil;