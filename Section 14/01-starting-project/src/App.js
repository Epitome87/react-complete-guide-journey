import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Our Firebase API
  const url =
    'https://react-http-b5854-default-rtdb.firebaseio.com/movies.json';

  const fetchMoviesHandler = useCallback(async () => {
    // Signal that we are beginning to load
    setIsLoading(true);

    // Clear any previous errors we may have gotten
    setError(null);

    try {
      // Fetch returns a Promise that will return a response
      // const url = "https://swapi.dev/api/films";
      const response = await fetch(url);

      // Check if errors, before trying to parse the response
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      console.log('ERROR: ', error.message);
    }

    // Signal that we are done loading
    setIsLoading(false);
  }, []);

  // const fetchMoviesHandler = useCallback(async () => {
  //   // Signal that we are beginning to load
  //   setIsLoading(true);

  //   // Clear any previous errors we may have gotten
  //   setError(null);

  //   try {
  //     // Fetch returns a Promise that will return a response
  //     // const url = "https://swapi.dev/api/films";
  //     const response = await fetch(url);

  //     // Check if errors, before trying to parse the response
  //     if (!response.ok) {
  //       throw new Error('Something went wrong!');
  //     }

  //     const data = await response.json();

  //     // Transform the APIs data to match our Movie.js structure
  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       };
  //     });

  //     setMovies(transformedMovies);

  //     // Signal that we are done loading
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     console.log('ERROR: ', error.message);
  //   }

  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    console.log(movie);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(movie), // We want JSON format
      headers: {
        'Content-Type': 'application/json', // Firebase doesn't require this, but a lot of APIs do
      },
    });
    const data = await response.json();
    fetchMoviesHandler();
  }

  let content = <p>Found no movies.</p>;

  // Build our content based on state
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
