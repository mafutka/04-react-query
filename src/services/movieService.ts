
import axios from 'axios';
import type { Movie } from '../types/movie';

interface ResponseMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Сервіс TMDB підтримує пагінацію, для цього вам потрібно передати у http-запиті 
// додатково параметр page.

// Тепер у відповідь бекенда вас буде цікавити не лише властивість results, 
// а і total_page. Тому не забудьте оновити інтерфейс для типізації відповіді з бекенду.

// Для відображення елементів пагінації використовуйте біліотеку React Paginate. 
// Зверніть увагу, що вона містить готовий компонент пагінації, але без стилів. 
// Тому додайте підготовлені нами стилі для неї у файл App.module.css:

const BASE_URL = 'https://api.themoviedb.org/3';
const myToken = import.meta.env.VITE_TMDB_API_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<ResponseMovie>(`${BASE_URL}/search/movie`, {
    params: { 
      query,
      language: 'en-US',
      include_adult: false,
},
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data.results;
};
