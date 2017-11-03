import React from 'react'
import ReactDOM from 'react-dom'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './App.jsx'
import thunk from 'redux-thunk'
import Root from './Root.jsx'
import Immutable from 'immutable'
import { List, Map } from 'immutable';

const init = List([Map({id: 1, name: 'Thanh'})]);


function students(state = init, action){
    
    switch(action.type){
        case 'LOAD_STUDENT_SUCCESS':
            return state
        case 'DELETE_STUDENT_SUCCESS':
            var newState = state.filter(s=>s.get('id')!==action.payload)
            return newState
        case 'ADD_STUDENT':
            return state.push(Map(action.payload))
        case 'UPDATE_STUDENT':
            //var newState = state.map(s=>s.id!==action.payload.id? s: action.payload)
            return state.map(s => {
                if(s.get('id') === action.payload.id) {
                  return s.set('name', action.payload.name);
                } else {
                  return s
                }
              }); 
            
            //return state.push(Map(action.payload))
        default:
        return state
    }
}

const initEditedStudent = Map({})
function editedStudent(state = initEditedStudent, action){
    switch(action.type){
        case 'ADDNEW_STUDENT':

            let newState = state.set('id',  '').set('name', '').set('isEditing', false)
            return newState
        case 'EDIT_STUDENT':    
             var newState = state.set('id',  action.payload.id).set('name', action.payload.name).set('isEditing', true)
            return newState
        default:
        return state
    }
}

export function editStudent(id) {
  return (dispatch, getState) => {
    const students = getState().students;
    let student = students.map(s => {
        if(s.get('id') === id) {
          return s
        } 
    })

   dispatch({ type: 'EDIT_STUDENT', payload: student.get(0).toJS() });
  }
}


const initialState = Immutable.Map();

const centralState = combineReducers({
    students, editedStudent
})

ReactDOM.render(
    <Provider store={createStore(centralState, applyMiddleware(thunk))}>
        <Root />
    </Provider>
    , document.getElementById('app'))
