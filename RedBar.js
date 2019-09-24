import React, { Component } from "react"
class RedBar extends Component {
    render() {
        return (
          <ul>
            <li
                id={"RedBar_"+this.props.id}
                className="RedBar dropTarget">
                <img src={RedBar} aria-label={'Draggable RedBar'} />
            </li>
          </ul>
        )
    }
}



export default RedBar

