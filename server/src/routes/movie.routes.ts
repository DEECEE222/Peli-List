import { Router } from 'express';
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from '../controllers/movie.controller';

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
