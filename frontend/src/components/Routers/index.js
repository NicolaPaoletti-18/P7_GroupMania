import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "../../pages/Home";
import Conversation from "../../pages/Conversation";
import Profil from "../../pages/Profile";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component = {Home} />
        <Route path='/profil' exact component = {Profil} />
        <Route path='/conversation' exact component = {Conversation} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};
export default index; 