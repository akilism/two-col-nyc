import { default as React, Component } from "react";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import neon from "../../assets/neon.jpg"

export default class FullBleedIntro extends ScanComponent {

  setupTransformations(){
    let topOffset = new Transformation(0, 0.05, (pct) => {
                  return -100 * pct;
                }, { pre: 0, post: -100});

    return {
      topOffset
    };
  }

    render(){
        var topOffset = this.getValues().topOffset
        return (
            <div className="full-bleed" style={{top: `${topOffset}vh`, backgroundImage: `url(${neon})`}}>
                <h3 class="title">VICE GUIDE TO NEW YORK</h3>
            </div>
        )
    }

}
