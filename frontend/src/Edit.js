import './Add.css';
import { useState } from 'react';
import axios from 'axios';

export default function Edit(props) {
  const mon = props.pokemon;
  const back = props.handleBack;
  const url = `https://pokedex-api-88gv.onrender.com/api/pokemon/`;
  const [imgPreview, setImgPreview] = useState(mon.imgurl);
  const [description, setDescription] = useState(mon.description);
  const [id, setId] = useState(mon.ID);
  const [name, setName] = useState(
    mon.name.charAt(0).toUpperCase() + mon.name.slice(1)
  );
  const [height, setHeight] = useState(mon.height);
  const [weight, setWeight] = useState(mon.weight);
  const [primaryTyping, setPrimaryTyping] = useState(
    mon.primarytyping.charAt(0).toUpperCase() + mon.primarytyping.slice(1)
  );
  const [secondaryTyping, setSecondaryTyping] = useState(
    mon.secondarytyping
      ? mon.secondarytyping.charAt(0).toUpperCase() +
          mon.secondarytyping.slice(1)
      : mon.secondarytyping
  );
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
      primarytyping: primaryTyping.toLowerCase(),
      secondarytyping:
        secondaryTyping === '' ? null : secondaryTyping.toLowerCase(),
      height: height,
      weight: weight,
    };

    await axios
      .put(url, newPokemon)
      .then((res) => {
        if ((res.status = 201)) {
          alert(`${name} has been updated!`);
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
          <h1>Update the Pokédex!</h1>
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
              value={imgPreview}
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
              value={mon.ID}
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
              value={name}
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
              defaultValue={secondaryTyping}
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
                value={height}
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
                value={weight}
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='submit'>
          <input type={'submit'} value='Update!'></input>
        </div>{' '}
        <div className='backButton'>
          <button
            onClick={() => {
              back();
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
