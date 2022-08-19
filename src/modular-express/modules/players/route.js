const { getPlayerById, getPlayers, deletePlayerById, createPlayer, editPlayer } = require("./controller");

const playerRoutes = [
  {
    // used to retrieve a student by id
    path: "/players/:playerId",
    method: "get",
    handlers: [getPlayerById],
  },
  {
    // used to retrieve the list of students
    path: "/players",
    method: "get",
    handlers: [getPlayers],
  },
  {
    // used to create a new student
    path: "/players/create",
    method: "post",
    handlers: [createPlayer],
  },
  {
    // used to update a student
    path: "/players/:playerId/edit",
    method: "put",
    handlers: [editPlayer],
  },
  {
    // used to remove a student
    path: "/players/:playerId/delete",
    method: "delete",
    handlers: [deletePlayerById],
  },
];

module.exports = playerRoutes;
