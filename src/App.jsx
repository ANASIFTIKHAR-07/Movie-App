import React, { useState } from "react";
import Search from "./components/Search.jsx";

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')  
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
