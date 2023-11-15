import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-dist";
const plots = require("../test.json");

const PlotComponent = ({ selectedFlare }) => {
  const [dataSelected, setDataSelected] = useState();

  const handleDataSelected = (e) => {
    setDataSelected(e.target.value);
  };

  const createPlot = () => {
    let plotX = [];
    let plotY = [];

    const filteredFlareData = plots
      .filter((plot) => plot.flare_stack_name === selectedFlare)
      .forEach((value, index) => {
        const parsedValue = Number(value[dataSelected]);
        const parsedTime = Number(value.time);
        if (!isNaN(parsedValue)) {
          plotY.push(parsedValue);
          plotX.push(parsedTime);
        }
      });

    let data = {
      type: "scatter",
      x: plotX,
      y: plotY,
      mode: "lines",
      name: "Red",
      line: {
        color: "rgb(219, 64, 82)",
        width: 3,
      },
    };

    let layout = {
      width: 500,
      height: 500,
      title: selectedFlare
    };

    Plotly.newPlot("plot", [data], layout);

    console.log(plotX, "plotX");
    console.log(plotY, "plotY");
  };

  useEffect(() => {
    //createMapAndMarkers();
    createPlot();
    console.log("inside useEffect");
  }, [createPlot, dataSelected, selectedFlare]);

  return (
    <div className="container plot">
      <div id="plot" className="container plot">
        <div className="radio-container">
          <p>Please select data to analyse</p>
          <p>{dataSelected}</p>
          <input
            type="radio"
            id="co2_rate"
            name="data"
            value="co2_rate"
            onClick={handleDataSelected}
          />
          <label htmlFor="co2_rate">CO2 Rate</label>
          <input
            type="radio"
            id="volume_tracked"
            name="data"
            value="volume_tracked"
            onClick={handleDataSelected}
          />
          <label htmlFor="volume_tracked">Volume tracked</label>
          <input
            type="radio"
            id="rate_estimated"
            name="data"
            value="rate_estimated"
            onClick={handleDataSelected}
          />
          <label htmlFor="rate_estimated">Rate estimated</label>
        </div>
      </div>
    </div>
  );
};

export default PlotComponent;
