import React from 'react';
import {useState, useRef} from 'react';
import styled from 'styled-components'
import moment from 'moment';

const Diary = ({pickDate, todoData, todoItem, setTodoData}) => {
        const diaryContent = todoData.map((todolist) => {
            return todolist.date !== pickDate ? null : todolist.checked ?
            `${todolist.content} 성공`: 
            todolist.content === undefined ? null : `${todolist.content} 실패`
        })
    
        const diarySaveButton = () =>{
        const todo = {
            date: pickDate,
            diaryContent: diaryContent
        };
        todoData.map((todolist , idx) => {
           return todolist.date === pickDate && todolist.diaryContent ? todoData.splice(idx,1) : setTodoData([todo, ...todoData])
        })
    }
    // const todo = {
    //     date: pickDate,
    //     diaryContent: diaryContent
    // };
    // setTodoData([todo, ...todoData])
    // console.log(diaryContent)
    return (
    <div>
        <div>
            {pickDate >= moment().format('YYYYMMDD') ? <div><button onClick ={diarySaveButton}>일기 저장 할래요?</button> <div>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div></div> : todoData.map((todolist) => {
                return todolist.date !== pickDate ? null : todolist.diaryContent ? <div>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div> : null
            })}
            
        

            {todoData.map((todolist) => {
                return todolist.date !== pickDate ? null : todolist.checked ?
                <div>{`${todolist.content} 성공`}</div>: todolist.content === undefined ?
                null :<div>{`${todolist.content} 실패`}</div> 
            })}
        </div>
    </div>
    )
}
export default Diary;