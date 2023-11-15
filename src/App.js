import React, { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import Map from './components/Map'
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Plotly from "plotly.js-dist"
const plots = require("./test.json");

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3Jpc3RpbmFtYXJ0aW5rIiwiYSI6ImNsb3U3MTVmazBobm4yanFkOW1jY2R2c24ifQ.KxLIQK6WRueHi9oTzI54ig";



function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(Number(flares[0].longitude));
  // const [lat, setLat] = useState(Number(flares[0].latitude));
  const [zoom, setZoom] = useState(12);
  const [selectedFlare, setSelectedFlare] = useState(
    "Click on the map to select a flare to analyse"
  );
  const [dataSelected, setDataSelected] = useState();

  console.log(selectedFlare, "selected flare in App")
  // const createMapAndMarkers = useCallback(() => {
  //   if (map.current) return; 
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });

  //   flares.forEach((flare) => {
  //     const latitude = parseFloat(flare.latitude);
  //     const longitude = parseFloat(flare.longitude);

  //     const marker = new mapboxgl.Marker()
  //       .setLngLat([longitude, latitude])
  //       .addTo(map.current);

  //     marker.getElement().addEventListener("click", () => {
  //       setSelectedFlare(flare.flare_stack_name);
  //     });
  //   });
  // }, [lng, lat, zoom]);
  
    
    const createPlot = () => {
      let plotX = [];
    let plotY = [];
    
      const filteredFlareData = plots
      .filter((plot) => plot.flare_stack_name === selectedFlare)
      .forEach((value, index) => {
        const parsedValue = Number(value[dataSelected]);
        const parsedTime = Number(value.time)
        if (!isNaN(parsedValue)) {
          plotY.push(parsedValue);
          plotX.push(parsedTime);
        }
      });

      let data = {
        type: 'scatter',
        x: plotX,
        y: plotY,
        mode: 'lines',
        name: 'Red',
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        }
      };

      let layout = {
        width: 500,
        height: 500
      };

      Plotly.newPlot('plot', [data], layout);

      
      
      console.log(plotX, "plotX");
    console.log(plotY, "plotY");
    }
    

  useEffect(() => {
    //createMapAndMarkers();
    createPlot()
    console.log("inside useEffect")
    
    
  }, [ createPlot, dataSelected, selectedFlare]);

  return (
    <div className="main">
      <Map setSelectedFlare={setSelectedFlare}/>
      <div id='plot' className="container plot">
        {/* <Plot
          data={[
            {
              x: plotX,
              y: plotY,
              type: "scatter",
              mode: "lines",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 640, height: 480, title: selectedFlare, datarevision: 'true' }}
        /> */}
        <div className="">
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
