import React, { useState, useRef } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const MAP_URL =
  `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_MAPS_API_KEY}`;

interface LatLon {
  lat: number,
  lon: number,
}

interface LatLng {
  lat: number,
  lng: number,
}

const toLng = (inp: LatLon): LatLng => (!inp ? inp : {
  lat: inp.lat,
  lng: inp.lon,
});

const toLon = ({ lat, lng }: LatLng): LatLon => ({
  lat,
  lon: lng,
});

interface MapProps {
  center: LatLon,
  onCenterChanged(center: LatLon): any,

  zoom: number,
  onZoomChanged(zoom: number): any,
}

const Map = ({
  zoom,
  onZoomChanged,
  center,
  onCenterChanged,
}: MapProps) => {
  const mapRef = useRef<GoogleMap>(null);

  const updateCenter = () => {
    const { lat, lng } = mapRef.current!.getCenter();
    onCenterChanged({
      lat: lat(),
      lon: lng(),
    });
  };

  const updateZoom = () => {
    const newZoom = mapRef.current!.getZoom();
    console.log('zoom is', newZoom);
    onZoomChanged(newZoom);
  }

  const MyGoogleMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        ref={mapRef}

        zoom={zoom}
        onZoomChanged={updateZoom}

        center={toLng(center)}
        onCenterChanged={updateCenter}
      />
    )));

  const loadingElement = <div/>
  const containerElement = <div style={{height: "200px"}}/>
  const mapElement = <div style={{height: "200px"}}/>
  const map = <MyGoogleMap
    loadingElement={loadingElement}
    containerElement={containerElement}
    googleMapURL={MAP_URL}
    mapElement={mapElement}
  />

  return map;
};

interface Props {
  value?: LatLon,
  defaultValue: LatLon,
  onChange(value: LatLon): void,

  showMapButton: boolean,
  defaultZoom: number,
}

const LatLonInput = ({
  value, defaultValue,
  defaultZoom,
  onChange,
  showMapButton,
}: Props) => {
  const [zoom, setZoom] = useState(defaultZoom);

  return (
    <div>
      <Map
        zoom={zoom}
        onZoomChanged={setZoom}
        center={value || defaultValue}
        onCenterChanged={onChange}
      />
    </div>
  )
};

LatLonInput.defaultProps = {
  value: undefined,
  defaultValue: {
    lat: -25.363882, 
    lon: 131.044922,
  },
  defaultZoom: 8
};

export default LatLonInput;
