import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { City, Point } from '../../types/types';

const MAP_HEIGHT = 806;
const ICON_WIDTH = 23.2;
const ICON_HEIGHT = 36.06;

type MapProps = {
  city: City;
  points: Point[];
  selectedOfferId?: string | undefined;
  mapHeight?: string | number;
  mapWidth?: string | number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT]
});

function Map(props: MapProps) {
  const {city, points, selectedOfferId, mapHeight = MAP_HEIGHT, mapWidth = 'auto'} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== undefined && point.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedOfferId]);

  return <div style={{height: mapHeight, width: mapWidth, margin: '0 auto'}} ref={mapRef}></div>;
}

export default Map;
