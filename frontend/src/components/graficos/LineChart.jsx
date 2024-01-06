import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
    <div className="chart-container" style={{ width: "100%", height: "100%" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Média Diária Níveis de Radiação (nSv/dia)"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;