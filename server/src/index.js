import connectToMongo from './db.js';
connectToMongo();

import express, { json } from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://worknest-teams.vercel.app"
    ],
    credentials: true
}));
app.use(json());

app.get('/api/test', (req, res) => {
    res.send("server works!")
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log("Server listening on Port : ", port);
});

export default app;