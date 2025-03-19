import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Отримуємо параметр з URL
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Додаємо стан для контролю пошуку

  useEffect(() => {
    if (!query) return; // Якщо немає запиту, не виконуємо запит до API

    setIsSearching(true); // Починаємо пошук
    searchMovies(query)
      .then(setMovies)
      .finally(() => setIsSearching(false)); // Завершуємо пошук
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newQuery = form.elements.search.value.trim();
    if (newQuery === "") return;

    setSearchParams({ query: newQuery }); // Оновлюємо URL
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
      {isSearching === false && query !== "" && movies.length === 0 && (
        <p>No results found</p>
      )}
    </>
  );
}
