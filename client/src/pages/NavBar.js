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
  background-color: #8fbeff;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 35px;
  border-radius: 10px 10px 0px 0px;
  margin: 1rem 0px 0px 0px;
  > .sidebar {
    height: 3rem;
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 5rem;
    border-radius: 30px;
    background-color: white;
  }
`;

export const NavBar = () => {

  return (
      <MainContainer>
    <section className="sidebar">
        <Link exact to ="/"><FontAwesomeIcon icon="home" style={{color: "#ee4949"}}></FontAwesomeIcon></Link>
        &nbsp;
        <Link to="/mainpage"><FontAwesomeIcon icon="calendar-check" style={{color: "#ee4949"}}></FontAwesomeIcon></Link>
        &nbsp;
        <Link to="/mypage"><FontAwesomeIcon icon="user" style={{color: "#ee4949"}}></FontAwesomeIcon></Link>
    </section>
    </MainContainer>
  );

}
