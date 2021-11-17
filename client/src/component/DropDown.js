import React from 'react';
import {useState, useRef} from 'react';
import styled from 'styled-components'
import './DropDown.css';

// const Container = styled.div`
//     position: relative;
// `;

const Dropdown = ({setTodoItem, todoItem, handleChangeMsg, todoButtonClick}) => {
    const list = [' 하지 않기',' 먹지 않기',' 가지 않기',' 보지 않기',' 듣지 않기']


    const [isActive, setIsActive] = useState(false);

    const dropDownClick = () => {
        setIsActive(!isActive)
    };
    const todoItemClick = (event) => {
        let a = event.target.textContent
        setTodoItem(a)
        setIsActive(!isActive)
    };

    return (
      <div>
        <input type = 'text' onChange={handleChangeMsg}></input>
        <button onClick={(a) => {dropDownClick(a)}} className="menu-open">
          <span>{todoItem}</span>
        </button>
        <button onClick={todoButtonClick}>생성</button>
        <div className={`menu ${isActive ? 'active' : 'close'}`}>
          <ul>
            {list.map((el) => {
                return <li className='dropDown-Content' onClick={todoItemClick}>{el}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }

  export default Dropdown;