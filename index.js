//Importing required packages
//1. express 2.swagger 3.import csvWriter library
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const newLocal = './csvWriter';
// Import the csvWriter module
const { writeUsersToCsv } = require(newLocal);
const app = express();
const PORT = process.env.PORT || 3000;

// Generate random users data (will redirect to utils.js)
const { generateRandomUsers } = require('./utils');
const usersData = generateRandomUsers(10000);

// Middleware to parse JSON
// app.use(json());
app.use(express.json());

// Routes for CRUD operations
app.get('/users', (req, res) => {
  res.json(usersData);
});

  //Implementing search capability
app.get('/users/search', (req, res) => {
  const  term  = req.query.term;
  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  const searchResults = usersData.filter((user) => {
    const searchTermLC = term.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLC) ||
      user.email.toLowerCase().includes(searchTermLC) ||
      user.phone.includes(searchTermLC) ||
      user.location.city.toLowerCase().includes(searchTermLC) ||
      user.location.country.toLowerCase().includes(searchTermLC) ||
      user.gender.toLowerCase().includes(searchTermLC) ||
      user.address.toLowerCase().includes(searchTermLC) ||
      user.avatar.toLowerCase().includes(searchTermLC)
    );
  });

  res.json(searchResults);
});

//READ
app.get('/users/:id', (req, res) => {
  const user = usersData.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});



//CREATE
app.post('/users', (req, res) => {

   // Generate a random ID for the new user
   const newUserId = faker.datatype.uuid();
  const newUser = req.body;
  usersData.push(newUser);
  res.status(201).json(newUser);
});

//UPDATE
app.put('/users/:id', (req, res) => {
  const index = usersData.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

   // Preserve the original ID during the update
   req.body.id = req.params.id;
   
  usersData[index] = req.body;
  res.json(usersData[index]);
});

//DELETE
app.delete('/users/:id', (req, res) => {
  const index = usersData.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = usersData.splice(index, 1);
  res.json(deletedUser);
});

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

// Write usersData to a CSV file using the csvWriter module
  writeUsersToCsv(usersData)
    .then(() => console.log('CSV file was written successfully.'));

});

app.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// ...