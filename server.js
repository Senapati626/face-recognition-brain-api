const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const clarifai = require('clarifai');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const apicall = require('./controllers/apicall');

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrains'
  }
});



const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('Backend is up and running.');
});



app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => { register.handleRegister(req,res,db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {apicall.handleAPIcall(req,res)})

app.listen(process.env.PORT || 3001, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
