# Pokédex

This is a full-stack web-application created as a programming assignment at TAMK.
The backend follows the MVC model and Airbnb's formatting guide (which I will not use in the future).
The styling is heavily inspired by Pokémon Emerald's Pokédex.

# Screenshots
Mobile
<img src="https://user-images.githubusercontent.com/90607504/209718115-88158071-916a-4600-8632-0a63dd10d649.png" alt="mobile view" width="200"/>
<br />
Breakpoint at 600px
<img src="https://user-images.githubusercontent.com/90607504/209718148-92403aa9-2caa-44c0-beb7-c1dc4c43a2f1.png" alt="tablet view" width="300"/>
<br />
Breakpoint at 1024px
<img src="https://user-images.githubusercontent.com/90607504/209718166-7fc660e0-f7ac-43b2-a31e-0771eaa20127.png" alt="desktop view" width="400"/>
<br />

# How to use?

## Addresses

The public frontend address: https://pokedex-api-88gv.onrender.com/
The public backend address: https://pokedex-api-88gv.onrender.com/api/pokemon/

## Main Page

The Main page shows you a representation of every record in the Pokédex.

### To see more information about a certain Pokémon, you can click it's name.

    In the 'more information' view, you see the Pokémon's typing, description, height and weight.
    You can go back with the white left arrow on the left side of the screen.
    You can edit the record with the edit-symbol below the typings
    You can delete the Pokémon by clicking the 'release?' -button.

## The "Add" (and the edit) page

The Add tab is pretty much the same as the edit page. You are given a link to a repository with copyright free (?) / DWTFYW-licensed pictures to use, but you're of course free to use whatever you'd like.

- No. Determines what ID your Pokémon will have. Must be a number
- Name What is the Pokémon's name? Must be a string
- Primary Typing What's the Pokémon's primary typing?
- Secondary Typing What's the Pokémon's secondary typing?
- Height in M How tall is the Pokémon? Must be a number, can have 2 decimals
- Weight in KG How heavy is the Pokémon? Must be a number, can have 2 decimals
- Description A short/medium description of the Pokémon

Once you're done, press the 'Register'/'Update' button!

## Search page

The Search-page allows you to search entries from the database using the following search methods:
Search by...

- ID
- Name
- Height range
- Weight range

# Install & Get Started (dev)

```
# Clone the repository on to your pc with SSH.
# You can also use another method to clone it.
git clone git@github.com:Avsword/PokeAPI.git
cd PokeAPI/
# Install backend dependencies
npm install
# Go inside the frontend folder
cd frontend/
# Install the frontend dependencies
npm install

```

If you want to test only the backend in the cloud:
Use the server.REST -file

If you want to test only the backend LOCALLY:

```
# Go to the root folder (if you're following step-by-step then cd ..)

# Run the localhost.sql file with your credentials
# Edit the .env.txt file to reflect your Mysql localhost session and rename the file to just '.env'


# Nodemon updates the backend every time a file is saved
nodemon
```

If you want to test the frontend (which uses the server as an endpoint):

```
cd frontend/
npm run start

```

# API Endpoints

For a more in-depth explanation on the endpoints, please see file: openapi.yaml

- GET Endpoints
  - /pokemon
    - Gets all of the Pokémon recorded in the database
  - /pokemon/{id}
    - Gets the Pokémon with the id provided
  - /pokemon/name/{name}
    - Gets the Pokémon with the name provided
  - /pokemon/height/{min}&{max}
    - Gets the Pokémon within the height range provided
  - /pokemon/weight/{min}&{max}
    - Gets the Pokémon within the weight range provided
- POST Endpoint
  - /pokemon
    - Posts a new Pokémon with the provided request body (application/json)
- PUT Endpoint
  - /pokemon
    - Updates an existing Pokémon with the provided request body (application/json)
- DELETE Endpoint
  - /pokemon/{id}
    - Deletes a Pokémon with the ID provided

# Tests

The backend currently has 32 tests, which are all passed as of 27.12.2022

```
# To run tests:
npm run test
```

![Image of the tests being run](https://github.com/tiko-4A00EZ62/2022-wk49-final-project-Avsword/blob/main/__tests__/test_screenshot_26-12-2022.png?raw=true)

# Tech and main frameworks used

The backend uses [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/)

And the frontend uses [React](https://reactjs.org/), [Axios](https://axios-http.com/docs/intro) and [Scss](https://sass-lang.com/)

# Contribute

If you wish to contribute to this project, please go to the public site hosted on Render and register more Pokémon in the Pokédex <3

# Credits

Big thanks to Github user @NigelOToole for creating the SCSS mixin for pixelated borders :) https://nigelotoole.github.io/pixel-borders/

TAMK



# License

MIT © [Aaro Varjonen](https://github.com/Avsword)
