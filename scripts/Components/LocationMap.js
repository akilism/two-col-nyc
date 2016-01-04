import { default as React, Component } from "react";
import {GoogleMapLoader, GoogleMap, Marker, Polyline, Polygon} from "react-google-maps";

class PlaceTray extends Component {
  render() {
    console.log(this.props);
    const [houseNumber, street, city, state, country, postalCode] = this.props.address_components;
    return (
      <div className="place-tray">
        <h2 className="place-name">{this.props.name}</h2>
        <img src="https://lh5.googleusercontent.com/-DBIqtdy_ecM/VXvGy2r34UI/AAAAAAAAAAo/VSBV0JIJIHw/w408-k/=s408" className="place-image" />
        <div className="place-details">
          <div className="place-desc">
            <div className="place-sub-title">Description</div>
            In many ways, Output is a symbol of Williamsburg’s takeover as the center of the club scene. The behemoth club is the kind you might have found in the pre-Giuliani Meatpacking District. But the pretension didn’t travel to Brooklyn. Despite its size, the club is surprisingly low key.
          </div>
          <div className="place-address">
            <div className="place-sub-title">Address</div>
            {houseNumber.short_name} {street.short_name}
            <br />
            {city.short_name}, {state.short_name} {postalCode.short_name}
          </div>
          <div className="place-extra-nfo"><a href={this.props.website} target="_blank">{this.props.website}</a></div>
        </div>
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
