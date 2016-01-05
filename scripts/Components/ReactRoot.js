import { default as React, Component } from "react";
import _ from "lodash";
import { default as requireAll } from "../lib/requireall";
import { default as clamp } from "../lib/clamp";
import { placeFinder } from "../lib/placefinder";

import FullBleedIntro from "./FullBleedIntro";
import ArticleHeader from "./ArticleHeader";
import Article from "./Article";
import InfoBox from "./InfoBox";
import MediaTray from "./MediaTray";
import Outro from "./Outro";

import ScanComponent from "./Scan";
import Transformation from "../lib/Transformation";

import map from "../../assets/map.png"

const galleryImages = requireAll(require.context('../../assets/gallery/', true, /.*/)),
      imageData = [ { full: true, caption: "The Vice Guide to New York City", title: false },
        { full: true },
        {annotations: [
            { text: "Not a New York Slice.",
              position: {x:"32%",y:"32%",},
              type: "rect",
              dim: {w: "63%" } }
        ]},
        { full: true },
        {},
        {},
        {},
        {}],
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
          placeId: "ChIJ_ShwXw32wokRQJpaKAIcCOo",
          position: { lat: 40.8084348, lng: -73.9498457 }},
        { key: "akashicbooks",
          description: "Akashic Books",
          type: "marker",
          zoom: 16,
          placeId: "ChIJG31cO_9awokR2jh2SUZ3sgw",
          position: { lat: 40.6748632, lng: -73.9901155 }},
        { key: "bellhouse",
          description: "The Bell House",
          type: "marker",
          zoom: 16,
          placeId: "ChIJybXFCvlawokRoXw_e6VhLqI",
          position: { lat: 40.6737363, lng: -73.993868 }
        },
          { key: "secondchancesaloon",
          description: "Second Chance Saloon",
          type: "marker",
          zoom: 16,
          placeId: "ChIJvQlHv1dZwokR0i_MOgzIk8g",
          position: { lat: 40.7115819, lng: -73.9482528 }},
          { key: "oldrabbitclub",
          description: "124 Old Rabbit Club",
          type: "marker",
          zoom: 16,
          placeId: "ChIJsU0rhJFZwokRmUJmeDamSLo",
          position: { lat: 40.7298895, lng: -74.0023834 }},
          { key: "scratcher",
          description: "The Scratcher",
          type: "marker",
          zoom: 16,
          placeId: "ChIJ4T3bPptZwokRxMTOwDwXsOw",
          position: { lat: 40.7276915, lng: -73.9926977 }},
          { key: "sidgold",
          description: "Sid Gold's",
          type: "marker",
          zoom: 16,
          placeId: "ChIJz_NwRKVZwokRGp7XDpwqNnI",
          position: { lat: 40.7459733, lng: -73.9958193 }},
          { key: "anbealbochtcafe",
          description: "An Beal Bocht Café",
          type: "marker",
          zoom: 16,
          placeId: "ChIJxTOdjLvzwokR5HWDbnyl2jw",
          position: { lat: 40.8874298, lng: -73.9071412 }},
          { key: "deadrabbit",
          description: "The Dead Rabbit",
          type: "marker",
          zoom: 16,
          placeId: "ChIJIRiJaRRawokR2KyQ984qa-o",
          position: { lat: 40.7033, lng: -74.013228 }},
          { key: "dutchkills",
          description: "Dutch Kills",
          type: "marker",
          zoom: 16,
          placeId: "ChIJwVwmQCpZwokRJdgjmkHMexA",
          position: { lat: 40.747773, lng: -73.942456 }}],
      infoBoxData = [{ key: "alexandros_grigoropoulos" }];

export default class ReactRoot extends ScanComponent {
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

  setupTransformations(){
    let intro = new Transformation(0, 0.05, (pct) => {
                  return pct
                }, { pre: 0, post: 1});

    let fixed = new Transformation(0,0.05, (pct) => {
        return true;
    }, {pre: true, post: false});


    return {
      intro,
      fixed
    };
  }

