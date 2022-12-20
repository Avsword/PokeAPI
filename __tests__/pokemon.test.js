/* eslint-disable comma-dangle */
const {
  describe,
  expect,
  test,
  afterAll,
  beforeAll,
} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

describe('In the GET endpoint (Largest)', () => {
  test('Basic GET should return 200', (done) => {
    request(app).get('/api/pokemon').expect(200).end(done);
  });

  test('should return 200 and valid JSON', async () => {
    const response = await request(app)
      .get('/api/pokemon')
      .set('Accept', 'application/json');
    // 200 status if all is ok
    expect(response.status).toEqual(200);
    // Is the response in json?
    expect(response.headers['content-type']).toMatch(/json/);
    // Does it at least give back the bulbasaur?
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ID: 1,
          name: 'bulbasaur',
          imgurl:
            'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true',
          description:
            'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
          primarytyping: 'grass',
          secondarytyping: 'poison',
          height: 0.7,
          weight: 6.9,
        }),
      ])
    );
  });
  test('should return bulbasaur (GET ID)', async () => {
    const response = await request(app)
      .get('/api/pokemon/1')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    // Do we get bulbasaur?
    expect(response.body).toMatchObject({
      ID: 1,
      name: 'bulbasaur',
      imgurl:
        'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true',
      description:
        'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
      primarytyping: 'grass',
      secondarytyping: 'poison',
      height: 0.7,
      weight: 6.9,
    });
  });
  test('should return 404 (GET ID)', async () => {
    const res = await request(app).get('/api/pokemon/9001');
    expect(res.status).toEqual(404);
  });
  test('should return bulbasaur with typing of grass', async () => {
    const res = await request(app).get('/api/pokemon/typing/grass');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ID: 1,
          name: 'bulbasaur',
          imgurl:
            'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true',
          description:
            'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
          primarytyping: 'grass',
          secondarytyping: 'poison',
          height: 0.7,
          weight: 6.9,
        }),
      ])
    );
  });
  /* test('should return 404 with bad typing',async()=>{
    const res = await request(app).get('')
  }) */
  test('should return 404 with bad typing', async () => {
    const res = await request(app).get('/api/pokemon/typing/test');
    expect(res.status).toEqual(404);
  });
  test('should return bulbasaur with height', async () => {
    const res = await request(app).get('/api/pokemon/height/0.7&0.7');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ID: 1,
          name: 'bulbasaur',
          imgurl:
            'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true',
          description:
            'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
          primarytyping: 'grass',
          secondarytyping: 'poison',
          height: 0.7,
          weight: 6.9,
        }),
      ])
    );
  });
  test('should return 404 with bad height', async () => {
    const res = await request(app).get('/api/pokemon/height/-0.2&-0.1');
    expect(res.status).toEqual(404);
  });
  test('return bulbasaur with weight', async () => {
    const res = await request(app).get('/api/pokemon/weight/6.9&6.9');
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ID: 1,
          name: 'bulbasaur',
          imgurl:
            'https://github.com/Skeli789/Dynamic-Pokemon-Expansion/blob/master/graphics/pokeicon/gIconSprite001Bulbasaur.png?raw=true',
          description:
            'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
          primarytyping: 'grass',
          secondarytyping: 'poison',
          height: 0.7,
          weight: 6.9,
        }),
      ])
    );
  });
  test('should return 404 with bad weight', async () => {
    // Jest should just remove all negative numbers -> 404 code.
    const res = await request(app).get('/api/pokemon/weight/-0.2&-0.1');
    expect(res.status).toEqual(404);
  });
});

