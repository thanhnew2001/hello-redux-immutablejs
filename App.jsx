import React from 'react'

import StudentList from './StudentList.jsx'
import StudentForm from './StudentForm.jsx'
import {editStudent} from './main.js'


export default class App extends React.Component{

    componentDidMount(){
        this.props.dispatch({type: 'LOAD_STUDENT_SUCCESS'})
    }

    handleDelete(id){
        if(confirm('Do you want to delete '+id)){
            this.props.dispatch({type: 'DELETE_STUDENT_SUCCESS', payload: id})
        }
    }

    handleEdit(id){
        this.props.dispatch(editStudent(id))
    }

    render(){
        return(
            <div>
                <StudentForm editedStudent={this.props.editedStudent}
                    addStudent={(s)=>this.props.dispatch({type: 'ADD_STUDENT', payload: s})}
                    updateStudent={(s)=>this.props.dispatch({type: 'UPDATE_STUDENT', payload: s})}
                    addNewStudent={(s)=>this.props.dispatch({type: 'ADDNEW_STUDENT'})}
                    />
                    <StudentList students={this.props.students} 
                    deleteStudent={(id)=>this.handleDelete(id)}
                    editStudent={(id)=>this.handleEdit(id)}               
                />
            </div>
        )
    }
}


