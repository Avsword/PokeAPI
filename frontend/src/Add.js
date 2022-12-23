import './Add.css';
import { useState } from 'react';
import axios from 'axios';
const url = 'https://pokedex-api-88gv.onrender.com/api/pokemon';
export default function Add() {
  const [imgPreview, setImgPreview] = useState(
    'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite000None.png?raw=true'
  );
  const [description, setDescription] = useState('Add your description here');
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [primaryTyping, setPrimaryTyping] = useState('normal');
  const [secondaryTyping, setSecondaryTyping] = useState(null);
  const typings = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Flying',
    'Fighting',
    'Poison',
    'Electric',
    'Ground',
    'Rock',
    'Psychic',
    'Ice',
    'Bug',
    'Ghost',
    'Steel',
    'Dragon',
    'Dark',
    'Fairy',
  ];

  const submit = async (e) => {
    e.preventDefault();
    const newPokemon = {
      ID: parseInt(id),
      name: name.toLowerCase(),
      imgurl: imgPreview,
      description: description,
      primarytyping: primaryTyping,
      secondarytyping: secondaryTyping === '' ? null : secondaryTyping,
      height: height,
      weight: weight,
    };

    await axios
      .post(url, newPokemon)
      .then((res) => {
        console.log(res);
        if ((res.status = 201)) {
          alert(`${name} has been registered to your Pokédex!`);
          window.location.reload(false);
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
  return (
    <div className='addNewPokemon'>
      <div className='mainTextWrapper'>
        <div className='addMainText'>
          <h1>POKÉDEX registration!</h1>
          <p>
            For pictures, go to{' '}
            <a
              href='https://github.com/Skeli789/Dynamic-Pokemon-Expansion/tree/master/graphics/pokeicon'
              target='_blank'
              rel='noopener noreferrer'
            >
              this repository
            </a>
            <br></br>or choose your own!
          </p>
        </div>
      </div>
      <br></br>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <div className='addMainBox'>
          <>
            <img
              src={imgPreview}
              className='imagePreview'
              alt='a presentation of the url'
            ></img>
            <input
              className='imageInput'
              type={'link'}
              placeholder={imgPreview}
              onChange={(e) => {
                setImgPreview(e.target.value);
              }}
            ></input>
          </>

          <div className='idField'>
            <label>No. </label>
            <input
              required
              type={'text'}
              onChange={(e) => {
                setId(e.target.value);
              }}
            ></input>
          </div>

          <div className='textField'>
            <label>Name</label>
            <input
              required
              type={'text'}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className='primaryTyping'>
            <label>1. Typing </label>
            <select
              required
              value={primaryTyping}
              onChange={(eventObject) => {
                setPrimaryTyping(eventObject.target.value);
              }}
            >
              {typings.map((type, i) => {
                return (
                  <option key={i} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='secondaryTyping'>
            <label>2. Typing </label>
            <select
              value={secondaryTyping}
              onChange={(eventObject) => {
                setSecondaryTyping(eventObject.target.value);
              }}
            >
              <option value={''}>None</option>
              {typings.map((type, i) => {
                return (
                  <option key={i} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='addHeightAndWeight'>
            <div className='height'>
              <label>Height in meters</label>
              <input
                placeholder='Unknown'
                type={'text'}
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              ></input>
            </div>
            <div className='weight'>
              {' '}
              <label>Weight in KG</label>
              <input
                placeholder='Unknown'
                type={'text'}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className='addDescription'>
          <textarea
            className='descriptionTextArea'
            placeholder={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <div className='submit'>
          <input type={'submit'} value='Register!'></input>
        </div>
      </form>
    </div>
  );
}
