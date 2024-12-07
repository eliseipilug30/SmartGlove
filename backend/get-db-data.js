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
        throw new Error("Failed to insert merchant");
    }
};

const insertUserReading = async() => {

}

const getUserR

module.exports = {
    insertReading,
};