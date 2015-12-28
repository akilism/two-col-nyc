import { default as React, Component } from "react";
import _ from "lodash";
import { default as requireAll } from "../lib/requireall";
import { default as clamp } from "../lib/clamp";

import FullBleedIntro from "./FullBleedIntro";
import ArticleHeader from "./ArticleHeader";
import Article from "./Article";
import InfoBox from "./InfoBox";
import MediaTray from "./MediaTray";

const galleryImages = requireAll(require.context('../../assets/gallery/', true, /.*/)),
      imageData = [ { full: true, caption: "The Vice Guide to New York City", title: false },
        {},
        {annotations: [
            { text: "EAT SOME PIZZA YA FILTHY ANIMAL.",
              position: {x:"32%",y:"32%",},
              type: "rect",
              dim: {w: "63%" } }
        ]}],
      mapLocations = [ { key: "exarcheia",
        description: "Exarcheia Neighborhood",
        zoom: 14,
        path: [{lat: 37.98199, lng: 23.73399},
               {lat: 37.98683, lng: 23.74368},
               {lat: 37.99028, lng: 23.74090},
               {lat: 37.99177, lng: 23.73137},
               {lat: 37.98602, lng: 23.72987},
               {lat: 37.98581, lng: 23.73073},
               {lat: 37.98199, lng: 23.73399}],
        options: { fillColor: "MidnightBlue",
          fillOpacity: 0.25,
          strokeColor: "MidnightBlue",
          strokeOpacity: 0.65,
          strokeWeight: 4 },
        type: "polygon",
        position: { lat: 37.9861256, lng: 23.7336206 }},
        { key: "malcolmxblvd",
          description: "Malcolm X Blvd.",
          type: "streetview",
          zoom: 1,
          position: { lat: 40.807708, lng: -73.945452 }},
        { key: "studiomuseum",
          description: "The Studio Museum",
          type: "marker",
          zoom: 16,
          position: { lat: 40.8084348, lng: -73.9498457 }},
        { key: "akashicbooks",
          description: "Akashic Books",
          type: "marker",
          zoom: 16,
          position: { lat: 40.6748632, lng: -73.9901155 }},
        { key: "bellhouse",
          description: "The Bell House",
          type: "marker",
          zoom: 16,
          position: { lat: 40.6737363, lng: -73.993868 }},
          { key: "secondchancesaloon",
          description: "Second Chance Saloon",
          type: "marker",
          zoom: 16,
          position: { lat: 40.7115819, lng: -73.9482528 }},
          { key: "oldrabbitclub",
          description: "124 Old Rabbit Club",
          type: "marker",
          zoom: 16,
          position: { lat: 40.7298895, lng: -74.0023834 }},
          { key: "scratcher",
          description: "The Scratcher",
          type: "marker",
          zoom: 16,
          position: { lat: 40.7276915, lng: -73.9926977 }},
          { key: "sidgold",
          description: "Sid Gold's",
          type: "marker",
          zoom: 16,
          position: { lat: 40.7459733, lng: -73.9958193 }},
          { key: "anbealbochtcafe",
          description: "An Beal Bocht Café",
          type: "marker",
          zoom: 16,
          position: { lat: 40.8874298, lng: -73.9071412 }},
          { key: "deadrabbit",
          description: "The Dead Rabbit",
          type: "marker",
          zoom: 16,
          position: { lat: 40.7033, lng: -74.013228 }},
          { key: "dutchkills",
          description: "Dutch Kills",
          type: "marker",
          zoom: 16,
          position: { lat: 40.747773, lng: -73.942456 }}],
      infoBoxData = [{ key: "alexandros_grigoropoulos" }];

export default class ReactRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      titleClose: false,
      mediaType: "image",
      mediaKey: 0,
      infoBox: false,
      infoBoxKey: null,
      infoBoxRawPos: {x: 0, y: 0},
      measurements: {
        viewportTop: 0,
        viewportHeight: 0,
        pctScroll: 0,
        contentHeight: 0
      }
    }
    this.start = null;
    this.handleScroll = _.throttle(this._handleScroll, 16);
  }

  componentWillMount() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    this.setState({ measurements: {
      viewportHeight,
      scrollTriggerPos: viewportHeight * -0.5,
      viewportWidth,
      viewportTop: 0,
      contentHeight: 0,
      pctScroll: 0 }
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.Root = this;
    const { measurements } = this.calculateMeasurements();
    this.setState({measurements});
  }

  _handleScroll(ev) {
    var {measurements} = this.calculateMeasurements(),
        pctScroll = measurements.pctScroll;

    let scrollBuddies = document.querySelectorAll("[data-scroll=true]");
    let active = _.filter(scrollBuddies, (sb) => {
      const dist = window.pageYOffset - (sb.offsetTop - this.state.measurements.scrollTriggerPos);
      return dist > 0 && dist < 150;
    });

    if(active.length > 0) {
      // console.log(active[0].getAttribute("data-scroll-action"));
      this.setMedia(active[0].getAttribute("data-scroll-action"), { measurements, open: false, titleClose: true });
    } else {
      this.setState({ measurements, open: false, titleClose: true });
    }
  }

  calculateMeasurements() {
    const viewportTop = window.pageYOffset;
    const {measurements} = this.state;
    const {viewportHeight} = measurements;
    const contentHeight = (measurements.contentHeight === 0) ? this.refs.article.refs.article.clientHeight : measurements.contentHeight;
    const pctScroll = clamp(viewportTop / (contentHeight - viewportHeight), 0, 1);
    return { measurements: {
      ...measurements,
      contentHeight,
      viewportTop,
      pctScroll }};
  }

  setMedia(hash, additionalState) {
    let [type, key] = hash.split("#").slice(1);
    console.log(type, key);

    if(additionalState) {
      this.setState({...additionalState, mediaType: type, mediaKey: key });
    } else {
      this.setState({ mediaType: type, mediaKey: key });
    }
  }

  showDetails(hash, pos) {
    let item = hash.replace("#", "");

    if(this.state.infoBox && this.state.infoBoxKey == item) {
      this.setState({infoBox: false});
    } else {
      this.setState({ infoBox: true, infoBoxKey: item, infoBoxRawPos: pos });
    }
  }

  hideDetails() {
    this.setState({infoBox: false});
  }

  toggleMedia(type) {
    switch(type) {
      case "map":
        this.setState({ mediaType: type, mediaKey: mapLocations[0].key });
        break;
      case "image":
        this.setState({ mediaType: type, mediaKey: 0 });
        break;
    }
  }

  toggleFullImage(isTitle) {
    let newState = {open: !this.state.open};
    if(isTitle) { newState.titleClose = true; }
    this.setState(newState);
  }

  render() {
    return (
      <div
        ref="root"
        className="react-root"
        style={{ height: this.state.measurements.contentHeight, width: this.state.measurements.viewportWidth }}>
        <FullBleedIntro measurements={this.state.measurements} />
        <Article
          ref="article"
          setMedia={this.setMedia.bind(this)}
          measurements={this.state.measurements}
          showDetails={this.showDetails.bind(this)} />
        <MediaTray
          toggleFullImage={this.toggleFullImage.bind(this)}
          toggleMedia={this.toggleMedia.bind(this)}
          activeType={this.state.mediaType}
          activeKey={this.state.mediaKey}
          open={this.state.open}
          measurements={this.state.measurements}
          images={galleryImages}
          imageData={imageData}
          locations={mapLocations} />
        <InfoBox
          active={this.state.infoBox}
          rawPos={this.state.infoBoxRawPos}
          hideInfo={this.hideDetails.bind(this)} />
      </div>
    );
  }
}
