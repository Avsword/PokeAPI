/*
 In the MVC Pattern, the controller is kind of at the centre of it all.
 It acts in the middle of the model and view to process all logic and incoming requests.

 Controller also handles all of the status responses, which aren't the usual 200.
 We'll also be doing data validation with joi in the controller. :)
*/

const pokeModel = require('../models/pokemon');
// const joi

const getAll = async (req, res) => {
  try {
    const response = await pokeModel.getAll();
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { getAll };
