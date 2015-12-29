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

  setupTransformations(){
    var size = 0.05
    let topOffset = new Transformation(0, size, (pct) => {
                  return -140 * pct;
                }, { pre: 0, post: -140});

    this.size = 0.05;

    return {
      topOffset
    };
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
        var topOffset = this.getValues().topOffset;

        return (
            <div className="full-bleed" style={{top: `${topOffset}vh`, backgroundImage: `url(${neon})`}}>
                <h3 className="title">VICE GUIDE TO NEW YORK</h3>
                <div className="toc">
                    <ul className="toc-l">
                        <li><a onClick={this.scrollTo("Neighborhoods")} href=""><em>1. </em> Neighborhoods</a></li>
                        <li><a onClick={this.scrollTo("Etiquette")} href="#Etiquette"><em>2. </em>Etiquette</a></li>
                        <li><a onClick={this.scrollTo("Drink")} href="#Drink"><em>3. </em>Where to Drink/Party</a></li>
                        <li><a onClick={this.scrollTo("Eat")} href="#Eat"><em>4. </em>Where to Eat</a></li>
                        <li><a onClick={this.scrollTo("Transcendence")} href="#Transcendence"><em>5. </em>Transcendence</a></li>
                    </ul>
                    <ul className="toc-r">
                        <li><a onClick={this.scrollTo("Sports")} href="#Sports"><em>6. </em>Sports</a></li>
                        <li><a onClick={this.scrollTo("Daytime")} href="#Daytime"><em>7. </em>What to Do During the Day</a></li>
                        <li><a onClick={this.scrollTo("Music")} href="#Music"><em>8. </em>Music</a></li>
                        <li><a onClick={this.scrollTo("Shopping")} href="#Shopping"><em>9. </em>Shopping</a></li>
                        <li><a onClick={this.scrollTo("Around")} href="#Around"><em>10. </em>Getting Around</a></li>
                    </ul>
                </div>
            </div>
        )
    }

}
