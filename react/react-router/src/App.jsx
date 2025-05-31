import { useState } from "react";
import moviesData from "./assets/data/movies.json";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import MovieDetail from "./components/MovieDetail"; // new component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterRate, setFilterRate] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
    trailerLink: "", // Add trailer field if you want to input it
  });

  const handleAddMovie = () => {
    setMovies([...movies, { ...newMovie, rating: Number(newMovie.rating) }]);
    setNewMovie({
      title: "",
      description: "",
      posterURL: "",
      rating: "",
      trailerLink: "",
    });
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      movie.rating >= filterRate
  );

  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center mb-4">🎬 My Movie App</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filter
                  filterTitle={filterTitle}
                  setFilterTitle={setFilterTitle}
                  filterRate={filterRate}
                  setFilterRate={setFilterRate}
                />

                <div className="card p-3 my-4">
                  <h5>Add a New Movie</h5>
                  <div className="row g-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={newMovie.title}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={newMovie.description}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Poster URL"
                        value={newMovie.posterURL}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            posterURL: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rating"
                        value={newMovie.rating}
                        min="1"
                        max="10"
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, rating: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-1">
                      <button
                        className="btn btn-success w-100"
                        onClick={handleAddMovie}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <MovieList movies={filteredMovies} />
              </>
            }
          />

          <Route
            path="/movie/:title"
            element={<MovieDetail movies={movies} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
