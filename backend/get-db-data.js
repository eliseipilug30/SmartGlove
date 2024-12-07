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
        const query = 'INSERT INTO local () VALUES ($1, $2, $3) RETURNING *';
        const values = [name, address, contact_number];

        const result = await pool.query(query, values);
        return result.rows[0];  // Return the newly inserted row
    } catch (error) {
        console.error('Error inserting data:', error);
        throw new Error("Failed to insert merchant");
    }
};

module.exports = {
    insertReading,
};