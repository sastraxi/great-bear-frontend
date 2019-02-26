import { LatLon, Geometry } from './types';

/**
 * Converts a lat/lon point to GeoJSON coordinate in the given coordinate system
 * See https://blog.hasura.io/graphql-and-geo-location-on-postgres-using-hasura-562e7bd47a2f/
 * and https://gis.stackexchange.com/a/60945 for how to set SRID with GeoJSON
 */
const toGeometry = ({ lat, lon }: LatLon, srid: number = 4326): Geometry => ({
  type: 'Point',
  coordinates: [lat, lon],
  crs: {
    type: 'name',
    properties: {
      name: `EPSG:${srid}`,
    },
  },
});

export default toGeometry;
