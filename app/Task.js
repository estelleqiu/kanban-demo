import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
    checkInputKeyPress(evt){
        if(evt.key === 'Enter'){
            this.props.taskCallbacks.add(this.props.cardId,evt.target.value);
            evt.target.value = '';
        }
    }
    render(){
        var tasks = this.props.tasks.map((task,taskIndex) => {
            return <li key = {task.id}
                       id= {task.id}>
                <input type="checkbox" defaultChecked ={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null,this.props.cardId,task.id, taskIndex)
                }/>
                <span className= "task-name">{task.name}</span>{' '}
                <a href="#" className="remove-task" onClick={ this.props.taskCallbacks.delete.bind(null,this.props.cardId,task.id, taskIndex)} ></a>
            </li>
        })
        return (
            <div className="tasks">
                <ul className = "task-list">{tasks}</ul>
                <input type="text" className="add-task" placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress.bind(this)}/>
            </div>
        )
    }
}

Task.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}
export default Task;