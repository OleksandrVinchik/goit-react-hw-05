import { useEffect, useState } from "react";
import { useParams, Link, useLocation, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import styles from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovieData);
  }, [movieId]);

  if (!movieData) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backButton}>
        Go back
      </Link>

      <div className={styles.movieDetails}>
        <img
          src={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
              : defaultImg
          }
          width={250}
          alt={movieData.title || "Movie poster"}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movieData.title}</h1>
          <p className={styles.overview}>{movieData.overview}</p>
          <h2 className={styles.subTitle}>Additional Information</h2>
          <ul className={styles.links}>
            <li>
              <Link
                to="cast"
                state={{ from: backLink }}
                className={styles.link}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                state={{ from: backLink }}
                className={styles.link}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
