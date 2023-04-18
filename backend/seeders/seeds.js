const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User.js');
const Tweet = require('../models/Tweet.js');
const Trip = require('../models/Trip.js')
const Event = require('../models/Events.js')
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

const user1 = new User ({
  username: 'peter',
  email: 'peter@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
});

const user2 = new User ({
  username: 'olga',
  email: 'olga@user.io',
  hashedPassword: bcrypt.hashSync('password', 10)
});


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
      endDate: faker.date.soon(10, start),
      // All users are currently collaborators on all trips
      collaborators: users.map((user) => user._id)
    })
  )
}

trips.push(
  new Trip ({
    title: "Colorado",
    author: users[0]._id,
    description: "Let's go when we go let's go when we go!",
    startDate: "03/03/2023",
    endDate: "03/03/2023" 
  })
);

trips.push(
  new Trip ({
    title: "Bosnia",
    author: users[0]._id,
    description: "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
    startDate: "05/05/2023",
    endDate: "05/05/2023" 
  })
)

const events = []

events.push(
  new Event({
    author: users[0]._id,
    trip: trips[0]._id,
    lat: 1.0547383,
    lng: -0.547283,
    startTime: new Date(2023, 12, 1, 6, 30),
    endTime: new Date(2023, 12, 3, 8, 0),
    description: 'Lay down at the center of the Earth',
    title: 'Go to center of the Earth'
  })
)
events.push(
  new Event({
    author: users[0]._id,
    trip: trips[0]._id,
    lat: 41.0547383,
    lng: 40.547283,
    startTime: new Date(2023, 8, 2, 5, 15),
    endTime: new Date(2023, 8, 3, 7, 45),
    description: 'Jump off a cliff!',
    title: 'Paragliding'
  })
)
events.push(
  new Event({
    author: users[0]._id,
    trip: trips[1]._id,
    lat: 101.0547383,
    lng: -60.547283,
    startTime: new Date(2023, 9, 3, 6, 30),
    endTime: new Date(2023, 9, 7, 2, 10),
    description: 'Feed the ducks',
    title: 'Duck Pond'
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
    author: users[0]._id,
    trip: trips[1]._id,
    lat: -130.0547383,
    lng: 70.547283,
    startTime: new Date(2024, 12, 31, 9, 0),
    endTime: new Date(2025, 1, 1, 2, 0),
    description: "Party like it's 1999",
    title: 'New Years Eve'
  })
)

trips[0].events.push(events[0])
trips[0].events.push(events[1])
trips[1].events.push(events[2])
trips[1].events.push(events[3])
trips[1].events.push(events[4])


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