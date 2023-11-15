import React, { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import Map from "./components/Map";
import PlotComponent from "./components/Plot";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Plotly from "plotly.js-dist";
const plots = require("./test.json");

function App() {
  const [selectedFlare, setSelectedFlare] = useState(
    "Click on the map to select a flare to analyse"
  );
  

  return (
    <div className="main">
      <Map setSelectedFlare={setSelectedFlare} />
      <PlotComponent selectedFlare={selectedFlare}/>
    </div>
  );
}

export default App;
