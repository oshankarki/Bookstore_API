const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const { spawn } = require('child_process');

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000;
const dbConn = require('./app/config/db');
dbConn();
const cors = require('cors');

app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use(fileUpload());
app.use(cors());

const userRoutes = require('./app/routes/route.user');
const authRoutes = require('./app/routes/route.auth');




app.use('/api/house', authRoutes);
app.use('/api/house/user', userRoutes);

const verifyJWT = require('./app/middlewares/verifyJWT');
app.use(verifyJWT);
app.post('/api/house/predict', async(req, res) => {
    console.log("Received data from frontend:", req.body);

    const data = {};
    for (let key in req.body) {
        data[key] = parseInt(req.body[key], 10);
    }
    console.log(JSON.stringify(data))
    const pythonProcess = spawn('python', ['/Users/oshankarki/Downloads/HousePrice/backend/app/predict/pr.py', [JSON.stringify(data)]]);

    pythonProcess.stdout.on('data', (data) => {
        const predictedPrice = parseFloat(data.toString());
        res.json({ predictedPrice });
    });

    // pythonProcess.stderr.on('data', (data) => {
    //     console.error(`Error: ${data.toString()}`);
    //     res.status(500).json({ message: 'Internal server error' });
    // });
});








app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});