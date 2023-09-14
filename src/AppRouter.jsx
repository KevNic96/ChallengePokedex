import React from 'react'
import { HomePage, PokemonPage, SearchPage } from './pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'

export const AppRouter = () => {
  return <Routes>
    <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage/>} />
        <Route path='pokemon/:id' element= {<PokemonPage/>}/>
        <Route path='search' element={<SearchPage/>} />
    </Route>

    <Route path='*' element={<Navigate to='/' />} />
    {/* Ruta para cuando no encuentre algo, redirecciona a otra pagina */}
  </Routes>
}

// Definimos las rutas de la aplicacion

//Definimos una ruta anidada

//Outlet porque vamos a poner el componente que se va a renderizar
// en todos los componentes, que va a ser Navigation (o Header)