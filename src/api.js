// import axios from "axios";

// const API_KEY =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjY3ZjE1ODlkN2JkOTQ1M2MyZjc5MzM2MjQ2MTVjNSIsIm5iZiI6MTc0MjI0MzIyNy44NjYsInN1YiI6IjY3ZDg4NTliNWFkZGYyMDk1NWYxODdiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuYCalnR3e5Jx90jvTpDnTMfH1un5s3SfYBSJmOT_P4";
// const BASE_URL = "https://api.themoviedb.org/3";

import axios from "axios";

const API_KEY = "7f67f1589d7bd9453c2f7933624615c5";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};
