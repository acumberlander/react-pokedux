import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getPokemonList } from '../actions/pokemonActions';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {
	const [search, setSearch] = useState();
	const dispatch = useDispatch();
	const pokemonList = useSelector((state) => state.PokemonList);

	useEffect(() => {
		fetchData(1);
	}, []);

	const fetchData = (page = 1) => {
		dispatch(getPokemonList(page));
	};

	const showData = () => {
		if (pokemonList.loading) {
			return <p>Loading...</p>;
		}

		if (!_.isEmpty(pokemonList)) {
			return pokemonList.data.map((pokemon) => (
				<div className="list-wrapper">
					<div className="pokemon-item">
						<p>{pokemon.name}</p>
						<Link to={`/pokemon/${pokemon.name}`}>View</Link>
					</div>
				</div>
			));
		}

		if (pokemonList.errorMsg !== '') {
			return <p>{pokemonList.errorMsg}</p>;
		}

		return <p>unable to get data</p>;
	};
	return (
		<div>
			<div className="search-wrapper">
				<p>Search: </p>
				<input type="text" onChange={(e) => setSearch(e.target.value)} />
				<button onClick={() => props.history.push(`/pokemon/${search}`)}>
					Search
				</button>
			</div>
			{showData()}
			{!_.isEmpty(pokemonList.data) && (
				<ReactPaginate
					pageCount={Math.ceil(pokemonList.count / 15)}
					pageRangeDisplayed={2}
					marginPagesDisplayed={1}
					onPageChange={(data) => fetchData(data.selected + 1)}
					containerClassName="pagination"
				/>
			)}
		</div>
	);
};

export default PokemonList;
