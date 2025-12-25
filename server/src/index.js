const connectToMongo = require('./db.js');
connectToMongo();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//importing files


app.get('/api/test', (req, res) => {
    res.send("server works!")
});

app.use('/api/auth', authRoutes);


app.listen(port, () => {
    console.log("Server listening on Port : ", port);
});

module.exports = app;