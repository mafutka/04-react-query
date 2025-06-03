
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { useQuery } from '@tanstack/react-query';

 

export default function App() {

  const { data, error: queryError, isLoading } = useQuery({
    queryKey: ['chosenmovie'],
    queryFn: fetchMovies,

  })

  console.log(data);
  

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        setMovies([]);
        return;
      }

      setMovies(results);
    } catch {
      toast.error('Something went wrong!');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

   const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie); 
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); 
  };

//   Для збереження колекції відповідей від бекенда та керування станом запитів 
// використовуйте бібліотеку TanStack Query.

// Необхідно зробити рефакторинг логіки отримання і збереження фільмів, 
// а також відповідних станів. 
// Не забудь, що налаштування роботи клієнта react-query потрібно робити на верхньому рівні, 
// тобто у файлі src/main.tsx, а використовувати відповідні хуки безпосередньо в тому компоненті, 
// де необхідна обробка отриманих даних – у нашому випадку, у компоненті App.

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>...is loading</p>}
      {loading && <Loader />}
      {queryError && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
