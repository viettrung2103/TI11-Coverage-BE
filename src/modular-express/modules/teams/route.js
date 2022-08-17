const { send_hello } = require("../players/controller");
const { getTeams } = require("../teams/controller");

const teamRoutes = [
  {
    // used to retrieve a school by id
    path: "/teams/:teamId",
    method: "get",
    handlers: [send_hello], // this list should contain any handles for this route. you can compose multiple handles to execute them in order.
  },
  {
    // used to retrieve the list of schools
    path: "/teams",
    method: "get",
    handlers: [getTeams],
  },
  {
    // used to create a new school
    path: "/teams",
    method: "post",
    handlers: [],
  },
  {
    // used to update a school
    path: "/teams/:teamId",
    method: "put",
    handlers: [],
  },
  {
    // used to remove a school
    path: "/teams/:teamId",
    method: "delete",
    handlers: [],
  },
];

module.exports = teamRoutes;
