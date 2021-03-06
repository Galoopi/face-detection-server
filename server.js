const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//database
const db = knex ({
    client: 'pg',
    connection: {
      connectionString : 'process.env.DATABASE_URL',
      ssl: true,
    }
});

const app  = express();
app.use(cors());
app.use(bodyParser.json());

//server
app.get('/', (req, res)=> { res.send(db.users) })

// signin
app.post('/signin', signin.handleSignin(db, bcrypt))

//register
  app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt) })

// profile
  app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req , res, db) })

//imgage count
app.put('/image', (req, res) => {image.handleImage(req , res, db) })

//API call
app.post('/imageurl', (req, res) => {image.handleApiCall(req , res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is working on port ${process.env.PORT}`);
});
