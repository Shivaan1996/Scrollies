import React, { Component } from 'react';
import "../../";
import notificationIcon from "./img/notificationIcon.svg"


class Description extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        // componentDidUpdate({ id: id, minRange: minRange, maxRange: maxRange, description: description })
        // {
        //     if (super.componentDidUpdate) {
        //         super.componentDidUpdate(id, minRange, maxRange, description);
        //     }

        //     if (
        //         this.props.percentage !== prevProps.percentage &&
        //         this.anim.totalFrames
        //     ) {
        //         const frame = Math.round(
        //             (this.props.percentage / 100) * this.anim.totalFrames
        //         );

        //         console.log(this.props.percentage, frame, this.anim.totalFrames);

        //         this.anim.goToAndStop(frame, true);
        //     }
        // }
    }


render(){
    return(
        <div className="text-block">
        <div className="text-elements">
            <div aria-label="Info," tabIndex="0" className={'description' + ((this.props.percentage < 1) ? '' : ((this.props.percentage > this.props.minRange && this.props.percentage < this.props.maxRange) ? ' animate' : ''))} id={this.props.id} >
                <img alt="Info, " src={notificationIcon} />
                <p tabIndex={"0"} className='descriptionText'>{this.props.description}</p>
            </div>
        </div>
    </div>
    )
}
}

export default Description;
