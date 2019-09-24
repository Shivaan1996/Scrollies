import React, { Component } from "react";
import Lottie from "react-lottie";
import throttle from "lodash/throttle";
import Logo from "../scrolly/img/Logo.svg";
import animationData from "../../data/animation.json";
import sceneData from "../../data/scene.json";
import { isAbsolute } from "path";
import Description from "../scrolly/Description";
import RedBar from "../scrolly/img/RedBar.svg";

const buttonStyle = {
  display: "block",
  margin: "10px auto"
};

const defaultOptions = {
  loop: false,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const progressContainerStyle = {
  background: "#f8bbd0",
  height: "5px",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  zIndex: 100
};

class LottieWithAnimationControl extends Lottie {

  dragEvent = (e) => {
    const frame = Math.round(
      this.anim.totalFrames * (this.props.percentage / 100)
    );
    this.anim.goToAndStop(frame, true);
  }

  componentDidUpdate(prevProps: Props, prevState: any, prevContext: any) {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, prevContext);
    }

    if (
        this.props.percentage !== prevProps.percentage &&
        this.anim.totalFrames
      ) {
        const frame = Math.round(
          this.anim.totalFrames * (this.props.percentage / 100)
        );
        this.anim.goToAndStop(frame, true);
      }

    // if(this.props.percentage <= 27.31013507469362 || this.props.percentage >= 31.783151740632476){
    //   if (
    //     this.props.percentage !== prevProps.percentage &&
    //     this.anim.totalFrames
    //   ) {
    //     const frame = Math.round(
    //       this.anim.totalFrames * (this.props.percentage / 100)
    //     );
    //     this.anim.goToAndStop(frame, true);
    //   }
    //
    //   if (this.props.percentage == 100) {
    //     const newframe = Math.round(this.anim.totalFrames - this.anim.frame);
    //     this.anim.goToAndPlay(newframe, 0, true);
    //   }
    // } else if(this.props.dragOffset > 0){
    //
    //   let offsetPercentage = 28 + ((this.props.dragOffset / 439) * 3.5293787531)
    //
    //   const frame = Math.round(
    //     this.anim.totalFrames * (offsetPercentage / 100)
    //     );
    //     this.anim.goToAndStop(frame, true);
    // } else if (this.props.percentage <= 31.783151740632476 && this.props.dragOffset >= 439 ){
    //
    //   let offsetPercentage = (this.props.dragOffset / 439)
    //  const frame = Math.round(
    //   this.anim.totalFrames * (offsetPercentage / 100)
    //   );
    //   this.anim.goToAndStop(frame, true);
    //
    // }
  }
}

