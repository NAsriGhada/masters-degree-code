import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src={movie.posterURL} className="card-img-top" alt={movie.title} />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p>{movie.description.substring(0, 60)}...</p>
        <span className="badge bg-primary">⭐ {movie.rating}</span>
        <div className="mt-2">
          <Link
            to={`/movie/${movie.title}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
