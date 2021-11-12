import { Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from 'styled-components';

library.add(faHome, faCalendarCheck, faUser, faSignInAlt);

export const MainContainer = styled.div`
  background-color: #D8D8D8;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 35px;
`;

export const NavBar = () => {

  return (
      <MainContainer>
    <section className="sidebar">
        <Link exact to ="/"><FontAwesomeIcon icon="home"></FontAwesomeIcon></Link>
        <Link to="/mainpage"><FontAwesomeIcon icon="calendar-check"></FontAwesomeIcon></Link>
        <Link to="/mypage"><FontAwesomeIcon icon="user"></FontAwesomeIcon></Link>
        <Link to="/loginpage"><FontAwesomeIcon icon="sign-in-alt"></FontAwesomeIcon></Link>
    </section>
    </MainContainer>
  );
}