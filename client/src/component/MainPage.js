import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Dropdown from './DropDown';
import Diary from './Diary';
import styled from 'styled-components'
import './MainPage.css';
import axios from 'axios';

function MainPageComponent() {
    // const dispatch = useDispatch();
    const [getMoment, setMoment]=useState(moment());
    const [todoMsg, setTodoMsg] = useState("");
    const [todoData, setTodoData] = useState([]);
    const LoginState = useSelector(state => state.LoginReducer);
    //todolist만 저장되는 스테이트
    const [todolistData, setTodolistData] = useState([]);
    //diary만 저장되는 스테이트
    const [diaryData, setDiaryData] = useState([]);

    const [pickDate, setPickDate] = useState(moment().format('YYYYMMDD'));
    const [todoItem, setTodoItem] = useState('직접 작성');
    const [ttoday, setToday] = useState(moment().format('YYYYMMDD'));
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const [diaryCreat, setDiaryCreat] = useState(false);

    // post.get 
    // get 요청할때 투두리스트랑 다이어리를 전체 날자 상관없이 다 받아야됨 
    // post 일기장 저장 버튼 클릭시 보낼 데이터 : date, diaryContent (date에 해당 날자만 있는 데이트를 보내줘)(투두리스트 따로 다이어리 따로데이터 보내기) 
    // post date res 'ok'
    // console.log(moment().format('YYYYMMDD'))

    // console.log(LoginState)

    const handle = async (data) => {
 
      // await axios
      // .get(`${process.env.REACT_APP_API_URL}/users`,{ accept: "application/json", withCredentials: true } )
      // .then((respone) => {
      //   console.log(respone)
      // });

        setPickDate(data)
        // console.log(diaryCreat)

        todoData.map((todolist) => {
          if(todolist.date === pickDate){
            if(todolist.diaryContent){
              return setDiaryCreat(true)
            }
            else{
              return setDiaryCreat(false)
            }
          }
        })
    }
    
    const postTodolistButton = async (data) => {

      const postList = todoData.filter((todolist) => {
          if(todolist.date === pickDate){
            return todolist.content
            }
      })
      setTodolistData(postList)
      
      
      console.log(diaryData)
      console.log(todolistData)
      await axios
            .post(`${process.env.REACT_APP_API_URL}/nottodolist`,{todolist: todolistData, date:pickDate},{ accept: "application/json", withCredentials: true } )
            .then((respone) => {
                console.log(respone)
            });
    }


    const todoButtonDeleteClick = (todolist) => {
        // {todoData.map((todolist) => {
        //     todolist.date === pickDate ? {

        //     }
        // })}
        // console.log(idx)
        // todolist
        // console.log(todolist)
        const restTodo = todoData.filter((todo) => todo.content !== todolist.content);
        // console.log(restTodo)
        setTodoData(restTodo)
    };

    const handleChangeMsg = (event) => {
        setTodoMsg(event.target.value)
    };

    const todoButtonClick = (event) => {
      const a = todoMsg + todoItem
        const todo = {
          date: pickDate,
          content: a,
          checked: false
        };

        setTodoData([todo, ...todoData])
    };
    const checkBoxButton = (checked,event) => {
      
      todoData.map((el) => {
        if(el === checked){
          if(el.checked === false){
            el.checked = true
            event.target.textContent = 'V'
            event.target.className = 'todo-close'
          }
          else{
            el.checked = false
            event.target.textContent = 'X'
            event.target.className = 'todo-button'
          }
        }
      })


    }
    const diaryCreatButton = () => {
      setDiaryCreat(!diaryCreat)
    }

    const calendarArr=()=>{
        
        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) {
          result = result.concat(
            <tr key={week}>
            {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                // console.log(days.format('YYYYMMDD'))

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return(
                      <td key={index} >
                        <button style={{backgroundColor:'red'}} onClick={(e) => handle(days.format('YYYYMMDD'))}>{days.format('D')}</button>
                      </td>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  return(
                      <td key={index}  >
                        <button style={{backgroundColor:'gray'}} >{days.format('D')}</button>
                      </td>
                  );
                }else{
                  if(days.format('YYYYMMDD') < moment().format('YYYYMMDD')){
                    return(
                      <td key={index}  >
                        <button style={{backgroundColor:'yellow'}} onClick={(e) => handle(days.format('YYYYMMDD'))}>{days.format('D')}</button>
                      </td>
                    );
                  }
                  else{
                    return(
                      <td key={index}>
                        <button onClick={(e) => handle(days.format('YYYYMMDD'))}>{days.format('D')}</button>
                      </td>
                    );
                  }
                }
              })
            }
          </tr>);
        }
        return result;
    }
    console.log(todoData)
    // axios
    // .post("<https://localhost:4000/signup>", userinfo)
    // .then(history.push("/"));




    return (
      pickDate < ttoday ? (
        <div>
            <div>
                <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }} >이전달</button>
                    <span>{today.format('YYYY 년 MM 월')}</span>
                <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} >다음달</button>
            </div>
        <table>
            <tbody>
                {calendarArr()}
            </tbody>
        </table>
        <div className='todo-selectday'>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div>
            <div>{todoData.map((todolist) => {
                return todolist.date === pickDate && todolist.content ? (
                    <div>
                        <button>{todolist.checked ? 'V' : 'X'}</button>
                        <span className='todo-Content'>{todolist.content}</span>
                    </div>
                  ) : (<div></div>)})}
            </div>

            <div>
            <Diary diaryData={diaryData} pickDate={pickDate} todoData={todoData} todoItem={todoItem} setTodoData={setTodoData}></Diary>
                {/* {todoData.map((todolist) => {
                  return todolist.date === pickDate && todolist.diaryContent ? <Diary pickDate={pickDate} todoData={todoData} todoItem={todoItem} setTodoData={setTodoData}></Diary> : null})} */}
            </div>
        </div>
      ) : (
        <div>
            <div>
                <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }} >이전달</button>
                    <span>{today.format('YYYY 년 MM 월')}</span>
                <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} >다음달</button>
            </div>
        <table>
            <tbody className = 'calendar'>
                {calendarArr()}
            </tbody>
        </table>
        <div className='todo-selectday'>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div>
        <button onClick={diaryCreatButton}>일기 생성</button>
        <button onClick={postTodolistButton}>리스트 저장</button>
            <div>{todoData.map((todolist) => {
                // console.log(todolist)
                return todolist.date === pickDate && !todolist.diaryContent ? (
                    <div>
                        <button className={`todo-${todolist.checked ? 'button' : 'close'}`} onClick={(e) =>checkBoxButton(todolist,e)}>{todolist.checked ? 'V' : 'X'}</button>
                        <span className='todo-Content'>{todolist.content}</span>
                        <button onClick={() => todoButtonDeleteClick(todolist) }>삭제</button>
                    </div>
                  ) : (<div></div>)})}
            </div>
            <div>
              <Dropdown setTodoItem = {setTodoItem} todoItem = {todoItem} handleChangeMsg = {handleChangeMsg} todoButtonClick = {todoButtonClick}/>
            </div>
            <div>
              {diaryCreat? <Diary diaryData={diaryData} pickDate={pickDate} todoData={todoData} setDiaryData={setDiaryData} setTodoData={setTodoData}></Diary>
              :<div></div>}
            </div>
        </div>
        
    ));
}

export default MainPageComponent;