import { default as React, Component } from "react";
import {GoogleMapLoader, GoogleMap, Marker, Polyline, Polygon} from "react-google-maps";

class PlaceTray extends Component {
  render() {
    return (
      <div className="place-tray">
        <h2>{this.props.name}</h2>
        {this.props.formatted_address}
        <br />
        {this.props.website}
      </div>
    );
  }
}

export default class LocationMap extends Component {
  makeMarker() {
    // onRightclick={this.handleMarkerRightclick.bind(this, index)}
    return (
      <Marker {...this.props.center} />
    );
  }

  makePolygon() {
    return (
      <Polygon {...this.props.center} />
    );
  }

  makeStreetView() {
    // console.log("mapContainer", this.refs["streetviewHolder"]);
    if(!this.streetview) {
      this.streetview = new google.maps.StreetViewPanorama(this.refs["streetviewHolder"], {...this.props.center});
    } else {
      this.streetview.setPosition(this.props.center.position);
      this.streetview.setZoom(this.props.center.zoom);
    }

  }

  getChildren() {
    switch(this.props.center.type) {
      case "polygon":
        return this.makePolygon();
      case "marker":
        return this.makeMarker();
      case "streetview":
        return this.makeStreetView();
      default:
        return "&nbsp;";
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.center.key !== nextProps.center.key);
  }

  render() {
    const children = this.getChildren(),
          { type } = this.props.center,
          mapVis = (type != "streetview") ? "block" : "none",
          streetviewVis = (type === "streetview") ? "block" : "none",
          placeTray = (this.props.center.place_id) ? (<PlaceTray {...this.props.center} />) : "";

    return (
      <div style={{ height: "100%" }}>
        {placeTray}
        <GoogleMapLoader
          containerElement={<div {...this.props} style={{ height: "100%", display: mapVis }} />}
          googleMapElement={
            <GoogleMap
              ref={(map) => map }
              defaultZoom={this.props.center.zoom}
              zoom={this.props.center.zoom}
              center={this.props.center.position}
              defaultCenter={this.props.center.position}>
              {children}
            </GoogleMap>
          }
        />
        <div ref="streetviewHolder" style={{ height: "100%", display: streetviewVis }}></div>
      </div>
    );
  }
}
