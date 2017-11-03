import React from 'react'
import App from './App.jsx'
import About from './About.jsx'
import {connect} from 'react-redux'
import {toJS} from 'immutable'

class Root extends React.Component{
    render(){
        let currentPath = window.location.pathname

        return(
            <div>
                <div>
                    <a href='/home'>Home</a> |
                    <a href='/about'>About</a>
                </div>   

                {currentPath.includes('/about')? 
                    <About />:
                    <App editedStudent={this.props.editedStudent} dispatch={this.props.dispatch} students={this.props.students} />
                }
            </div>    
        )
    }
}



function mapStateToProps(centralState){
    return{
        students: centralState.students,
        editedStudent: centralState.editedStudent
    }
}
export default connect(mapStateToProps)(Root)