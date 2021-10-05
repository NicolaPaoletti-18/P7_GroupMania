import React, {useEffect,useState} from "react";
import Routes from './components/Routers';
import { UidContext } from "./components/Routers/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { useDispatch } from "react-redux";


const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method :'get',
        url : `${process.env.REACT_APP_API_URL}/jtwid`,
        withCredentials: true
      })
        .then((res) => {setUid(res.data)})
        .catch((err)=> console.log('no token'));
    };
    fetchToken();

    if(uid) dispatch (getUser(uid));
  },[uid] );

return (
 <UidContext.Provider value={uid}>
   <Routes />
 </UidContext.Provider>
 );

};

export default App;