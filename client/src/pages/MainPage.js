//캘린더. 투두리스트. 일기 구현
import React from 'react';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import MainPageComponent from '../component/MainPage';
import styled from "styled-components"




function MainPage() {
    // const dispatch = useDispatch();
    const [getMoment, setMoment]=useState(moment());

    return (
        <div>
            <div>
            <img className='logo-title' alt='logo' src='/로고onlyIMAGE.png' />
                <MainPageComponent/>
            </div>
        </div>
      );
}

export default MainPage;