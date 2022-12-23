import './Main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as Svg } from './images/loader.svg';
const egg = require('./images/egg.png');

export default function Main() {
  const [AllPokemon, setAllPokemon] = useState(null);
  const [AllImages, setAllImages] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [infoID, setInfoID] = useState(0);
  const url = 'https://pokedex-api-88gv.onrender.com/api/pokemon/';

  // background-size: 40px 40px;
  // Initial fetch
  useEffect(() => {
    const onDexClick = (id) => {
      setInfoID(id);
      setShowInfo(!showInfo);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        /* you can also use 'auto' behaviour
         in place of 'smooth' */
      });
    };
    const fetchAll = () => {
      axios.get(url).then(async (res) => {
        let pokemon = res.data.map((pokemon) => {
          return (
            <div className={`dexEntry`} key={pokemon.ID}>
              <button
                className='dexData'
                onClick={() => {
                  onDexClick(pokemon);
                }}
              >
                <img src={egg} alt='Pokemon egg'></img>
                <h1>No {pokemon.ID}</h1>
                <h1>{pokemon.name.toUpperCase()}</h1>
              </button>
            </div>
          );
        });
        let pictures = res.data.map((pokemon) => {
          return (
            <div className={`dexPicture`} key={pokemon.ID}>
              <img src={pokemon.imgurl} alt={`Pokemon ${pokemon.name}`}></img>
            </div>
          );
        });

        setAllPokemon(pokemon);
        setAllImages(pictures);
      });
    };
    fetchAll();
  }, [showInfo]);

  const closePopUp = () => {
    setShowInfo(false);
  };

  return AllPokemon ? (
    showInfo ? (
      <InfoBox pokemon={infoID} clickhandler={closePopUp}></InfoBox>
    ) : (
      <div className='Main'>
        <div className='titleWrapper'>
          <div className='pokedex-title'>
            <h1>POKÉDEX</h1>
          </div>
        </div>
        <div className='dex'>
          <div className='dexImagesBox'>{AllImages}</div>
          <div className='dexEntriesBox'>{AllPokemon}</div>
        </div>
      </div>
    )
  ) : (
    <div className='Main'>
      <Svg></Svg>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Fetching the Pokémon...
      </h1>
    </div>
  );
}

function InfoBox(props) {
  const clickhandler = props.clickhandler;
  const pokemon = props.pokemon;
  const img = pokemon.imgurl;

  return (
    <div className='infoBackground'>
      <button
        onClick={() => {
          clickhandler();
        }}
      >
        <span className='material-symbols-outlined'>arrow_back</span>
      </button>
      <div className={`dexPicture`} key={pokemon.ID}>
        {img ? (
          <img src={pokemon.imgurl} alt={`Pokemon ${pokemon.name}`}></img>
        ) : (
          <Svg></Svg>
        )}
      </div>
      <div className='infoBox'>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <p>{pokemon.description}</p>
        <div className='heightAndWeight'>
          <h2>
            This Pokémon weighs {pokemon.weight} kilograms and is{' '}
            {pokemon.height} meters tall!
          </h2>
        </div>
      </div>
    </div>
  );
}
