import { default as React, Component, } from "react";

import _ from "lodash";

import ArticleHeader from "./ArticleHeader";
import ImageGallery from "./ImageGallery";
import GoogleGoogler from "./LocationMap";
import LocationMap from "./LocationMap";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

var RECS = {
    wk: {
        title: "Andrew WK Loves Midtown Steak and Relaxes in Train Stations",
        body: "My favorite places to eat? Michael Jordan's Steak House in the main terminal concourse [at Grand Central Station]. Whether you're at a bar or restaurant, you're sitting with a view of the entire main floor of Grand Central Station and in front of the incredible, starry sky constellation ceiling that used to be just complete blackness from soot and smoke and filth. They left a patch of the ceiling as it used to be before it was restored. Just a black square in the midst of this beautiful turquoise blue sky with the amazing constellations illustrated and lit up. It's just remarkable.<br/><br/>There's Del Frisco's Steak House by the Time-Life building that has really sweeping two story ceilings in what is already a very huge lobby. That's a really fun place to go. I really like going to these places by myself. That's what I did a lot. Just walk around and go and even if it was just to sit in the bar. Just to be in these places, it was very special."
    }
}

export default class MediaTray extends ScanComponent {
  buildImages(activeIdx) {
    const classes = (this.props.activeType === "image") ? "media-images media-active media-wrapper" : "media-images media-wrapper no-pointer";

    return (
      <div className={classes} ref="images">
          <ImageGallery images={this.props.images} imageData={this.props.imageData} toggleFullImage={this.props.toggleFullImage} activeIdx={activeIdx} />
      </div>
    );
  }

  setupTransformations(){
    let topOffset = new Transformation(0, 0.05, (pct) => {
                  return 3 + (123 - (pct * 123));
                }, { pre: 123, post: 0});

    return {
      topOffset
    };
  }

  buildMap() {
    const center = (this.props.activeType === "map") ? _.find(this.props.locations, { key: this.props.activeKey }) : this.props.locations[0],
          classes = (this.props.activeType === "map") ? "media-map media-active media-wrapper" : "media-map media-wrapper no-pointer";

    return (
      <div className={classes} ref="mediaMap">
        <LocationMap center={center} locations={this.props.locations} />
      </div>
    );
  }

  buildRec(){
    var title = RECS[this.props.activeKey].title,
        body = RECS[this.props.activeKey].body;

    return (
        <div className="rec-media-inner">
            <h3 className="rec-media-title">{title}</h3>
            <p className="rec-media-body" dangerouslySetInnerHTML={{__html: body}}></p>
        </div>
    )
  }

  render() {
    const { pctScroll } = this.props.measurements,
          isMap = (this.props.activeType === "map"),
          activeIdx = (this.props.activeType === "image") ? parseInt(this.props.activeKey, 10) : 0,
          headerClasses = (pctScroll > 0.1 || isMap) ? "media-header article-header full-opacity" : "media-header article-header zero-opacity",
          images = (this.props.images) ? this.buildImages(activeIdx) : "&nbsp;",
          mapElem = (this.props.locations) ? this.buildMap() : "&nbsp;",
          recElem = this.props.activeType === "rec" ? this.buildRec() : null;

    var bottom_target = 1 - (this.props.measurements.viewportHeight/this.props.measurements.contentHeight)

    
    if(this.props.measurements.pctScrollRaw >= 1){
        var topOffset = (this.props.measurements.pctScrollRaw - 1) / 0.0243 * -100;
    } else {
        var topOffset = (1 - this.props.coordinations.intro) * 100;
    }

    return (
      <div ref="media" className="media" style={{width: this.props.open ? "99vw" : "45vw", top: `${topOffset}vh`}}>
        <ArticleHeader headerClasses={headerClasses} media map={isMap} toggleMedia={this.props.toggleMedia} title="The VICE Guide to New York City" byline="By VICE Travel Staff" />
        {images}
        {mapElem}
        {recElem}
      </div>
    );
  }
}
