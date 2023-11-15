import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import PlotComponent from "./components/Plot";

function App() {
  const [selectedFlare, setSelectedFlare] = useState(
    "Click on the map to select a flare to analyse"
  );

  return (
    <div className="main">
      <Map setSelectedFlare={setSelectedFlare} />
      <PlotComponent selectedFlare={selectedFlare} />
    </div>
  );
}

export default App;
