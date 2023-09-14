import { useEffect, useState } from "react"
import { useForm } from "../hook/useForm"
import { PokemonContext } from "./PokemonContext"

export const PokemonProvider = ({children}) => { 

    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0); // useState para empezar del Pokemon N° 0 (Inicio).

    //Utilizar CustomHook - useForm para extraer
    const {valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    //Estados para la aplicacion simples
    const [loading, setLoading] = useState(true) //True porque siempre inicia cargando
    const [active, setActive] = useState(false) //Para el filtrado, al apretar el botón.

    // Llamar 50 pokemones a la API
    const getAllPokemons = async(limit = 50) => { //async para que devuelva una promesa
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json(); //Devuelve un diccionario de50 pokemones con el nombre y la url
        
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json() // Utilizamos el promise y map para recorrer la data y devolver la info mediante el fetch
            return data //Devuelve un array de promesas
        })

        const results = await Promise.all(promises) //Soluciona el array de promesas y devuelve la informacion correcta del pokemon

        setAllPokemons([
            ...allPokemons, //el spread(...) nos permite transformar un array en elementos únicos
            ...results
        ]);
        setLoading(false) //Para decir que ya cargó
    }

    //Llamar todos los pokemones

    const getGlobalPokemons = async() =>{ //Funcion para llamar a todos los pokemones para los casos de Búsqueda y Filtro.
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
        const data = await res.json();
        
        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)

        setGlobalPokemons(results);
        setLoading(false); //Para decir que ya cargó
    }

    //Llamar a un pokemon por ID

    const getPokemonByID = async(id) =>{
        const baseURL = 'https://pokeapi.co/api/v2/';
        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getAllPokemons()
    },[offset])

    useEffect(() =>{
        getGlobalPokemons()
    },[]) //No se comparte con getAllPokemons porque ese va a tener una dependencia, mientras que este va a tener una dependencia vacia.

    // BTN CARGAR MÁS

    const onClickLoadMore = () => {
        setOffset(offset + 50)
    }

    //FUNCION FILTRADO + State
    const [typeSelected, settypeSelected] = useState({
        grass: false,
        normal: false,
        fighting: false,
        flying: false,
        poison: false,
        ground: false,
        rock: false,
        bug: false,
        ghost: false,
        steel: false,
        fire: false,
        water: false,
        electric: false,
        psychic: false,
        ice: false,
        dragon: false,
        dark: false,
        fairy: false,
        unknow: false,
        shadow: false,
    })

    const [filteredPokemons, setfilteredPokemons] = useState([])

    const handleCheckbox = e =>{
        
        settypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        })

        if(e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon => 
                pokemon.types
                .map(type => type.type.name)
                .includes(e.target.name)
                );
            setfilteredPokemons([...filteredPokemons, ...filteredResults])
        } else {
            const filteredResults = filteredPokemons.filter(pokemon => 
                !pokemon.types
                .map(type => type.type.name)
                .includes(e.target.name)
                );
            setfilteredPokemons([...filteredResults])
        }

    }

    return (
        /*Todas las funciones que vamos a proveer a la app*/
        <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonByID,
            onClickLoadMore,
            //Loader
            setLoading,
            loading,
            //Btn Filter
            active,
            setActive,
            //Para filtrar
            handleCheckbox,
            filteredPokemons,
        }}>
            {children}
        </PokemonContext.Provider>
    )
}
