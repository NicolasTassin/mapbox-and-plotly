import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = ""//<API_KEY>
  

const flares = [
  {
    flare_stack_name: "flare4",
    latitude: "35.44069",
    longitude: "-118.983",
  },
  {
    flare_stack_name: "flare2",
    latitude: "35.4543",
    longitude: "-118.991",
  },
  {
    flare_stack_name: "flare1",
    latitude: "35.44255",
    longitude: "-119.006",
  },
];

const Map = ({ setSelectedFlare }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
    
  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [flares[0].longitude, flares[0].latitude],
        zoom: 12,
      });

      flares.forEach((flare) => {
        const latitude = parseFloat(flare.latitude);
        const longitude = parseFloat(flare.longitude);

        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);

        marker.getElement().addEventListener("click", () => {
          setSelectedFlare(flare.flare_stack_name);
          console.log(flare.flare_stack_name);
        });
      });
    }
  }, [setSelectedFlare]);

  return <div ref={mapContainer} className="container" />;
};

export default Map;
