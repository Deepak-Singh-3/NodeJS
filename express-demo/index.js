const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
//adding a piece of middleware

const courses = [
    { id :1, name :'course1'},
    { id :2, name :'course2'},
    { id :3, name :'course3'},
];
app.get('/', (req,res) => {
    res.send('Hello World');
});
app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
   // res.send(req.params.id);
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) return res.status(404).send('not found');//404
res.send(course);

});
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});

// ports --> environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));




app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(result.error.details[0].message);
        
    
    const course = {
        id :courses.length + 1,
        name :req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return  res.status(404).send('not found');//404
    


    //validate
    //if invalid,return 400 - bad request
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(result.error.details[0].message);
        //to stop execution
    

    //update course
    course.name = req.body.name;
    
    //return the updated course
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}




app.delete('/api/courses/:id', (req,res) => {
    //look up the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('not found');//404
    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
    //return the same course
});