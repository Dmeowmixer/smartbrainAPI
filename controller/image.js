const Clarifai = require('clarifai');
//Clarifai app obj instantiation w/ apiKey
const app = new Clarifai.App({
  apiKey: '85dcb4daccb246df99e7f373119522b2'
});

const handleApiCall = (req,res) => {

 app.models.predict(
  Clarifai.FACE_DETECT_MODEL, 
  req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err=> res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=> {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to retrieve entries'));
}
module.exports = { handleImage,handleApiCall }