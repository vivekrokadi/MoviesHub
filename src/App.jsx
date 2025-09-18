import React from 'react'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import { Route, Routes } from 'react-router-dom'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/movie/:id' element={ <MovieDetails/> } />
        <Route path='/favorites' element={ <Favorites/>} />
      </Routes>
    </div>
  )
}

export default App