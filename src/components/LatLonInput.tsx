import React, { useState, useRef } from 'react';
import { LatLon } from '../util/types';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MAP_URL =
  `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_MAPS_API_KEY}`;

export interface LatLng {
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

const MapComponent = ({
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

  return (
    <GoogleMap
      ref={mapRef}

      zoom={zoom}
      onZoomChanged={updateZoom}

      center={toLng(center)}
      onCenterChanged={updateCenter}

      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: true,
        zoomControl: true,
        rotateControl: false,
        fullscreenControl: false
      }}      
    >
      <Marker position={toLng(center)} />
    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(MapComponent));

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


  const loadingElement = <div/>
  const containerElement = <div style={{height: "200px"}}/>
  const mapElement = <div style={{height: "200px"}}/>
  
  return (
    <div>
      <Map
        loadingElement={loadingElement}
        containerElement={containerElement}
        googleMapURL={MAP_URL}
        mapElement={mapElement}
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
