require('dotenv').config()

const express = require('express');
const app = express();

const mysql = require("mysql")
const {Model} = require("objection");
const knex = require('./knex');
const utils = require('./utils');
const User = require("./models/User")
app.use('/storage', express.static('storage/public'));
app.use(express.json())





app.get("/", async (req, res) => {
  try {
    const users = await User.query();
    //console.log(users);
    res.json(users)
  } catch (error) {
    console.log(error);
  }
})

app.post('/register', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password)
    // Wykonaj operacje dodawania użytkownika do bazy danych
    // Możesz użyć Knex.js lub innego narzędzia ORM, które używasz

    // Przykładowe dodanie użytkownika za pomocą Objection.js i Knex.js
    const newUser = await User.query().insert({
      email,
      password
    });

    console.log('Użytkownik został pomyślnie dodany do bazy danych:', newUser);

    res.send('Użytkownik został zarejestrowany.');

  } catch (error) {
    console.error('Wystąpił błąd podczas rejestracji użytkownika:', error);
    res.status(500).send('Wystąpił błąd podczas rejestracji użytkownika.');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex('users')
      .select('id', 'email', 'password')
      .where('email', email)
      .first();

    if (!user) {
      return res.status(401).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
    }

    const token = jwt.sign({ userId: user.id }, 'tajnyKlucz');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('App Name API by freely.digital');
  console.log(`App listening on port ${port}.`);
});