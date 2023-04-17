const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User.js');
const Tweet = require('../models/Tweet.js');
const Trip = require('../models/Trip.js')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_TWEETS = 30;
const NUM_SEED_TRIPS = 7;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo',
    email: 'demo@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}
  
// Create tweets
const tweets = [];

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet ({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
    })
  )
}

const trips = [];

for (let i = 0; i < NUM_SEED_TRIPS; i++) {
  const start = faker.date.future();
  trips.push(
    new Trip ({
      title: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_TRIPS)]._id,
      description: faker.hacker.phrase(),
      startDate: start,
      endDate: faker.date.future(start) 
    })
  )
}

    
// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users, tweets, and trips...");

  User.collection.drop()
                 .then(() => Tweet.collection.drop())
                 .then(() => Trip.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Tweet.insertMany(tweets))
                 .then(() => Trip.insertMany(trips))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}