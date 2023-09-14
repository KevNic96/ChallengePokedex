import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { primerMayuscula } from '../helper/helper'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router-dom'


export const PokemonPage = () => {

  const {getPokemonByID} = useContext(PokemonContext)

  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})

  const {id} = useParams()

  const fetchPokemon = async(id) => {
    const data = await getPokemonByID(id)
    setPokemon(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon(id)
  }, [])

  return (
    <main className='container main-pokemon'>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{primerMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{primerMayuscula(type.type.name)}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>{pokemon.height * 1/10} Mts</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokemon.weight /10 } Kg</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h1>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>HP</span>
								<div className='progress-bar' id='hp'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Ataque</span>
								<div className='progress-bar' id='ataque'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defensa</span>
								<div className='progress-bar' id='defensa'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Velocidad</span>
								<div className='progress-bar' id='vel'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Ataque Especial</span>
								<div className='progress-bar' id='ata-esp'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defensa Especial</span>
								<div className='progress-bar' id='def-esp'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							

							<div className='stat-group'>
								<span>Habilidad</span>
								
								<h3 className='ability'>
								{primerMayuscula(pokemon.abilities[0].ability.name)}
								</h3>
								<h3 className='ability'>
								{primerMayuscula(pokemon.abilities[1].ability.name)}
								</h3>
							</div>
						</div>
					</div>
          </>
        )
      }
    </main>
  )
}
