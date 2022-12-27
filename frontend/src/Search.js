import { useState, useEffect } from 'react';
import axios from 'axios';
import errorfunction from './error';
import { ReactComponent as Svg } from './images/loader.svg';
import './Search.css';
export default function Search() {
  const [searchType, setSearchType] = useState('id');
  const [Display, setDisplay] = useState(<></>);
  const [displaydata, setDisplayData] = useState(null);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);
  const [loader, setLoader] = useState(false);

  const setData = (pokemon) => {
    if (Array.isArray(pokemon)) {
      const mappedData = pokemon.map((mon) => {
        return (
          <div className='idMain' key={mon.ID}>
            <div className='dexPicture'>
              <img src={mon.imgurl} alt={mon.name}></img>
            </div>
            <div className='dataBox'>
              {' '}
              <h1>
                No. {mon.ID} - {mon.name.toUpperCase()}
              </h1>
              {mon.secondarytyping ? (
                <h2>
                  {mon.primarytyping.toUpperCase()}/
                  {mon.secondarytyping.toUpperCase()}
                </h2>
              ) : (
                <h2>{mon.primarytyping.toUpperCase()}</h2>
              )}
              <p>{mon.description}</p>
              {mon.weight == null
                ? mon.height == null
                  ? `The weight and height for this Pokémon are unknown`
                  : `The weight for this pokémon is ${mon.weight} KG and it's ${mon.height} meters tall!`
                : mon.height == null
                ? `This Pokémon weighs ${mon.weight} kilograms and it's height is unknown`
                : `The weight for this pokémon is ${mon.weight} KG and it's ${mon.height} meters tall!`}
            </div>
          </div>
        );
      });
      setDisplayData(mappedData);
    } else {
      setDisplayData(
        <div className='idMain'>
          <div className='dexPicture'>
            <img src={pokemon.imgurl} alt={pokemon.name}></img>
          </div>
          <div className='dataBox'>
            {' '}
            <h1>
              No. {pokemon.ID} - {pokemon.name.toUpperCase()}
            </h1>
            {pokemon.secondarytyping ? (
              <h2>
                {pokemon.primarytyping.toUpperCase()}/
                {pokemon.secondarytyping.toUpperCase()}
              </h2>
            ) : (
              <h2>{pokemon.primarytyping.toUpperCase()}</h2>
            )}
            <p>{pokemon.description}</p>
            {pokemon.weight == null
              ? pokemon.height == null
                ? `The weight and height for this Pokémon are unknown`
                : `The weight for this pokémon is ${pokemon.weight} KG and it's ${pokemon.height} meters tall!`
              : pokemon.height == null
              ? `This Pokémon weighs ${pokemon.weight} kilograms and it's height is unknown`
              : `The weight for this pokémon is ${pokemon.weight} KG and it's ${pokemon.height} meters tall!`}
          </div>
        </div>,
      );
    }
  };
  useEffect(() => {
    //getById returns only one
    const getById = async (e) => {
      e.preventDefault();
      await axios
        .get(`https://pokedex-api-88gv.onrender.com/api/pokemon/${id}`)
        .then((res) => {
          setLoader(true);
          setData(res.data);
        })
        .then(() => {
          setLoader(false);
        })
        .catch((error) => {
          errorfunction(error);
        });
    };
    const getByName = async (e) => {
      e.preventDefault();
      await axios
        .get(
          `https://pokedex-api-88gv.onrender.com/api/pokemon/name/${name.toLowerCase()}`,
        )
        .then((res) => {
          setData(res.data[0]);
        })
        .then(() => {})
        .catch((error) => {
          errorfunction(error);
        });
    };
    const getByHeight = async (e) => {
      e.preventDefault();

      await axios
        .get(
          `https://pokedex-api-88gv.onrender.com/api/pokemon/height/${min}&${max}`,
        )
        .then((res) => {
          setData(res.data);
        })
        .then(() => {})
        .catch((error) => {
          errorfunction(error);
        });
    };
    const getByWeight = async (e) => {
      e.preventDefault();

      await axios
        .get(
          `https://pokedex-api-88gv.onrender.com/api/pokemon/weight/${min}&${max}`,
        )
        .then((res) => {
          setData(res.data);
        })
        .then(() => {})
        .catch((error) => {
          errorfunction(error);
        });
    };

    switch (searchType) {
      case 'id':
        setDisplay(
          <div className='displayBox'>
            <form
              onSubmit={(e) => {
                getById(e);
              }}
            >
              <label>Please enter the ID</label>
              <input
                type={'number'}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></input>
              <input type={'submit'} value='Search!'></input>
            </form>
          </div>,
        );
        break;
      case 'name':
        setDisplay(
          <div className='displayBox'>
            <form
              onSubmit={(e) => {
                getByName(e);
              }}
            >
              <label>Please enter the name</label>
              <input
                type={'text'}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <input type={'submit'} value='Search!'></input>
            </form>
          </div>,
        );
        break;
      case 'height':
        setDisplay(
          <div className='displayBox'>
            <form
              onSubmit={(e) => {
                getByHeight(e);
              }}
            >
              <label>Min. Meters</label>
              <input
                type={'number'}
                step='0.01'
                placeholder={min}
                onChange={(e) => {
                  setMin(e.target.value);
                }}
              ></input>
              <br></br>
              <label>Max. Meters</label>
              <input
                type={'number'}
                step='0.01'
                placeholder={max}
                onChange={(e) => {
                  setMax(e.target.value);
                }}
              ></input>
              <br></br>
              <input type={'submit'} value='Search!'></input>
            </form>
          </div>,
        );
        break;
      case 'weight':
        setDisplay(
          <div className='displayBox'>
            <form
              onSubmit={(e) => {
                getByWeight(e);
              }}
            >
              <label>Min. KG</label>
              <input
                type={'number'}
                placeholder={min}
                step='0.01'
                onChange={(e) => {
                  setMin(parseFloat(e.target.value));
                }}
              ></input>
              <br></br>
              <label>Max. KG</label>
              <input
                type={'number'}
                step='0.01'
                placeholder={max}
                onChange={(e) => {
                  setMax(parseFloat(e.target.value));
                }}
              ></input>
              <br></br>
              <input type={'submit'} value='Search!'></input>
            </form>
          </div>,
        );
        break;
      default:
        break;
    }
  }, [searchType, id, name, min, max]);

  return !displaydata ? (
    <>
      <div className='searchBox'>
        <div className='selection'>
          <label>Search method:</label>
          <select
            value={searchType}
            onChange={(eventObject) => {
              setSearchType(eventObject.target.value);
              setDisplayData(null);
            }}
          >
            <option value={'id'}>ID</option>
            <option value={'name'}>Name</option>
            <option value={'height'}>Height range</option>
            <option value={'weight'}>Weight range</option>
          </select>
        </div>
        {Display}
      </div>
    </>
  ) : (
    <div>
      <div className='searchBox'>
        <div className='selection'>
          <label>Search method:</label>
          <select
            value={searchType}
            onChange={(eventObject) => {
              setSearchType(eventObject.target.value);
              setDisplayData(null);
            }}
          >
            <option value={'id'}>ID</option>
            <option value={'name'}>Name</option>
            <option value={'height'}>Height range</option>
            <option value={'weight'}>Weight range</option>
          </select>
        </div>
        {Display}
      </div>

      {loader ? <Svg></Svg> : displaydata}
    </div>
  );
}
