import { default as React, Component } from "react";
import _ from "underscore";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import neon from "../../assets/neon.jpg"

export default class FullBleedIntro extends ScanComponent {

  constructor(props) {
    super(props);
    this.size = 0.05;
  }

  componentDidMount(){
    window.Intro = this;
  }

  scrollTo(name){
    return function(e){
        e.preventDefault();
        Root.scrollToName(name)
    }
  }

    render(){
        var topOffset = -100 * this.props.coordinations.intro;

        return (
            <div className="full-bleed" style={{top: `${topOffset}vh`, backgroundImage: `url(${neon})`}}>
                <h3 className="title">VICE GUIDE TO NEW YORK</h3>
            </div>
        )
    }

}
