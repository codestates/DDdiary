
import './App.css';
import { Intro, MainContainer, PageContainer } from './pages/Intro';
import  MainPage  from './pages/MainPage';
import  LoginPage  from './pages/Login'
import  SignUpPage  from './pages/SignUp'
import  MyPage  from './pages/MyPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from './pages/NavBar';


function App() {


  return (

    <>
    <BrowserRouter>
    <NavBar/>
    <MainContainer>
    <PageContainer>
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
      <Route path="/signuppage">
        <SignUpPage />
      </Route>
    </Switch>
    </PageContainer>
    </MainContainer>
    </BrowserRouter>
    </>

  );
}

export default App;
