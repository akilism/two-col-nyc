import { default as React, Component } from "react";
import _ from "underscore";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import neon from "../../assets/neon.jpg"

export default class Outro extends ScanComponent {

  constructor(props) {
    super(props);
  }

  setupTransformations(){
    let outro = new Transformation(0.99,1, (pct) => {
        return 100 * (1-pct);
    }, {pre: 100, post: 0})

    return {outro}
  }

    render(){
        var outro = this.getValues().outro
        return (
            <div className="full-bleed" style={{top: `${outro}vh`, backgroundColor: "red", zIndex: 10000}}>
            </div>
        )
    }

}
