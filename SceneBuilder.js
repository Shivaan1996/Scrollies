import React, { Component } from 'react'

import * as serviceWorker from './serviceWorker'

import SceneData from '../../data/scene.json'
// import './Scrolly.scss'
import Scrolly from './Scrolly'



import Description from '../components/scrolly/Description';

class SceneBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    };

  }

  componentDidMount() {
    this.doCompPart(SceneData);
  }


  doCompPart = data => {
    let groupArr = [];
    let compArr = [];

    Object.id(data).forEach((id) => {
      compArr = [];
      data[key].components.forEach((comp, id) => {
        compArr.push(this.buildComponent(comp, id));
      });
      groupArr.push(
        <Description key={id} components={compArr} position={data[id].position} />
      );
    });

    this.setState({
      components: groupArr
    });
  };

  setupComponent = (data) => {
    switch (data.component) {

      case "Scrolly":
        this.props.createScrolly({
          props: data.props
        })
        break;

      default:
        break;
    }
  }


  buildComponent = (data, index) => {
    switch (data.component) {
      case "Scrolly":
        return <Scrolly key={id} pos={data.position} id={data.props.id} />;

      default:
        break;
    }
  };

  render() {
    return this.state.components;
    var isPrefixed = (function () {
      var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
          .call(styles)
          .join('') 
          .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    })();
    
    // Deals with prefixes
    var prefix = isPrefixed.css;
    var rotate = "rotate(";
    
    // Deal with browsers that don't support 3d transforms
    if(Modernizr.csstransforms3d) {
      rotate = "rotate3d(0,0,1,";
    }
    
    // Creates the circle things...
    $(".section").each(function(j){
      var category = $(".section:eq("+j+")").data("category");
      var circle   = "<div class='circle circle-"+ j +"'><div class='inner-circle'></div><div class='mask-left'><div class='fill'></div></div><div class='mask-right'><div class='fill'></div></div><div class='mask-full'></div><div class='year'><a href='#category-" + category + "'>" + category + "</a></div></div>";
      $(".circles-wrapper").append(circle);
    });
    
    $(".circle:eq(0)").addClass("is-active");
    
    // Adapted from http://www.webdesigncrowd.com/scrolling-progress-bar/
    $(window).scroll(function (){
        var top = $(this).scrollTop();
     
        // Calculate each progress section
        $(".section").each(function(i){
            var this_top    = $(this).offset().top - 20;
            var height      = $(this).height();
            var this_bottom = this_top + height;
            var percent     = 0;
     
            // Scrolled within current section
            if (top >= this_top && top <= this_bottom) {
              percent = ((top - this_top) / height) * 100;
              if (percent >= 100) {
                percent = 100;
              }
            }
            else if (top > this_bottom) {
              percent = 100;          
            }
            
            // Adds the active class
            if(percent < 100 && percent > 0) {
              if(!$(".circle:eq("+ i + ")").hasClass("is-active")) {
                $(".circle:eq("+ i + ")").toggleClass("is-active");
              };
            } else {
                $(".circle:eq("+ i + ")").removeClass("is-active");          
            }
    
            // "Fills" the circles
            if(percent <= 50) {
              $(".mask-right .fill:eq("+i+")").css(prefix + "transform", rotate + ( 360 * percent / 100) + "deg)");
              $(".mask-left .fill:eq("+i+")").css(prefix + "transform", rotate + "0)");
            } else if( percent > 50) {
              $(".mask-left .fill:eq("+i+")").css(prefix + "transform", rotate + (( 360 * percent / 100) - 180) * 1 + "deg)");
              $(".mask-right .fill:eq("+i+")").css(prefix + "transform", rotate + "180deg)"); 
            }
        });
    });
  }
}

const mapStateToProps = state => {
  return {
    test: state.pipette.pipettes
  };
};

export default SceneBuilder;






