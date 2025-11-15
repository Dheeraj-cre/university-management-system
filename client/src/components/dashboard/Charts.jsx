import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Charts.css";

const COLORS = ["#007bff", "#00c49f", "#ffbb28", "#ff8042"];

function Charts({ studentData, financeData }) {
  return (
    <div className="charts-container">
      <div className="chart-box">
        <h3> Student Distribution by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3> Financial Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={financeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {financeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
