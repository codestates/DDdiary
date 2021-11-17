import './App.css';
import { Intro, MainContainer, PageContainer, IntroContainer } from './pages/Intro';
import  MainPage  from './pages/MainPage';
import  LoginPage  from './pages/Login'
import  MyPage  from './pages/MyPage';
import  SignUp from './pages/SignUp'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from './pages/NavBar';


function App() {
  console.log(process.env.REACT_APP_API_URL)

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
        <IntroContainer>
        <MainPage />
        </IntroContainer>
      </Route>
      <Route path="/mypage">
        <IntroContainer>
        <MyPage />
        </IntroContainer>
      </Route>
      <Route path="/loginpage">
        <IntroContainer>
        <LoginPage />
        </IntroContainer>
      </Route>
      <Route exact path="/signup">
        <IntroContainer>
        <SignUp />
        </IntroContainer>
      </Route>
    </Switch>
    </PageContainer>
    </MainContainer>
    </BrowserRouter>
    </>

  );
}

export default App;
