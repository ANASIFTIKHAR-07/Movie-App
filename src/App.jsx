import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3' 
const API_KEY = process.env.REACT_APP_TMDB_API_KEY

const App = () => {

  const [searchTerm, setSearchTerm] = useState('') 
  
  useEffect(()=> {

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
      </div>
    </main>
  );
};

export default App;
