const express = require('express');
//when you seperate the file, your dont call app = express(), you call const router = express.Router(); instead
const router = express.Router();
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

router.get('/', (req, res) => { 
    res.send(courses);
});

//route model binding as we sat in laravel
router.get('/:id', (req, res) => { 
    const course = courses.find(c => c.id === parseInt(req.params.id)); //router.params.id comes as a string and we strictly comparing it to an integer, so we parse to int
    if(!course) return res.status(404).send('The course with the given id was not found');
    //.send is used to return to clients
    res.send(course);
});

// router.get('/api/posts/:year/:month', (req, res) => { 
//     res.send(req.params);
//     //to get query params req.query
// });



//POST REQUEST
router.post('/', (req, res) => {
    //defining the JoiSchemaObject
     //validate Input
    // const result.error = validateCourse(req.body);
    const {error} = validateCourse(req.body); //"{error} = result.error"" object destructuring
    //if invalid, return 400 --bad request
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
});



//UPDATE
router.put('/:id', (req, res) => {
    //lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //return 404 if doesn't exist
    if(!course) return res.status(404).send('The course with the given id was not found');
    
    //validate Input
    // const result.error = validateCourse(req.body);
    const {error} = validateCourse(req.body); //"{error} = result.error"" object destructuring
    //if invalid, return 400 --bad request
    if(error) return res.status(400).send(error.details[0].message);
    
    //update course
    course.name = req.body.name;
    //return the updated course
    res.send(course);
});


//DELETE
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //return 404 if doesn't exist
    if(!course) return res.status(404).send('The course with the given id was not found');
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
});

function validateCourse(course){
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).required(), 
    });
    return JoiSchema.validate(course);
}


module.exports = router;