import express from 'express';
import { initializePassport } from './config/passport';
import { setAuthRoutes } from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
initializePassport();

// Routes
setAuthRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});