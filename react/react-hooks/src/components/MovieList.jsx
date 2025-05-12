import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
