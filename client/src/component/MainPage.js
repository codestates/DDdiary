import React from 'react';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Dropdown from './DropDown';

function MainPageComponent() {
    // const dispatch = useDispatch();
    const [getMoment, setMoment]=useState(moment());
    const [todoMsg, setTodoMsg] = useState("");
    const [todoData, setTodoData] = useState([{}]);
    const [pickDate, setPickDate] = useState(moment().format('YYYYMMDD'));
    const [todoItem, setTodoItem] = useState('선택하세요');

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  
    // console.log(moment().format('YYYYMMDD'))
    const handle = (data) => {
        console.log(data)
        // console.log(pickDate)
        setPickDate(data)
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
          content: a
        };
        setTodoData([todo, ...todoData])
    };


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
                        <button style={{backgroundColor:'gray'}} onClick={(e) => handle(days.format('YYYYMMDD'))}>{days.format('D')}</button>
                      </td>
                  );
                }else{
                  return(
                      <td key={index}>
                        <button onClick={(e) => handle(days.format('YYYYMMDD'))}>{days.format('D')}</button>
                      </td>
                  );
                }
              })
            }
          </tr>);
        }
        return result;
    }
    

    return (
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
        <div>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div>
            <div>{todoData.map((todolist) => {
                // console.log(todolist)
                return todolist.date === pickDate ? (
                    <div>
                        <input type="checkbox" />
                        {todolist.content}
                        <button onClick={() => todoButtonDeleteClick(todolist) }>삭제</button>
                    </div>
                  ) : (<div></div>)})}
            </div>
            <div>
              <Dropdown setTodoItem = {setTodoItem} todoItem = {todoItem} handleChangeMsg = {handleChangeMsg} todoButtonClick = {todoButtonClick}/>
            </div>
        </div>
      );
}

export default MainPageComponent;