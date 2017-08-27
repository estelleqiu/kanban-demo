import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import Tasks from './Task.js';
import marked from 'marked';
import {DragSource, DropTarget} from 'react-dnd';
import constants from './constants';

let titlePropType= (props, propName, componentName) => {
    if(props[propName]) {
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 20 ) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 chars`
            )
        }
    }
}

const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
}

const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId,props.id);
    }
}
let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
}

let collectDrop = (connect, monitor)=> {
    return {
        connectDropTarget:connect.dropTarget()
    }
}
class Card extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cardDisplay: false
        }
    }
    ToggleClass(){
        this.setState({cardDisplay: !this.state.cardDisplay});
    };
    render(){
        const {connectDragSource , connectDropTarget } = this.props;
        let cardDetail;
        if (this.state.cardDisplay){
            cardDetail = (
                <div className = "card-detail">
                    <div className="card-description" dangerouslySetInnerHTML = {{__html: marked(this.props.description)}}></div>
                    <Tasks taskCallbacks = {this.props.taskCallbacks} 
                           cardId={this.props.id} 
                           tasks = {this.props.taskList}></Tasks>
                </div>)
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0 ,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        }
        return connectDropTarget(connectDragSource(
            <div className = "card">
                <div style={sideColor}></div>
                <div className ={this.state.cardDisplay ? "card-title card-title--is-open" : "card-title"} onClick={this.ToggleClass.bind(this)}>{this.props.title}</div>
                <CSSTransitionGroup transitionName ="toggle" transitionEnterTimeout={250}>
                {cardDetail}
                </CSSTransitionGroup>
            </div>
        ))
    }
}

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    taskList: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;