
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './component/NavBar';
import LoginPage from './pages/Login';
import styled from 'styled-components'


function App() {


  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route  path='/' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  
  );
}

export default App;
