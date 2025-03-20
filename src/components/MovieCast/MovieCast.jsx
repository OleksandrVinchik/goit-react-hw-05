import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.id} className={styles.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : defaultImg
                }
                width={100}
                alt={actor.name || "Actor"}
                className={styles.image}
              />
              <p className={styles.name}>
                <strong>{actor.name}</strong> as {actor.character}
              </p>
            </li>
          ))
        ) : (
          <p className={styles.noCast}>No cast information available.</p>
        )}
      </ul>
    </div>
  );
}
