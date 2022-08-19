const { getTeams, getTeamById, deleteTeamById, createTeam, editTeam } = require("../teams/controller");

const teamRoutes = [
  {
    // used to retrieve a team by id
    path: "/teams/:teamId",
    method: "get",
    handlers: [getTeamById], // this list should contain any handles for this route. you can compose multiple handles to execute them in order.
  },
  {
    // used to retrieve the list of team
    path: "/teams",
    method: "get",
    handlers: [getTeams],
  },
  {
    // used to create a new team
    path: "/teams/create",
    method: "post",
    handlers: [createTeam],
  },
  {
    // used to update a team
    path: "/teams/:teamId/edit",
    method: "put",
    handlers: [editTeam],
  },
  {
    // used to remove a team
    path: "/teams/:teamId/delete",
    method: "delete",
    handlers: [deleteTeamById],
  },
];

module.exports = teamRoutes;
