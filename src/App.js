import React, { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Plot from "react-plotly.js";
const plots = require("./test.json");

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3Jpc3RpbmFtYXJ0aW5rIiwiYSI6ImNsb3U3MTVmazBobm4yanFkOW1jY2R2c24ifQ.KxLIQK6WRueHi9oTzI54ig";

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

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(Number(flares[0].longitude));
  const [lat, setLat] = useState(Number(flares[0].latitude));
  const [zoom, setZoom] = useState(12);
  const [selectedFlare, setSelectedFlare] = useState(
    "Click on the map to select a flare to analyse"
  );
  const [dataSelected, setDataSelected] = useState("co2_rate");

  let plotX = []
  let plotY = []
  
  const filteredFlareData = plots
  .filter((plot) => plot.flare_stack_name === selectedFlare)
  .forEach((value, index) => {
    console.log(value.co2_rate, "value");
    const parsedValue = Number(value.dataSelected);
    if (!isNaN(parsedValue)) {
      plotY.push(parsedValue);
      plotX.push(index + 1);
    }
});
console.log(plotX, "plotX")
console.log(plotY, "plotY")
  
  const createMapAndMarkers = useCallback(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    flares.forEach((flare) => {
      const latitude = parseFloat(flare.latitude);
      const longitude = parseFloat(flare.longitude);

      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      marker.getElement().addEventListener("click", () => {
        setSelectedFlare(flare.flare_stack_name);
      });
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    createMapAndMarkers();
  }, [createMapAndMarkers]);

  return (
    <div className="main">
      <div ref={mapContainer} className="container" />
      <div className="container plot">
        <Plot
          data={[
            {
              x: plotX,
              y: plotY,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            //{type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={{ width: 640, height: 480, title: selectedFlare }}
        />
        <div>
          <p>Please select data to analyse</p>
          <p>{dataSelected}</p> {" "}
          <input
            type="radio"
            id="co2_rate"
            name="data"
            value="co2_rate"
            onClick={(e) => {
              setDataSelected(e.target.value);
            }}
            defaultChecked
          />
            <label for="co2_rate">CO2 Rate</label> {" "}
          <input
            type="radio"
            id="volume_tracked"
            name="data"
            value="volume_tracked"
            onClick={(e) => {
              setDataSelected(e.target.value);
            }}
          />
            <label for="volume_tracked">Volume tracked</label> {" "}
          <input
            type="radio"
            id="rate_estimated"
            name="data"
            value="rate_estimated"
            onClick={(e) => {
              setDataSelected(e.target.value);
            }}
          />
            <label for="rate_estimated">Rate estimated</label>
        </div>
      </div>
    </div>
  );
}

export default App;
