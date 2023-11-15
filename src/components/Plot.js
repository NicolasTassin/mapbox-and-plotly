import React, { useEffect, useState, useCallback } from "react";
import Plotly from "plotly.js-dist";
const plots = require("../data/test.json");

const PlotComponent = ({ selectedFlare }) => {
  const [dataSelected, setDataSelected] = useState();

  const handleDataSelected = (e) => {
    const selectedValue = e.target.value;
    Plotly.purge("plot");
    setDataSelected(selectedValue);
    createPlot(selectedValue);
  };

  const createPlot = useCallback((selectedValue) => {
    let plotX = [];
    let plotY = [];

    plots
      .filter((plot) => plot.flare_stack_name === selectedFlare)
      .forEach((value) => {
        const parsedValue = Number(value[selectedValue]);
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
        color:
          selectedValue === "rate_estimated"
            ? "rgb(219, 64, 82)"
            : selectedValue === "co2_rate"
            ? "#168ACB"
            : "#00AC63",
        width: 1,
      },
    };

    let layout = {
      width: 640,
      height: 500,
      title: selectedFlare,
    };

    Plotly.newPlot("plot", [data], layout);
  }, [selectedFlare]);

  useEffect(() => {
    createPlot(dataSelected);
  }, [createPlot, dataSelected]);

  return (
    <div id="plot" className="container plot">
      <div className="radio-container">
        <p>Please select data to analyse</p>
        <div className="input-container">
          <input
            type="radio"
            id="co2_rate"
            name="data"
            value="co2_rate"
            onChange={handleDataSelected}
          />
          <label htmlFor="co2_rate">CO2 Rate</label>
          <input
            type="radio"
            id="volume_tracked"
            name="data"
            value="volume_tracked"
            onChange={handleDataSelected}
          />
          <label htmlFor="volume_tracked">Volume tracked</label>
          <input
            type="radio"
            id="rate_estimated"
            name="data"
            value="rate_estimated"
            onChange={handleDataSelected}
          />
          <label htmlFor="rate_estimated">Rate estimated</label>
        </div>
      </div>
    </div>
  );
};

export default PlotComponent;
