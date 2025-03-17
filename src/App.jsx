import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3' 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY  

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('') 

  const [errorMessage, setErrorMessage] = useState('')


  const fetchMovies = async () => {
    try {
      const endpoint =` ${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data) 
      
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('An error occurred while fetching movies.')
    } 
  }
  
  useEffect(()=> {
    fetchMovies()
  }, [])  
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
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All movies</h2> 

          {errorMessage && <p className="error-message">{errorMessage}</p>} 
        </section>
      </div>
    </main>
  );
};

export default App;
