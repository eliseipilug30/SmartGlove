const Pool = require('pg').Pool
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'polihackdb',
    password: 'root',
    port: 5435,
});

const insertReading = async (temp, humidity, fire, light, co2) => {
    try {
        const query = 'INSERT INTO local (temp, humidity, fire, light, co2) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [temp, humidity, fire, light, co2];

        const result = await pool.query(query, values);
        return result.rows[0];  // Return the newly inserted row
    } catch (error) {
        console.error('Error inserting data:', error);
        throw new Error("Failed to insert reading");
    }
};

const insertEmployeeReading = async(employee, heartrate, body_temperature, o2level, stress) => {
    try {
        const query = 'INSERT INTO employee (employee_number, heartrate, body_temperature, o2level, stress) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [employee, heartrate, body_temperature, o2level, stress];

        const result = await pool.query(query, values);
        return result.rows[0];  // Return the newly inserted row
    } catch (error) {
        console.error('Error inserting data:', error);
        throw new Error("Failed to insert employee data");
    }
}

const getAverages = async () => {
    try {
        const query = `
            SELECT batch_number,
                   AVG(heartrate)        AS avg_heartrate,
                   AVG(body_temperature) AS avg_body_temperature,
                   AVG(o2level)          AS avg_o2level,
                   AVG(stress)           AS avg_stress
            FROM (
                SELECT FLOOR((ROW_NUMBER() OVER (ORDER BY id DESC) - 1) / 10) + 1 AS batch_number,
                       heartrate,
                       body_temperature,
                       o2level,
                       stress
                FROM employee
            ) AS batches
            GROUP BY batch_number
            ORDER BY batch_number DESC
            LIMIT 10;
        `;

        const result = await pool.query(query);
        return result.rows.reverse(); // Reverse the order to get batches in ascending order
    } catch (error) {
        console.error('Error fetching batch averages:', error);
        throw new Error('Internal Server Error');
    }
};

const getLatestAverages = async() => {
    const query = `
        SELECT 
            AVG(heartrate) AS avg_heartrate,
            AVG(body_temperature) AS avg_body_temperature,
            AVG(o2level) AS avg_o2level,
            AVG(stress) AS avg_stress
        FROM (
            SELECT heartrate, body_temperature, o2level, stress
            FROM employee
            ORDER BY id DESC
            LIMIT 10
        ) AS latest_10;
    `;

    try {
        const result = await pool.query(query);
        const averages = result.rows[0];

        // Example thresholds (adjust as needed)
        const thresholds = {
            heartrate: 100,
            body_temperature: 38,
            o2level: 90,
            stress: 5,
        };

        const spikes = Object.keys(thresholds).filter(
            key => averages[`avg_${key}`] > thresholds[key]
        );

        return { averages, spikes }; // Include detected spikes
    } catch (error) {
        console.error('Error fetching latest averages:', error);
        throw new Error('Internal Server Error');
    }
}



module.exports = {
    insertReading,
    insertEmployeeReading,
    getAverages,
    getLatestAverages
};