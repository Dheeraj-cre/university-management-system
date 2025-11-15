import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function Reports() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/department")
      .then((res) => res.json())
      .then((data) => setReportData(data));
  }, []);

  const data = {
    labels: reportData.map(r => r.departmentName),
    datasets: [
      {
        label: "Students per Department",
        data: reportData.map(r => r.studentCount),
      },
    ],
  };

  return (
    <div>
      <h2>University Analytics</h2>
      <Bar data={data} />
    </div>
  );
}

export default Reports;
