import { default as React, Component } from "react";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import neon from "../../assets/neon.jpg"

export default class FullBleedIntro extends ScanComponent {

  setupTransformations(){
    let topOffset = new Transformation(0, 0.05, (pct) => {
                  return -140 * pct;
                }, { pre: 0, post: -140});

    return {
      topOffset
    };
  }

    render(){
        var topOffset = this.getValues().topOffset;
        return (
            <div className="full-bleed" style={{top: `${topOffset}vh`, backgroundImage: `url(${neon})`}}>
                <h3 className="title">VICE GUIDE TO NEW YORK</h3>
                <div className="toc">
                    <ul className="toc-l">
                        <li><a href="#Neighborhoods"><em>1. </em> Neighborhoods</a></li>
                        <li><a href="#Etiquette"><em>2. </em>Etiquette</a></li>
                        <li><a href="#Drink"><em>3. </em>Where to Drink/Party</a></li>
                        <li><a href="#Eat"><em>4. </em>Where to Eat</a></li>
                        <li><a href="#Transcendence"><em>5. </em>Transcendence</a></li>
                    </ul>
                    <ul className="toc-r">
                        <li><a href="#Sports"><em>6. </em>Sports</a></li>
                        <li><a href="#Daytime"><em>7. </em>What to Do During the Day</a></li>
                        <li><a href="#Music"><em>8. </em>Music</a></li>
                        <li><a href="#Shopping"><em>9. </em>Shopping</a></li>
                        <li><a href="#Around"><em>10. </em>Getting Around</a></li>
                    </ul>
                </div>
            </div>
        )
    }

}
