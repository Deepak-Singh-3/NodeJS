const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to Mongodb...."))
    .catch(err => console.error('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
    name : String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

async function createCourse() {
const Course = mongoose.model('Course', courseSchema); //Pascal case notation for class
const course = new Course({
    name : 'Angular Course',
    author : 'Deepak',
    tags :['angular','frontend'],
    isPublished: true
});


const result = await course.save(); //we are using await because saving is an async operation
console.log(result);
}

async function getCourses() {
       const pageNumber = 2; //check skip
       const pageSize = 10;
       // /api/courses?pageNumber=2&pageSize=10 in real life scenario using RESTful API
    const courses = await Course
    .find({price: { $in: [10,15,20] } })
    //.find({price: {$gte: 10, $lte :20} })
    //.find({ author: 'Deepak', isPublished: true})
    .find({author : /^Deepak/ }) //starts with Deepak

    .find({author: /Singh$/i }) //ends with Singh
    .skip((pageNumber - 1)* pageSize)
    .find({author: /.*Deepak.*/})
    .limit(pageSize)
    .sort({name : 1})//asc. or desc. order
    .select({name :1, tags :1})
    .count();
    console.log(courses);
} 

async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return
    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();
    console.log(result);
    //Approach : Query first
    //findById()
    //Modify its properties
    //save()

    //Approach: Update First
    //Update directly
    //Optionally: get the updated doc.
}

getCourses();

//updateCourse(/*insert valid id from compass here*/);



//getCourses();

        //eq (equal)
        //ne (not equal)
        //gt (greater than)
        //gte (greater than or equal to)
        //lt (less than)
        //lte (less than or equal to)
        // in
        // nin (not in)
//Logical Operators
        //or
        //and
//Regular Expressionpatterns