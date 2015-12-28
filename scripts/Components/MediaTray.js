import { default as React, Component, } from "react";

import _ from "lodash";

import ArticleHeader from "./ArticleHeader";
import ImageGallery from "./ImageGallery";
import LocationMap from "./LocationMap";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

export default class MediaTray extends ScanComponent {
  buildImages(activeIdx) {
    const classes = (this.props.activeType === "image") ? "media-images media-active media-wrapper" : "media-images media-wrapper no-pointer";

    return (
      <div className={classes} ref="images">
          <ImageGallery images={this.props.images} imageData={this.props.imageData}  activeIdx={activeIdx} />
      </div>
    );
  }

  setupTransformations(){
    let topOffset = new Transformation(0, 0.05, (pct) => {
                  return 3 + (100 - (pct * 100));
                }, { pre: 103, post: 0});

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
      </div>);
  }

  render() {
    const { pctScroll } = this.props.measurements,
          isMap = (this.props.activeType === "map"),
          idx = Math.floor(pctScroll * (this.props.images.length - 1)),
          headerClasses = (pctScroll > 0.1 || isMap) ? "media-header article-header full-opacity" : "media-header article-header zero-opacity",
          images = (this.props.images) ? this.buildImages(idx) : "&nbsp;",
          mapElem = (this.props.locations) ? this.buildMap() : "&nbsp;";

    var topOffset = this.getValues().topOffset;

    return (
      <div ref="media" className="media" style={{width: this.props.open ? "99vw" : "45vw", top: `${topOffset}vh`}}>
        <ArticleHeader headerClasses={headerClasses} media map={isMap} toggleMedia={this.props.toggleMedia} title="The VICE Guide to New York City" byline="By VICE Travel Staff" />
        {images}
        {mapElem}
      </div>
    );
  }
}
