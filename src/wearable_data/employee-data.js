import React from "react";
import ChartComponent from "../chart/Chart";
import './styles/emp-data.css'

const EmployeeData = ({spikes, employee}) => {
    return (
        <div className="card">
            <h2>Employee data</h2>
            <div className="employee">
                <ChartComponent/>
                {spikes.length > 0 && (
                    <div className="error-banner">
                        Warning! Spikes detected in: {spikes.join(', ')} for employee {employee}
                    </div>
                )}
            </div>
        </div>);
}

export default EmployeeData;
