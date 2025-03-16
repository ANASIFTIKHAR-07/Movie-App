import React from 'react'

const Search = (props) => { // As i know another method to use the props is to desstructure the props
  return (
    <div className='search'>
        <div>
            <img src="/src/assets/search.svg" alt="search" />
            <input type="text" 
            placeholder='Search for movies or TV series'
            value={props.searchTerm}
            onChange={(e) => props.setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search