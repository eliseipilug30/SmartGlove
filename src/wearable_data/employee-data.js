import React from "react";
import ChartComponent from "../chart/Chart";

const EmployeeData = () => {
    return (
        <div className="card">
            <h2>Employee data</h2>
            <div className="employee">
                <ChartComponent/>
            </div>
        </div>);
}

export default EmployeeData;
