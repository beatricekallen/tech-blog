const sequelize = require("../config/config");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "alesmonde0",
    password: "password123",
  },
  {
    username: "jwilloughway1",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