  componentWillMount() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    this.setState({ mapLocations: mapLocations,
      measurements: {
        viewportHeight,
        scrollTriggerPos: viewportHeight * -0.5,
        viewportWidth,
        viewportTop: 0,
        contentHeight: 0,
        pctScroll: 0 } });
  }

  setPlaceInfo(places, mapLocations) {
    return mapLocations.map((loc) => {
      if(loc.placeId) {
        return { ...loc, ...places.filter((plc) => { return plc.place_id === loc.placeId; })[0] };
      }
      return loc;
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.Root = this;

    const { measurements } = this.calculateMeasurements();
    let { mapLocations } = this.state;

    Promise.all(this.state.mapLocations.filter((loc) => {
      return loc.placeId;
    }).map((plc) => {
      return placeFinder.getPlaceInfo(this.refs["placeHolder"], plc.placeId);
    })).then((places) => {
      let newLocations = this.setPlaceInfo(places.map((plc) => {
        delete plc.icon;
        plc.position = {lat: plc.geometry.location.lat(), lng: plc.geometry.location.lng() };
        return plc;
      }), mapLocations);
      this.setState({measurements, mapLocations: newLocations});
    });
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
    const contentHeight = (measurements.contentHeight === 0) ? (this.refs.article.refs.article.clientHeight * 1.0757) : measurements.contentHeight;
    const pctScroll = clamp(viewportTop / (contentHeight - viewportHeight), 0, 1);
    const pctScrollRaw = viewportTop / (contentHeight - viewportHeight);
    return { measurements: {
      ...measurements,
      contentHeight,
      viewportTop,
      pctScroll,
      pctScrollRaw}};
  }

  setMedia(hash, additionalState) {
    let [type, key] = hash.split("#").slice(1);

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

  scrollTop(){
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    return top;
  }

  scrollToName(name){
        var root_height = this.refs.root.offsetHeight,
        intro_size = Intro.size * root_height,
        root_top = this.refs.root.offsetTop,
        selected_el = document.querySelectorAll(`[name=${name}]`)[0],
        selected_top = selected_el.offsetTop,
        current_top = this.scrollTop(),
        dest = selected_top + intro_size - 80,
        delta = (dest) - current_top,
        tick = delta/15,
        timer = 0;

    var timerInt = setInterval(() => {
        var current_top = this.scrollTop();
        window.scrollTo(0,current_top + tick);
        timer += 1;
        if(timer > 14){
          clearInterval(timerInt);
          window.scrollTo(0,dest);
          this._handleScroll();
        }
    },33)
  }

  render() {

    var vals = this.getValues();

    return (
      <div
        ref="root"
        className="react-root"
        style={{ height: this.state.measurements.contentHeight, width: this.state.measurements.viewportWidth }}>
        <div style={{backgroundImage: `url(${map})`, backgroundSize: "cover", width: "100%", height: "100%", position: "fixed"}}></div>
        <FullBleedIntro measurements={this.state.measurements} coordinations={vals} />
        <Article
          ref="article"
          coordinations={vals}
          setMedia={this.setMedia.bind(this)}
          measurements={this.state.measurements}
          showDetails={this.showDetails.bind(this)} />
        <MediaTray
          coordinations={vals}
          toggleFullImage={this.toggleFullImage.bind(this)}
          toggleMedia={this.toggleMedia.bind(this)}
          activeType={this.state.mediaType}
          activeKey={this.state.mediaKey}
          open={this.state.open}
          measurements={this.state.measurements}
          images={galleryImages}
          imageData={imageData}
          locations={this.state.mapLocations} />
        <InfoBox
          active={this.state.infoBox}
          rawPos={this.state.infoBoxRawPos}
          hideInfo={this.hideDetails.bind(this)} />
        <div ref="placeHolder"></div>
      </div>
    );
  }
}
