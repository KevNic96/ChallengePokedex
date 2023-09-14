import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PokemonContext } from '../context/PokemonContext'


export const Navigation = () => {

    const {onInputChange, valueSearch, onResetForm} = useContext(PokemonContext)

	const navigate = useNavigate()

	const onSearchSubmit = (e) => {
		e.preventDefault()
		navigate('/search', {
			state: valueSearch
		})

		onResetForm();
	}

  return(
    <>
        <header className='container'>

				<Link to='/' className='logo'>
					 <img
						src='https://camo.githubusercontent.com/7f1f1e69bef239378a28e8aca7d1d7bd0890d37a7871d01135e2d044da6e2157/68747470733a2f2f692e696d6775722e636f6d2f415975745a4f462e706e67'
						alt='Logo Pokedex'
					/>
				</Link>
                
				<form onSubmit={onSearchSubmit}>
					<div className='form-group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
						<input
							type='search'
							name='valueSearch'
							id=''
							value={valueSearch}
							onChange={onInputChange}
							placeholder='Buscar nombre de Pokémon'
						/>
					</div>

					<button className='btn-search'>Buscar</button>
				</form>
			</header>


        <Outlet />
    </>
    )
}
