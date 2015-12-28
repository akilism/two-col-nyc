import { default as React, Component } from "react";

import grigoropoulos from "../../assets/nyc0.jpg";

export default class InfoBox extends Component {
  handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log(evt.target.href);
  }

  closeMe(evt) {
    this.props.hideInfo();
  }

  render() {
    const display = (this.props.active) ? "inline-block" : "none";
    const pos = { left: this.props.rawPos.x + 5, top: this.props.rawPos.y - 5};

    return (
      <div className="nfo-box" style={{ display, ...pos }}>
        <span className="nfo-close" onClick={this.closeMe.bind(this)}>X</span>
        <div className="nfo-box-head">
          <div className="nfo-box-head-image" style={{backgroundImage: `url(${grigoropoulos})`}}>&nbsp;</div>
          <div className="nfo-box-head-details">
            <span className="nfo-box-title">Alexandros Grigoropoulos</span>
            <span className="nfo-box-subtitle">(Greek: Αλέξανδρος Γρηγορόπουλος)</span>
            <div className="nfo-box-content">
              A 15-year-old Greek student, was killed by two policemen in Exarcheia
              district of central Athens. His murder by police resulted in large protests
              and demonstrations. On 11 October 2010, the Mixed Jury Court of
              Amfissa (consisting of 3 judges and 4 jurors) found the two policemen
              guilty.
            </div>
          </div>
        </div>
        <div className="nfo-box-related-articles">
          <ul>
            <li><a className="nfo-box-related-link" onClick={this.handleClick.bind(this)} href="http://www.vice.com/read/athens-thessaloniki-greece-protests-6-12-2014-nikos-romanos-alexandros-grigoropoulos-876">Greece Exploded in Riots This Weekend <span>December 8, 2014</span></a></li>
            <li><a className="nfo-box-related-link" onClick={this.handleClick.bind(this)} href="https://news.vice.com/article/greek-police-tear-gassed-protesters-last-friday">Greek Police Tear-Gassed Protesters Last Friday <span>December 17, 2013</span></a></li>
            <li><a className="nfo-box-related-link" onClick={this.handleClick.bind(this)} href="http://www.vice.com/read/athens-thessaloniki-greece-protests-6-12-2014-nikos-romanos-alexandros-grigoropoulos-876">Greek Anarchists Set Athens on Fire in Solidarity with a Hunger Striker <span>December 4, 2014</span></a></li>
          </ul>
        </div>
      </div>

    );
  }
}
