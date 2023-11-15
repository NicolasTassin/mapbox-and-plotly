import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { flares } from "../data/flares";


mapboxgl.accessToken = ""; //<API_KEY>

const Map = ({ setSelectedFlare }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [flares[0].longitude, flares[0].latitude],
        zoom: 12,
      });

      flares.forEach((flare) => {
        const { latitude, longitude, flare_stack_name } = flare;
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        const marker = new mapboxgl.Marker()
          .setLngLat([parsedLongitude, parsedLatitude])
          .setPopup(new mapboxgl.Popup({className:'popup'}).setHTML(`<h2>${flare_stack_name}</h2>`))
          .addTo(map.current);

        const markerClickHandler = () => {
          setSelectedFlare(flare_stack_name);
        };

        marker.getElement().addEventListener("click", markerClickHandler);
      });
    }
  }, [setSelectedFlare]);

  return <div ref={mapContainer} className="container" />;
};

export default Map;
