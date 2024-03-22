import { useState } from "react";
import Axios from "axios";


function App() {

  const [pokemonName, setPokemonName] = useState(""); 
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState({
            name: "", 
            species: "", 
            img: "", 
            hp: "",
            attack: "",
            defense: "",
            type: "",
  })
  
  const searchPokemon = () => {
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
        setPokemon(
          {
            name: pokemonName, 
            species: response.data.species.name, 
            img: response.data.sprites.front_default, 
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
          }
          );
          setPokemonChosen(true)
      })
  }

  addEventListener("keypress",(e) =>{
    if(e.keyCode === 13){
      document.getElementById("srchBtn").click()
    }
  })


  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-r from-slate-900 to-slate-800 flex flex-col ">

        

        <div className=" h-1/3 w-screen content-center flex  justify-center items-center bg-gray-600 bg-opacity-10 shadow-lg flex-col">

            <div className=" font-mono text-5xl text-gray-400 mb-14">
              Pokemon Stats
            </div>
            
            <div>
            <input type="text" placeholder="Enter Pokemon..." className=" h-9 w-80 rounded-lg text-center text-white bg-gray-400 bg-opacity-10 shadow-xl" onChange={(event) => {setPokemonName(event.target.value)}} />
            
            <button className=" mx-4 p-2 bg-gray-600 text-white font-mono bg-opacity-25 rounded-lg shadow-xl active:scale-95 active:text-gray-500 transition-all text-sm" onClick={searchPokemon} id="srchBtn">Search</button>
            </div>
            
            
        </div>

        <div className=" h-2/3 w-screen flex justify-center items-center">
          {
          !pokemonChosen ? (<h1 className=" font-mono text-gray-400 font-extrabold text-3xl ">Please Choose A Pokemon!</h1>): (
          <>
          <div className="  flex flex-col justify-center text-center bg-gray-600 bg-opacity-20 rounded-xl h-auto w-auto items-center shadow-2xl">

          <img src={pokemon.img} className=" h-36  rounded-full my-5 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl"/>
          
          <h1 className=" mb-5 font-mono font-extrabold text-4xl mx-16 text-white">{pokemon.name}</h1>

          
          <h3 className=" text-gray-400 font-mono font-bold text-md">Species: {pokemon.species}</h3>

          <h3 className=" text-gray-400 font-mono font-bold text-md">Type: {pokemon.type}</h3>

          <h4 className=" text-gray-400 font-mono font-bold text-md">HP: {pokemon.hp}</h4>

          <h4 className=" text-gray-400 font-mono font-bold text-md">Attack: {pokemon.attack}</h4>

          <h4 className=" text-gray-400 font-mono font-bold text-md mb-5">Defense: {pokemon.defense}</h4>

          </div>
          </>
          ) 
          }
        </div>

      </div>
    </>
  )
}

export default App
