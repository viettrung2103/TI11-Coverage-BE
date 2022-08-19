const { poolService } = require("../../../database_connection");
const { PORT, DB_NAME } = require("../../../config");


//get Player List
const getPlayers = (req, res) => {
  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.playerId}`)

    connection.query('SELECT * from players', (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
};

//get player by ID
const getPlayerById = (req, res) => {
  const playerId = req.params.playerId;


  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.playerId}`)

    //sql query
    // id = ? to prevent sql injection
    connection.query('SELECT * from players WHERE playerid = ?',[playerId], (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
};

//create new player
const  createPlayer = (req, res) => {
  const playerId = req.params.playerId;
  
  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)
    
    const params = req.body; // a body of what client send to server
  
    // add ? to prevent sql injection
    connection.query('INSERT INTO players SET ?',params, (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Player ${params.nickName} is added`);
      } else {
        console.log(err);
      }
    })
    console.log(req.body);
  })
};
//edit a Player - Put method
const editPlayer = (req, res) => {

  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)

    //destructure request body

    const {playerId, firstName, lastName, nickName, age, teamId } = req.body
      
    // add ? to prevent sql injection
    // do querry and edit the database
    // then release the connection back to the pool
    // case sensitive: letters in query must be the same as letter in the body of json object for postman
    // be careful with variable position
    // be careful with foreign key, if there is no teamID in db, sending a Put request is not possible
    connection.query(
      'UPDATE players SET firstName = ?, lastName = ?, nickName =?, age = ?, teamId = ? WHERE playerId = ?',
      [firstName, lastName, nickName, age, teamId, playerId], 
      (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Player with ${nickName} is updated`);
      } else {
        console.log(err);
      }
    })

    console.log(req.body);
  })
};


// delete player by ID
const deletePlayerById = (req, res) => {
  const params = req.params;

  const playerId = params.playerId;

  poolService.getConnection((err, connection) => {

    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)

    //sql query
    // id = ? to prevent sql injection
    connection.query('DELETE from players WHERE playerId = ?',[playerId], (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Player with the Record ID: ${playerId} is removed`);
      } else {
        console.log(err);
      }
    })
  })

};
module.exports = {
  getPlayerById,
  getPlayers,
  deletePlayerById,
  createPlayer,
  editPlayer
};
