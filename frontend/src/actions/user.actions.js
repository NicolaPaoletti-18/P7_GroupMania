import axios from "axios";

export const GET_USER = 'GET_USER';
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES';
export const UPDATE_BIO = 'UPDATE_BIO';
export const UPDATE_PSEUDO = 'UPDATE_PSEUDO';

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
    .get(`http://localhost:3000/api/user/${uid}`)
    .then((res) => {
      dispatch({type: GET_USER, payload: res.data})
    })
    .catch((err) => console.log(err));
    
  };
};


export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
    .post(`http://localhost:3000/api/user/images`, data)
    .then((res) => {
      return axios 
      .get(`http://localhost:3000/api/user/${id}/profil`)
      .then((res) => {
        dispatch({type: UPLOAD_IMAGES, payload: res.data.image}) ;
      })
    })
    .catch((err) => console.log(err));
  }
};


export const updateBio = (userId, bio ) => {
  return (dispatch) => {
    return axios ({
      method: 'put',
      url: `http://localhost:3000/api/user/modify` + userId,
      data: {bio}
    })
    .then((res) => {
      dispatch ({ type: UPDATE_BIO, payload: bio})
    })
    .catch ((err) => console.log(err))
  }
};

export const updatePseudo = (userId, pseudo ) => {
  return (dispatch) => {
    return axios ({
      method: 'put',
      url: `http://localhost:3000/api/user/modify` + userId,
      data:{pseudo} 
    })
    .then((res) => {
      dispatch ({ type: UPDATE_PSEUDO, payload: pseudo})
    })
    .catch ((err) => console.log(err))
  }
}
