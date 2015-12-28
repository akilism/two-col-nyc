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
                        <li><em>1. </em> Neighborhoods</li>
                        <li><em>2. </em>Etiquette</li>
                        <li><em>3. </em>Where to Drink/Party</li>
                        <li><em>4. </em>Where to Eat</li>
                        <li><em>5. </em>Transcendence</li>
                    </ul>
                    <ul className="toc-r">
                        <li><em>6. </em>Sports</li>
                        <li><em>7. </em>What to Do During the Day</li>
                        <li><em>8. </em>Music</li>
                        <li><em>9. </em>Shopping</li>
                        <li><em>10. </em>Getting Around</li>
                    </ul>
                </div>
            </div>
        )
    }

}
