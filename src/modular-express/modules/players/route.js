const { send_hello } = require("./controller");

const playerRoutes = [
  {
    // used to retrieve a student by id
    path: "/players/:playerId",
    method: "get",
    handlers: [],
  },
  {
    // used to retrieve the list of students
    path: "/players",
    method: "get",
    handlers: [send_hello],
  },
  {
    // used to create a new student
    path: "/players",
    method: "post",
    handlers: [],
  },
  {
    // used to update a student
    path: "/players/:playerId",
    method: "put",
    handlers: [],
  },
  {
    // used to remove a student
    path: "/students/:playerId",
    method: "delete",
    handlers: [],
  },
];

module.exports = playerRoutes;
