const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'fantasy'},
    {id: 2, name: 'thriller'},
    {id: 3, name: 'action'},
];

router.get('/', (req, res) => {
    res.send(genres);
})

router.post('/s', (req, res) => {
    const {error} = validateGenre(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }
    
    genres.push(genre);
    res.send(genre);
})

router.put('/:name', (req, res) => {
    //lookup the genre
    const genre = genres.find(g => g.name === req.params.name);
    //return 404 if doesn't exist
    if(!genre) return res.status(404).send('The genre with the given name was not found');
    
    const {error} = validateGenre(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    
    //update genre
    genre.name = req.body.name;
    
    genres.push(genre);
    res.send(genre);
});

router.delete('/:name', (req, res) => {
    const genre = genres.find(g => g.name === req.params.name);
    //return 404 if doesn't exist
    if(!genre) return res.status(404).send('The genre with the given name was not found');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genre);
});


function validateGenre(genre){
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).required(), 
    });
    return JoiSchema.validate(genre);
}
module.exports = router;