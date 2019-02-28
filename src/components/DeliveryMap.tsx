import isEqual from 'lodash/isEqual';
// @ts-ignore
import Map from 'pigeon-maps';
// @ts-ignore
import Marker from 'pigeon-marker';
import React from 'react';
import styled from 'styled-components';
import { LatLon } from '../util/types';

type ArrayCoord = [number, number];

const toArray = (inp: LatLon): ArrayCoord =>
  (!inp ? inp : [inp.lat, inp.lon]);

interface Props {
  destination: LatLon,
  current?: LatLon,
}

const ZOOM_STEPS = [
  { cutoff: 0.002, zoom: 18 },
  { cutoff: 0.005, zoom: 17 },
  { cutoff: 0.009, zoom: 16 },
  { cutoff: 0.015, zoom: 15 },
  { cutoff: 0.033, zoom: 14 },
  { cutoff: 10000, zoom: 13 },
];

const DEFAULT_ZOOM = 16;
const ASPECT = 1.6; // to account for a wider-than-tall window

const calcZoom = (a: LatLon, b: LatLon) => {
  const xd = b.lon - a.lon;
  const yd = b.lat - a.lat;
  const diff = Math.sqrt(xd * xd + yd * yd * ASPECT);
  return ZOOM_STEPS
    .filter(step => step.cutoff > diff)[0].zoom;
};

const centerOf = (a: LatLon, b: LatLon) => ({
  lat: 0.5 * (a.lat + b.lat),
  lon: 0.5 * (a.lon + b.lon),
});

const Container = styled.div`
  height: 400px;
`;

const DeliveryMap = ({ destination, current }: Props) => {
  const zoom = current ? calcZoom(current, destination) : DEFAULT_ZOOM;
  const center = current ? centerOf(current, destination) : destination;
  return (
    <Container>
      <Map      
        touchEvents={false}
        mouseEvents={false}
        zoom={zoom}
        center={toArray(center)}
      >
        <Marker anchor={toArray(destination)} />
        { current && !isEqual(destination, current) &&
          <Marker anchor={toArray(current)} />
        }
      </Map>
    </Container>
  );
};

export default DeliveryMap;
