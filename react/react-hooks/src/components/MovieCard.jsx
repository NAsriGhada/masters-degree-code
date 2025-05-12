function MovieCard({ movie }) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src={movie.posterURL} className="card-img-top" alt={movie.title} />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.description}</p>
        <span className="badge bg-primary">⭐ {movie.rating}</span>
      </div>
    </div>
  );
}

export default MovieCard;
