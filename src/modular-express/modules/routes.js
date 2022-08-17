const teamRoutes = require("./teams/route");
const playerRoutes = require("./players/route");


const APP_ROUTES = [playerRoutes, teamRoutes].flatMap((node) => node);

module.exports = APP_ROUTES;
