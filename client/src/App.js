
import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { Intro } from './pages/Intro';
import  MainPage  from './pages/MainPage';
import  LoginPage  from './pages/Login'
import  MyPage  from './pages/MyPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from './pages/NavBar';


function App() {


  return (

    <>
    <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route exact path="/">
        <Intro/>
      </Route>
      <Route path="/mainpage">
        <MainPage />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
      <Route path="/loginpage">
        <LoginPage />
      </Route>
    </Switch>
    </BrowserRouter>
    </>

  );
}

export default App;
