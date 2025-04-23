import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/types';
import { TileLayerParam } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null) {
      if (!isRenderedRef.current) {
        const instance = new Map(mapRef.current, {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude
          },
          zoom: city.location.zoom
        });

        const layer = new TileLayer(
          TileLayerParam.Argument,
          {
            attribution:
              TileLayerParam.Attribution
          }
        );

        instance.addLayer(layer);

        setMap(instance);
        isRenderedRef.current = true;
      } else {
        if (map) {
          map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
        }
      }
    }
  }, [mapRef, city, map]);

  return map;
}

export default useMap;
