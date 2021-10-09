import React from "react";
import LeftNav from "../components/Routers/LeftNav";
import Thread from "../components/Thread";

const Conversation = () => {
 return (
 <div className="home">
   
   <LeftNav />
   <div className= 'main'>
     <Thread />
   </div>
 </div>
 );

};

export default Conversation;