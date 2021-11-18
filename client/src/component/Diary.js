import React from 'react';
import {useState, useRef} from 'react';
import styled from 'styled-components'
import moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Diary = ({pickDate, todoData, setTodoData , setDiaryData, diaryData}) => {
        const diaryTodo = todoData.map((todolist) => {
            if(todolist.date === pickDate){
                if(todolist.content){
                    if(todolist.content.slice(-5) === '직접 작성'){
                        return todolist.checked ?`${todolist.content} 성공 했다~`
                        : todolist.content === undefined ? null 
                        : `${todolist.content} 실패 했어 ㅠㅠ`
                    }
                    else if(todolist.content.slice(-5) === '하지 않기'){
                        return todolist.checked ?`${todolist.content.slice(0,-5)} 를 안했다!`
                        : todolist.content === undefined ? null 
                        : `${todolist.content.slice(0,-5)} 를 해버렸다...`
                    }
                    else if(todolist.content.slice(-5) === '먹지 않기'){
                        return todolist.checked ?`${todolist.content.slice(0,-5)} 를 안먹었다고~~ 건강해졌다`
                        : todolist.content === undefined ? null 
                        : `${todolist.content.slice(0,-5)} 를 먹었다....배부르니 됐다`
                    }
                    else if(todolist.content.slice(-5) === '가지 않기'){
                        return todolist.checked ?`${todolist.content.slice(0,-5)} 에 가지 않았어!`
                        : todolist.content === undefined ? null 
                        : `${todolist.content.slice(0,-5)} 에 또 가버렸네...`
                    }
                    else if(todolist.content.slice(-5) === '보지 않기'){
                        return todolist.checked ?`${todolist.content.slice(0,-5)} 안봤다!!`
                        : todolist.content === undefined ? null 
                        : `${todolist.content.slice(0,-5)} 봐버렸어ㅠㅠ`
                    }
                    else if(todolist.content.slice(-5) === '듣지 않기'){
                        return todolist.checked ?`${todolist.content.slice(0,-5)} 란 소릴 듣지 않았다!!`
                        : todolist.content === undefined ? null 
                        : `${todolist.content.slice(0,-5)} 를 들었어...`
                    }
                }
            }
            
        })
        // [' 하지 않기',' 먹지 않기',' 가지 않기',' 보지 않기',' 듣지 않기']

        // const diaryTodo = todoData.map((todolist) => {
        //     return todolist.date !== pickDate ? null : todolist.checked ?
        //     `${todolist.content} 성공`: 
        //     todolist.content === undefined ? null : `${todolist.content} 실패`
        // })

        const diarySaveButton = async () => {
            // console.log(diaryData.diaryContent.join(''))

            const filterTodo = diaryTodo.filter((todo) => todo !== undefined)
            const todo = {
                date: pickDate,
                diaryContent: filterTodo
            };

            todoData.map((todolist , idx) => {
            return todolist.date === pickDate && todolist.diaryContent ? todoData.splice(idx,1) : setTodoData([todo, ...todoData])
            })
            todoData.filter((todolist) => {
                return todolist.diaryContent
            })
            setDiaryData(todo)
            if(diaryData.diaryContent){
                const q = diaryData.diaryContent.join('')
                    await axios
                    .post(`${process.env.REACT_APP_API_URL}/diarys`,{date: diaryData.date, content: q},{ accept: "application/json", withCredentials: true } )
                    .then(() => {
                    });
            }

            
        }
    
    // const todo = {
    //     date: pickDate,
    //     diaryContent: diaryContent
    // };
    // setTodoData([todo, ...todoData])
    // console.log(diaryContent)
    return (
    <div>
        <div className='diaryblock'>
            {pickDate >= moment().format('YYYYMMDD') ? <div><button className='monthBtn saveDiary' onClick ={diarySaveButton}>일기 저장 할래요?</button> <div>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div></div> : todoData.map((todolist) => {
                return todolist.date !== pickDate ? null : todolist.diaryContent ? <div>{[pickDate.slice(0,4),'년',pickDate.slice(4,6),'월',pickDate.slice(6),'일'].join('')}</div> : null
            })}

            <div className='diaryContent'>
            {diaryTodo.map((el) => {
                return <div>{el}</div>
            })}
            </div>

        </div>
    </div>
    )
}
export default Diary;