describe('In the POST endpoint', () => {
  test('should get 404 with no name', async () => {
    const pokemon = {
      imgurl:
        'https://elements-cover-images-0.imgix.net/df403ae4-755d-495e-9dfd-97e6e964ecb9?auto=compress%2Cformat&fit=max&w=1170&s=a3ac4bcbd3f921d99e0eab9252ba3a6f',
      description: 'This has been posted from REST file',
      primarytyping: 'Normal',
      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"name" is required');
  });

  test('should get 404 with empty name', async () => {
    const pokemon = {
      name: '',
      imgurl:
        'https://elements-cover-images-0.imgix.net/df403ae4-755d-495e-9dfd-97e6e964ecb9?auto=compress%2Cformat&fit=max&w=1170&s=a3ac4bcbd3f921d99e0eab9252ba3a6f',
      description: 'This has been posted from REST file',
      primarytyping: 'Normal',
      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"name" is not allowed to be empty');
  });

  test('should not allow too short of a name', async () => {
    const pokemon = {
      name: 'a',
      imgurl:
        'https://elements-cover-images-0.imgix.net/df403ae4-755d-495e-9dfd-97e6e964ecb9?auto=compress%2Cformat&fit=max&w=1170&s=a3ac4bcbd3f921d99e0eab9252ba3a6f',
      description: 'This has been posted from REST file',
      primarytyping: 'Normal',
      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"name" length must be at least');
  });
  test('should not allow too long of an imgurl', async () => {
    const pokemon = {
      name: 'test',
      imgurl: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. 
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa..`,
      description: 'This has been posted from REST file',
      primarytyping: 'Normal',
      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"imgurl" length must be less than or equal to');
  });
  test('should not allow too long of a description', async () => {
    const pokemon = {
      name: 'test',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. 
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa..`,
      imgurl: 'This has been posted from REST file',
      primarytyping: 'Normal',
      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain(
      '"description" length must be less than or equal to'
    );
  });
  test('should not allow no primary typing', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',

      secondarytyping: null,
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"primarytyping" is required');
  });
  test('should not allow too short primarytypings', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"primarytyping" length must be at least');
  });
  test('should not allow too short secondarytypings', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaa',
      secondarytyping: 'aa',
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"secondarytyping" length must be at least');
  });

  test('should not allow too long primarytypings', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaaaaaaaaaaaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain(
      '"primarytyping" length must be less than or equal to'
    );
  });
  test('should not allow too long secondarytypings', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaa',
      secondarytyping: 'aaaaaaaaaaaaa',
      height: 100,
      weight: null,
      ID: 3005,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain(
      '"secondarytyping" length must be less than or equal to'
    );
  });

  test('should get 404 with no id', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"ID" is required');
  });

  test('should not allow id to be a string', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: 'identification number',
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"ID" must be a number');
  });

  test('should not allow id to be less than 0', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from REST file',
      primarytyping: 'aaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: -4,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(404);
    expect(res.text).toContain('"ID" must be greater than or equal to 0');
  });

  test('should get 200 for a proper post', async () => {
    const pokemon = {
      name: 'test',
      description: 'description',
      imgurl: 'This has been posted from pokemon.test.js',
      primarytyping: 'aaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: 4004,
    };
    const res = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(201);

    // I couldn't get the afterAll func to work so we'll just del it here
    await request(app)
      .delete('/api/pokemon/4004')
      .set('Accept', 'application/json');
  });
});

describe('In the DELETE endpoint', () => {
  test('should delete city we post', async () => {
    const pokemon = {
      name: 'DELETEtest',
      description: 'description',
      imgurl: 'This has been posted from pokemon.test.js',
      primarytyping: 'aaa',
      secondarytyping: 'aaa',
      height: 100,
      weight: null,
      ID: 4005,
    };
    const Postres = await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(Postres.status).toEqual(201);

    const res = await request(app)
      .delete('/api/pokemon/4005')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Pokémon with the id');
  });
  test('should check if the id exists', async () => {
    const res = await request(app).delete('/api/pokemon/9001');
    expect(res.status).toEqual(404);
    expect(res.text).toContain('Not Found');
  });
});

// NOTE: The data validation has already been tested in the POST endpoint so that's why you won't
//       see that many tests here. Ok? Cool.

describe('In the PUT endpoint', () => {
  // Before all Put tests, we'll create a fake pokemon that we'll update.
  const postid = 4006;
  beforeAll(async () => {
    console.log('BEFORE ALL: ');
    const fakemon = {
      name: 'PUTtest',
      description: 'description',
      imgurl: 'This has been posted from pokemon.test.js',
      primarytyping: 'PUT',
      secondarytyping: 'PUT',
      height: 100,
      weight: null,
      ID: postid,
    };
    await request(app)
      .post('/api/pokemon')
      .set('Accept', 'application/json')
      .send(fakemon);
  });
  test('should check if ID exists', async () => {
    const pokemon = {
      name: 'PUTtest',
      description: 'description',
      imgurl: 'This has been posted from pokemon.test.js',
      primarytyping: 'PUT',
      secondarytyping: 'PUT',
      height: 100,
      weight: null,
      ID: 9001,
    };
    const res = await await request(app)
      .put('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(405);
    expect(res.text).toContain('ID not found OR no rows were changed');
  });

  test('should update for the ID', async () => {
    const pokemon = {
      name: 'PUTtest',
      description: 'UPDATED',
      imgurl: 'This has been UPDATED from pokemon.test.js',
      primarytyping: 'PUT',
      secondarytyping: 'PUT',
      height: 100,
      weight: null,
      ID: postid,
    };
    const res = await request(app)
      .put('/api/pokemon')
      .set('Accept', 'application/json')
      .send(pokemon);
    expect(res.status).toEqual(200);
    expect(res.body.description).toEqual('UPDATED');
    expect(res.body.imgurl).toEqual(
      'This has been UPDATED from pokemon.test.js'
    );
  });

  test('delete the test since afterall wont work', async () => {
    const res = await request(app)
      .delete('/api/pokemon/4006')
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
  });

  // No joke idk why afterall wont work
  afterAll(() => {
    request(app)
      .delete(`/api/pokemon/${postid}`)
      .set('Accept', 'application/json');
    connection.end();
  });
});
