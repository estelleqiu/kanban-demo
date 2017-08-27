import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';


class KanbanBoard extends Component {
    render(){
        return (
            <div className = "app">
                <List id="todo" cardCallbacks = {this.props.cardCallbacks} taskCallbacks = {this.props.taskCallbacks} cards = {this.props.cards.filter((card) =>
                    card.status === "todo"
                )} title="TO DO"></List>
                <List id="in-progress" cardCallbacks = {this.props.cardCallbacks} taskCallbacks = {this.props.taskCallbacks} cards = {this.props.cards.filter((card) =>
                    card.status === "in-progress"
                )} title="In Progress"></List>
                <List id="done" cardCallbacks = {this.props.cardCallbacks} taskCallbacks = {this.props.taskCallbacks} cards = {this.props.cards.filter((card) =>
                    card.status === "done"
                )} title="Done"></List>
            </div>
        )
    }
}

KanbanBoard.propTypes= {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object
}
export default DragDropContext(HTML5Backend) (KanbanBoard);