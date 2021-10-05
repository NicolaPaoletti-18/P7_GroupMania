
import React, { useState } from "react";
import LeftNav from "../Routers/LeftNav";
import { useDispatch, useSelector} from 'react-redux';
import UploadImg from "./Uploadimg";
import { updateBio, updatePseudo } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState ('');
  const [pseudo, setPseudo] = useState ('');
  const [updateForm, setUpdateFOrm] = useState (false);
  const dispatch = useDispatch;

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    dispatch(updatePseudo(userData._id, pseudo));
    setUpdateFOrm(false);
  }

  const userData = useSelector((state ) => state.userReducer)

  return (

    <div className= ' profil-container'>
      <LeftNav />
      <h1> Profil de {userData.FirstName}</h1>
      <div className = 'update-container'>
        <div className = 'left-part'>
          <h3> Photo de profil</h3>
          <img src={userData.picture} alt='photoprofil'/>
          <UploadImg />
        </div>
        <div className ='right-part'>
          <div className ='bio-update'>
            <h3>Bio</h3>
            {updateForm === false && (
              <>
              <p onClick ={() => setUpdateFOrm(!updateForm)}>{userData.bio}</p>
              <button onClick ={() => setUpdateFOrm(!updateForm)}> Modif Bio</button>
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
              <p onClick ={() => setUpdateFOrm(!updateForm)}>{userData.pseudo}</p>
              <button onClick ={() => setUpdateFOrm(!updateForm)}> Modif Bio</button>
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
        </div>
      </div>
    </div>
  )
};

export default UpdateProfil;