class Scrolly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: true,
      isPaused: true,
      percentage: 0,
      scrolled: 0,
      dragOffset: 0,
      data: [
        {
          id: null,
          description: "",
          minRange: null,
          maxRange: null
        }
      ],
      objCurrent: null,
      objPrevious: null
    }
  }

  // start = (objEvent, target) => {
  //
  //   objEvent = objEvent || window.event;
  //
  //   let current = target;
  //
  //   current.lastX = objEvent.clientX;
  //   current.lastY = objEvent.clientY;
  //   current.isAnimated = false;
  //   current.style.zIndex = '3';
  //   current.setAttribute('aria-grabbed', 'true');
  //
  //   this.setState({
  //     objCurrent: target
  //   });
  //
  //   return false;
  // }
  //
  // end = () => {
  //   // Set the current active element to null
  //   if (this.state.objCurrent != null) {
  //
  //     let current = this.state.objCurrent;
  //     let previous = this.state.objPrevious;
  //
  //     current.style.zIndex = '2';
  //     current.setAttribute('aria-grabbed', 'false');
  //
  //     this.setState({
  //       objCurrent: current
  //     });
  //
  //     if (this.state.objPrevious != null && this.state.objPrevious != this.state.objCurrent) {
  //       previous.style.zIndex = '1';
  //       this.setState({
  //         objPrevious: previous
  //       });
  //     }
  //     this.setState({
  //       objPrevious: this.state.objCurrent
  //     });
  //   }
  //   this.setState({
  //     objCurrent: null
  //   });
  //
  //   return false;
  // }
  //
  // getTransform = (elem) => {
  //   var matrix = getComputedStyle(elem, null).transform;
  //
  //   var regex = /-?\d*\.{0,1}\d+/g;
  //   var values = matrix.match(regex);
  //
  //   var translateX = '';
  //   var translateY = '';
  //
  //   if (values != null) {
  //     translateX = values[4];
  //     translateY = values[5];
  //   }
  //
  //   return {
  //     'translateX': translateX,
  //     'translateY': translateY
  //   };
  // };

  // drag = throttle((objEvent) => {
  //   objEvent = objEvent || window.event;
  //
  //   let current = this.state.objCurrent;
  //
  //   if (this.state.objCurrent !== null) {
  //
  //     var transform = this.getTransform(this.state.objCurrent);
  //     var iXPos = parseFloat(transform.translateX);
  //     var LeftOffset = iXPos + objEvent.clientX - this.state.objCurrent.lastX;
  //
  //     if(LeftOffset >= 0 && LeftOffset <= 390){
  //
  //       current.style.transform = 'translate3d(' + (LeftOffset) + 'px, 0px, 0px) ';
  //       current.lastX = objEvent.clientX;
  //
  //       this.setState({
  //         objCurrent: current,
  //         dragOffset: LeftOffset
  //       });
  //     }
  //   }
  //   return false;
  // }, 10);

  updatePercentage = () => {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
    let scroll = {
      x: supportPageOffset
        ? window.pageXOffset
        : isCSS1Compat
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft,
      y: supportPageOffset
        ? window.pageYOffset
        : isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop
    };

    let percentageCalc =
      (scroll.y /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;

    this.setState({
      percentage: percentageCalc < 0 ? 0 : percentageCalc
    });
  };


  componentDidMount() {
    window.addEventListener(
      "scroll",
      throttle(() => {
        // lodash throttle method.
        this.updatePercentage();

        // We bind a scroll event to the window to watch scroll position.
        //this.scroll();
      }, 10)
    ); //ms

  }

  componentDidUpdate() {
    console.log(this.state.percentage);

    if (this.props.percentage >0 && this.props.percentage <= 31.783151740632476 && this.props.dragOffset > 0 ){

      let offsetPercentage = (this.props.dragOffset / 439)
      const frame = Math.round(this.anim.totalFrames * (offsetPercentage / 100));
      this.anim.goToAndStop(frame, true);

    }
  }

  doCompPart = data => {
    let groupArr = [];

    sceneData.Scrolly.components.forEach((component, index) => {
      groupArr.push(
        <Description
          key={index}
          id={component.props.id}
          minRange={component.props.minRange}
          maxRange={component.props.maxRange}
          percentage={this.state.percentage}
          description={component.props.description}
        />
      );
    });

    return groupArr;
  }

  // onDragStart = e => {
  //
  //   let dragImage = document.getElementById('dragImage')
  //
  //   if(dragImage == null){
  //
  //     dragImage = document.createElement('img')
  //     dragImage.id = "dragImage"
  //     dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  //     document.body.appendChild(dragImage);
  //   }
  //
  //   e.dataTransfer.setDragImage(dragImage, 0, 0)
  //   e.dataTransfer.setData('text/html', null);
  //
  //   if (e.target.id == "splashScreen_3") {
  //     this.start(e, e.target);
  //   }
  //
  // };
  //
  // onDragOver = e => {
  //   e.preventDefault();
  //   this.drag(e);
  // };
  //
  // onDrop = e => {
  //   e.preventDefault();
  //   this.end(e.target);
  // }


  render() {

    return (
        <div id="scroll">
          <div className="progress-container" style={progressContainerStyle}>
            <div className="progress" style={{
              height: "5px",
              background: "#e91e63",
              width: (this.state.percentage / 100 ) * window.innerWidth
            }} />
          </div>
          <div className="animation full-height">
            <div
              style={{width: '100%', height: '100%', position: "absolute"}}
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}>
              <div
                className={
                  "splash" +
                  (this.state.percentage >= 0 && this.state.percentage < 0.5
                    ? " animate"
                    : "")
                }
                id="splashScreen_1"
              >
                <img alt="LabXchange logo" src={Logo} className="logo" />
                <h1>
                {/* <p>The Micropipette</p> */}
                  <p tabIndex = "0" 
                  aria-label="scroll down or use the down arrow to proceed"
                  >Scroll Down</p>
                  <div className="arrow-down" />
                </h1>
              </div>
              <div
                className={
                  "splash" +
                  (this.state.percentage >= 100 && this.state.percentage < 101
                    ? " animate"
                    : "")
                }
                id="splashScreen_5"
              >
                <img src={Logo} alt="LabXchange logo" className="logo" />
              </div>
            </div>
            <div>{this.doCompPart(sceneData)}</div>
            <div
              className={"animationWrapper" + ((this.state.percentage < 99)?'':' hidden')}>
              <LottieWithAnimationControl
                dragOffset={this.state.dragOffset}
                style={{pointerEvents: "none"}}
                percentage={this.state.percentage}
                options={defaultOptions}
                isPaused={this.state.isPaused}
                isClickToPauseDisabled={true}
              />
            </div>
          </div>
        </div>
    );
  }
}
export default Scrolly;
