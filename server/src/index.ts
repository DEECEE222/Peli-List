import express from 'express';
import cors from 'cors';
import { config } from './config';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import movieRoutes from './routes/movie.routes';

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());
app.use(logger);

app.get('/', (_req, res) => res.json({ name: 'Peli-List API', status: 'ok' }));
app.use('/api/movies', movieRoutes);
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✓ Peli-List API corriendo en http://localhost:${config.port}`);
});
