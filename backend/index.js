const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.status(200).send('Backend up and running!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

