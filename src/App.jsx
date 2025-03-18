import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
import Spinner from "./components/spinner.jsx"
import MovieCard from "./components/MovieCard.jsx"
import {useDebounce} from 'react-use'

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() =>   setDebouncedSearchTerm(searchTerm) , 500, [searchTerm])



  const fetchMovies = async (query = '') => {

    setIsLoading(true)
    setErrorMessage('')
    // setMovies([])

    try {
      const endpoint = query 
      ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :  `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'An error occurred while fetching movies.')
        setMovies([])
        return
      }

      setMovies(data.results)


    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('An error occurred while fetching movies.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  return (
    <main>
      <div className="pattern " />

      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> That You'll Enjoy
            Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>
          {isLoading ? (
           <Spinner />
          ) :
          errorMessage?(
            <p className="text-red-500"> {errorMessage} </p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
