import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  );
}
