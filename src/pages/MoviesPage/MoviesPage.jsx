import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsSearching(true);
    searchMovies(query)
      .then(setMovies)
      .finally(() => setIsSearching(false));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newQuery = form.elements.search.value.trim();
    if (newQuery === "") return;

    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="search"
          defaultValue={query}
          className={styles.input}
          placeholder="Search for a movie..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
      {isSearching === false && query !== "" && movies.length === 0 && (
        <p>No results found</p>
      )}
    </div>
  );
}
