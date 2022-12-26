import './Main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as Svg } from './images/loader.svg';
import Edit from './Edit';

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
                <h1>
                  No.{pokemon.ID} {pokemon.name.toUpperCase()}
                </h1>
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
  const [showEdit, setShowEdit] = useState(false);

  const release = async (pokemon) => {
    axios
      .delete(`https://pokedex-api-88gv.onrender.com/api/pokemon/${pokemon.ID}`)
      .then((res) => {
        if (res.status === 200) {
          alert(`${pokemon.name} has been released`);
          clickhandler();
        }
      })
      .catch((err) => {
        console.error('Error response:');
        console.error(err.response.data); // ***
        console.error(err.response.status); // ***
        console.error(err.response.headers); // ***
        alert(
          'Something went wrong with the request, check the fields again and see the console for more details'
        );
      });
  };

  return !showEdit ? (
    <div className='infoBackground'>
      <button
        className='backButton'
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
        {pokemon.secondarytyping ? (
          <h2>
            {pokemon.primarytyping.toUpperCase()}/
            {pokemon.secondarytyping.toUpperCase()}
          </h2>
        ) : (
          <h2>{pokemon.primarytyping.toUpperCase()}</h2>
        )}
        <button
          className='editButton'
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        >
          <span className='material-symbols-outlined'>edit</span>
        </button>
        <p>{pokemon.description}</p>
        <div className='heightAndWeight'>
          <h2>
            {pokemon.weight == null
              ? pokemon.height == null
                ? `The weight and height for this Pokémon are unknown`
                : `The weight for this pokémon is ${pokemon.weight} KG and it's ${pokemon.height} meters tall!`
              : pokemon.height == null
              ? `This Pokémon weighs ${pokemon.weight} kilograms and it's height is unknown`
              : `The weight for this pokémon is ${pokemon.weight} KG and it's ${pokemon.height} meters tall!`}
          </h2>
        </div>
      </div>
      <div className='releaseButton'>
        <button
          onClick={() => {
            release(pokemon);
          }}
        >
          Release?
        </button>
      </div>
    </div>
  ) : (
    <Edit pokemon={pokemon} handleBack={clickhandler}></Edit>
  );
}
