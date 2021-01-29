import { combineReducers } from 'redux';
import PokemonListReducer from './pokemonListReducer';
import PokemonMultipleReducer from './pokemonMultipleReducer';

const RootReducer = combineReducers({
	PokemonList: PokemonListReducer,
	Pokemon: PokemonMultipleReducer,
});

export default RootReducer;
