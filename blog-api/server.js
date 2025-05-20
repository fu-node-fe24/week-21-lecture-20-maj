import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import keysRouter from './routes/keys.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

// Config
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// DB EmitEvents

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});