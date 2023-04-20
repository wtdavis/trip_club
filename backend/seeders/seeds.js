const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User.js');
const Tweet = require('../models/Tweet.js');
const Trip = require('../models/Trip.js')
const Event = require('../models/Event.js')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

// const NUM_SEED_USERS = 10;
// const NUM_SEED_TWEETS = 30;
// const NUM_SEED_TRIPS = 7;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo',
    email: 'demo@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push( new User ({
  username: 'peter',
  email: 'peter@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
}));

users.push(new User ({
  username: 'olga',
  email: 'olga@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
}))

users.push( new User ({
  username: 'amin',
  email: 'amin@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
}))

users.push( new User ({
  username: 'clarence',
  email: 'clarence@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
}))

users.push( new User ({
  username: 'stephen',
  email: 'stephen@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
}))

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User ({
//       username: faker.internet.userName(firstName, lastName),
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//     })
//   )
// }
  
// Create tweets
const tweets = [];

// for (let i = 0; i < NUM_SEED_TWEETS; i++) {
//   tweets.push(
//     new Tweet ({
//       text: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
//     })
//   )
// }

const trips = [];

// for (let i = 0; i < NUM_SEED_TRIPS; i++) {
//   const start = faker.date.future();
//   trips.push(
//     new Trip ({
//       title: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * NUM_SEED_TRIPS)]._id,
//       description: faker.hacker.phrase(),
//       startDate: start,
//       endDate: faker.date.soon(10, start),
//       // All users are currently collaborators on all trips
//       collaborators: users.map((user) => user._id)
//     })
//   )
// }

trips.push(
  new Trip ({
    title: "Colorado",
    author: users[0]._id,
    description: "Let's go skiing!",
    startDate: "03/03/2023",
    endDate: "03/03/2023",
    events: [],
    collaborators: [users[1]._id, users[2]._id],
    lat: 39.6061,
    lng: -106.3550
  })
);

trips.push(
  new Trip ({
    title: "Europe",
    author: users[1]._id,
    description: "Going to Europe",
    startDate: "05/05/2023",
    endDate: "05/05/2023",
    events: [],
    collaborators: [users[3]._id],
    lat: -48.8584,
    lng: 2.2945,
  })
)

trips.push(
  new Trip({
    title: "Everest",
    author: users[3]._id,
    description: "India and Nepal",
    startDate: "03/03/2023",
    endDate: "03/10/2023" ,
    events: [],
    collaborators: [users[0]._id, users[4].id, users[5]._id],
    lat: 27.9881,
    lng: 86.9250
  })
)

const events = []

events.push(
  new Event({
    author: users[0]._id,
    trip: trips[0]._id,
    lat: 39.7392,
    lng: -104.9903,
    startTime: new Date(2023, 12, 1, 6, 30),
    endTime: new Date(2023, 12, 3, 8, 0),
    description: 'Land in Denver',
    title: 'Landing'
  })
)
events.push(
  new Event({
    author: users[0]._id,
    trip: trips[0]._id,
    lat: 39.6061,
    lng: -106.3550,
    startTime: new Date(2023, 8, 2, 5, 15),
    endTime: new Date(2023, 8, 3, 7, 45),
    description: 'Skiing at the resort',
    title: 'Skiing'
  })
)
events.push(
  new Event({
    author: users[0]._id,
    trip: trips[0]._id,
    lat: 39.7559,
    lng: -104.9942,
    startTime: new Date(2023, 9, 3, 6, 30),
    endTime: new Date(2023, 9, 7, 2, 10),
    description: 'Rockies vs Giants',
    title: 'Baseball Game'
  })
)
events.push(
  new Event({
    author: users[0]._id,
    trip: trips[1]._id,
    lat: 132.0547383,
    lng: -120.547283,
    startTime: new Date(2024, 4, 15, 6, 30),
    endTime: new Date(2024, 4, 23, 8, 0),
    description: 'Going to have a ton of fun on Spring Break',
    title: 'Spring Break'
  })
)
events.push(
  new Event({
    author: users[1]._id,
    trip: trips[1]._id,
    lat: -48.8584,
    lng: 2.2945,
    startTime: new Date(2024, 3, 14, 6, 30),
    endTime: new Date(2024, 3, 14, 8, 30),
    description: "Eiffel Tower and Paris",
    title: 'France'
  })
)
  events.push(
    new Event({
      author: users[1]._id,
      trip: trips[1]._id,
      lat: 43.9159,
      lng: 17.6791,
      startTime: new Date(2024, 3, 15, 10, 20),
      endTime: new Date(2024, 3, 15, 11, 30),
      description: "Bosnia",
      title: 'Bosnia'
    })
  )
  events.push(
    new Event({
      author: users[3]._id,
      trip: trips[2]._id,
      lat: 27.9881,
      lng: 86.9250,
      startTime: new Date(2024, 12, 28, 7, 0),
      endTime: new Date(2024, 12, 28, 10, 30),
      description: "Climbing Mt. Everest",
      title: 'Everest'
    })
  )
  events.push(
    new Event({
      author: users[0]._id,
      trip: trips[1]._id,
      lat: 27.1751, 
      lng: 78.0421,
      startTime: new Date(2024, 12, 30, 8, 10),
      endTime: new Date(2024, 12, 30, 9, 20),
      description: "I'm so excited!",
      title: 'Taj Mahal'
    })
  )
  events.push(
    new Event({
      author: users[0]._id,
      trip: trips[1]._id,
      lat: 19.0760,
      lng: 72.877,
      startTime: new Date(2024, 12, 31, 9, 0),
      endTime: new Date(2025, 1, 1, 2, 0),
      description: "Party like it's 1999",
      title: 'New Years Eve in Mumbai'
    })
  )

trips[0].events.push(events[0], events[1], events[2])
trips[1].events.push(events[3], events[4], events[5])
trips[2].events.push(events[6], events[7], events[8])


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
  console.log("Resetting db and seeding users, tweets, trips, and events...");

  User.collection.drop()
                 .then(() => Tweet.collection.drop())
                 .then(() => Trip.collection.drop())
                 .then(() => Event.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Tweet.insertMany(tweets))
                 .then(() => Event.insertMany(events))
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