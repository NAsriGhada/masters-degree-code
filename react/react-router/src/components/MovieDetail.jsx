import { useParams, Link } from "react-router-dom";

function MovieDetail({ movies }) {
  const { title } = useParams();
  const movie = movies.find((m) => m.title === title);

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div className="my-5">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <div className="ratio ratio-16x9 my-4">
        <iframe
          src={movie.trailerLink}
          title={movie.title}
          allowFullScreen
        ></iframe>
      </div>
      <Link to="/" className="btn btn-secondary">
        ← Back to Home
      </Link>
    </div>
  );
}

export default MovieDetail;
