import React, { useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import Map from 'pigeon-maps';
// @ts-ignore
import Marker from 'pigeon-marker';
import isEqual from 'lodash/isEqual';

import { LatLon } from '../util/types';

type ArrayCoord = [number, number];

const toArray = (inp: LatLon): ArrayCoord =>
  (!inp ? inp : [inp.lat, inp.lon]);

const toLatLon = ([ lat, lon ]: ArrayCoord): LatLon => ({
  lat,
  lon,
});

interface BoundsChangedEvent {
  center: ArrayCoord,
  zoom: number,
};

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
  const arrayCenter = toArray(center);

  const sendUpdates = ({ center: newCenter, zoom: newZoom }: BoundsChangedEvent) => {
    if (!isEqual(newCenter, arrayCenter)) {
      onCenterChanged(toLatLon(newCenter));
    }
    if (zoom !== newZoom) {
      onZoomChanged(newZoom);
    }
  };

  return (
    <Map
      center={arrayCenter}
      onBoundsChanged={sendUpdates}
      zoom={zoom}
    >
      <Marker position={arrayCenter} />
    </Map>
  );
};

interface Props {
  value?: LatLon,
  defaultValue: LatLon,
  onChange(value: LatLon): void,

  showMapButton: boolean,
  defaultZoom: number,
}

const Container = styled.div`
  height: 200px;
`;

const LatLonInput = ({
  value, defaultValue,
  defaultZoom,
  onChange,
  showMapButton,
}: Props) => {
  const [zoom, setZoom] = useState(defaultZoom);
  return (
    <Container>
      <MapComponent
        zoom={zoom}
        onZoomChanged={setZoom}
        center={value || defaultValue}
        onCenterChanged={onChange}
      />
    </Container>
  );
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
