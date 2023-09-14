import { createContext } from "react";

export const PokemonContext = createContext()

/*Utilizamos Pokemon Context para pasar una serie de valores,
variables, funciones o datos de un provider a  todos aquellos
componentes en los que lo que necesitemos (un consumidor intermediario).
Es decir, deberemos insertar un useContext en React en aquellos
componentes. */