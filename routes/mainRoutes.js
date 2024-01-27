const express = require('express');
const router = express.Router();
const ResponseService = require('../responseService/ResponseService.js');


router.get('/test', async (req, res) => {
  user = {
    name :"Sarad"
  };

  const response = ResponseService.success( user, 'User found successfully');

  res.send(response);

});

module.exports = router;