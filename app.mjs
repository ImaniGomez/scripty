import './config.mjs';
import './db.mjs';
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//import User from './db.js';
import { MongoClient } from 'mongodb';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import url from 'url';
const router = express.Router();
//UserSchema = mongoose.model('User');
//require('./db');
//require('./auth');

//session support
const sessionOptions = {
    secret: 'cookie thing (store elsewhere)',
    resave: true,
    saveUninitialized: true
};

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }));


app.use(express.json());
app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
 }));

mongoose.connect(process.env.DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const Day = mongoose.model('Day');
const Project = mongoose.model('Project');
const User = mongoose.model('User');

//using session support
app.use(session(sessionOptions));



//make user data available to all templates
//drops req.user into context of every template
//done by adding properties to res.locals
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home', { 
        user: req.user,
        link: '/'
    });
});

app.get('/account', (req, res) => {
    res.render('account', { user: req.user });
});
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})




app.post('/register', async(req, res) => {
    try{
        const{username, password} = req.body;

        if(!password) {
            return res.send(400).send('Password required')
        }

        const existingUser = await User.findOne({userName: username});

        if(existingUser){
            return res.status(400).send('User already exists');
        }

        const newUser = new User({userName: username});
        await newUser.setPassword(password);
        await newUser.save();

        res.redirect('/account');
    }catch(error){
        console.error('Error registering user', error);
        res.status(500).send('Internal Server Error');
    }
})



app.post('/login', async(req, res) => {
    try{
        const{username, password} = req.body;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(401).send('user doesnt exist');
        }

        const authenticated = await user.authenticate(password);
        if(!authenticated){
            return res.status(400).send('Invalid');
        }

        req.login(user, (err) => {
            if(err){
                console.error('Error logging in user: ', err);
                return res.status(500).send('Internal Server Error')
            }
            res.redirect('/account');
        })
    }catch(error){
        console.error('Error logging in user', error);
        res.status(500).send('Internal Server Error');
    }
})

//----------creating new project with button----------

app.get('/projects/:name', async (req, res) => {
    try {
        const {name} = req.params;

        // Add some logging to see if the route is being called multiple times

        const project = await Project.findOne({name}).populate('user');

        if (project) {
            res.render('project', { project });
        }

        // Add return statement to exit the route handler after rendering
        res.status(200).send({ "message": "empty_route, help me out!" });
        //return;
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/projects', async (req, res) => {
    const newProject = new Project({
        name: (req.body.name)
    });
    try{
        console.log('error handling')
        await newProject.save();
        console.log("New project saved:", newProject.name);
        res.redirect(`/project/${result.name}`);
    }catch(err){
        //res.status(500);
        res.render('home', {message: err.message})
    }


    // .then(savedProject => {
    //     res.render('/project', {
    //         projectTitle: req.body.name
    //     })
    // })
    // .catch(err => res.status(500).status('error saving new project: ', err));
    // try {
    //     console.log("1")
    //     const newProject = { name: 'Untitled Project' };
    //     console.log("2")

    //     const result = await Project.collection.insertOne(newProject);
    //     console.log("3")
    //     const insertedId = result.insertedId;
    //     console.log("4")
    //     console.log(insertedId);
    //     res.render('project', { Project , insertedId})

    //     //console.log('hi', `/projects/${insertedId}`);
    //     //res.redirect(`/projects/${insertedId}`);
    // } catch (error) {
    //     console.error('Error creating new project:', error);
    //     res.status(500).json({ error: 'Failed to create new project' });
    // }
})

app.get('/day', async(req,res) => {
    try {
        const {dayId} = req.params;
        console.log('Received projectId:', dayId);

        // Add some logging to see if the route is being called multiple times

        const day = await Project.findOne({_id: dayId});

        console.log('Project found:', day);

        if (day) {
            res.render('project', { day });
        }

        // Add return statement to exit the route handler after rendering
        console.log("here");
        res.status(200).send({ "message": "empty_route, help me out!" });
        //return;
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/day', async(req,res) => {
    console.log('recieved day');

    try{
       const newDay = {date: 'jan 1'};
       const result = await Day.collection.insertOne(newDay);
       //const insertedDay = result.insertedDay;
       res.render('day', {result})
    }catch(error){
        console.error('Error creating new project:', error);
        res.status(500).json({ error: 'Failed to create new project' });
    }
})






//----------film calculation methods----------
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}


async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}


async function generateFilmRollNumber() {
    return 'FR' + Math.floow(Math.random() * 1000);
}

async function collectFilmShotData() {
    return new Promise((resolve, reject) => {
        r1.question('Enter film roll number ', async)
    })
}



app.listen(process.env.PORT ?? 3000);

// old password before 12pm 4/13
// mongodb+srv://img8943:I3WXqDLi7jWFRjDG@cluster0.wukl7sf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// new password after 12pm 4/13
// connects to db finalproject
// mongodb+srv://img8943:<password>@cluster0.wukl7sf.mongodb.net/finalproject?retryWrites=true&w=majority&appName=Cluster0