import React from "react";
import Plot from "react-plotly.js";

const PlotComponent = ({ plotX, plotY, selectedFlare, dataSelected, setDataSelected }) => {
  const handleDataSelected = (e) => {
    setDataSelected(e.target.value);
  };

  return (
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
        ]}
        layout={{ width: 640, height: 480, title: selectedFlare }}
      />
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
  );
};

export default PlotComponent;
