import { AppRouter } from "./AppRouter";
import { PokemonProvider } from "./context/PokemonProvider";

function App () {
  return (
    /*Utilizamos el Provider en la parte alta de la app*/
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  )
}

export default App;