import React from "react";
import { v1 as uuid } from "uuid";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import { useAxios } from "./hooks";
import "./PokeDex.css";

/* Function to format Pokemon card data */
const formatPokemonCard = (data) => ({
  id: uuid(),
  front: data.sprites.front_default,
  back: data.sprites.back_default,
  name: data.name,
  stats: data.stats.map(stat => ({
    value: stat.base_stat,
    name: stat.stat.name
  }))
});

function PokeDex() {
  const [pokemon, addPokemon, clearPokemon] = useAxios("https://pokeapi.co/api/v2/pokemon/", formatPokemonCard);

  const handleAddPokemon = async (name) => {
    await addPokemon(name);
  };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={handleAddPokemon} />
        <button onClick={clearPokemon}>Clear all pokemon cards</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;


