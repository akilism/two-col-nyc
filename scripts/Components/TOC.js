import { default as React, Component } from "react";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import _ from "underscore";
import icon from "../../assets/hamburger.png"

export default class TOC extends ScanComponent {

  constructor(props){
    super(props)
    this.state = {
        open: false
    }
  }

  setupTransformations(){
    let topOffset = new Transformation(0, 0.05, (pct) => {
                  return 140 - (pct * 140);
                }, { pre: 140, post: 130});

    let fixed = new Transformation(0,0.05, (pct) => {
        return true;
    }, {pre: true, post: false});

    return {
      topOffset,
      fixed
    };
  }

  scrollTo(name){
    return (e) => {
        e.preventDefault();
        this.setState({open: false});
        Root.scrollToName(name);
    }
  }


  render() {
    const {topOffset, fixed} = this.getValues();

    var open = (() => {this.setState({open: ! this.state.open})})

    return (
        <div id="toc-bar" style={{display: this.props.display ? "block" : "none"}} >
            <img src={icon} onClick={_.bind(open,this)} />
            <div id="toc-menu" style={{display: this.state.open ? "block" : "none"}}>
                    <ul className="toc-small">
                        <li><a onClick={this.scrollTo("Neighborhoods")} href=""><em>1. </em> Neighborhoods</a></li>
                        <li><a onClick={this.scrollTo("Etiquette")} href="#Etiquette"><em>2. </em>Etiquette</a></li>
                        <li><a onClick={this.scrollTo("Drink")} href="#Drink"><em>3. </em>Where to Drink/Party</a></li>
                        <li><a onClick={this.scrollTo("Eat")} href="#Eat"><em>4. </em>Where to Eat</a></li>
                        <li><a onClick={this.scrollTo("Transcendence")} href="#Transcendence"><em>5. </em>Transcendence</a></li>
                        <li><a onClick={this.scrollTo("Sports")} href="#Sports"><em>6. </em>Sports</a></li>
                        <li><a onClick={this.scrollTo("Daytime")} href="#Daytime"><em>7. </em>What to Do During the Day</a></li>
                        <li><a onClick={this.scrollTo("Music")} href="#Music"><em>8. </em>Music</a></li>
                        <li><a onClick={this.scrollTo("Shopping")} href="#Shopping"><em>9. </em>Shopping</a></li>
                        <li><a onClick={this.scrollTo("Around")} href="#Around"><em>10. </em>Getting Around</a></li>
                    </ul>
            </div>
        </div>
    );
  }
}

