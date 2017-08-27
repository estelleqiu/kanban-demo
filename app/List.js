import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js'
import {DropTarget} from 'react-dnd';
import constants from './constants'

const listTargetSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id)
    }
}

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget()
    }
}
class List extends Component {
    render(){
        const {connectDropTarget} = this.props;
        var cards = this.props.cards.map((card)=> {
            return <Card key={card.id}
                         id={card.id}
                         title={card.title}
                         description={card.description}
                         color={card.color}
                         taskCallbacks = {this.props.taskCallbacks}
                         cardCallbacks = {this.props.cardCallbacks}
                         taskList={card.tasks}></Card>
        })
        return connectDropTarget(
            <div className = "list">
                <div className="list-title">{this.props.title}</div>
                {cards}
            </div>
        )
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);