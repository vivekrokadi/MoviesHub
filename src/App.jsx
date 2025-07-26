import React from 'react'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/movie/:id' element={ <MovieDetails/> } />
      </Routes>
    </div>
  )
}

export default App