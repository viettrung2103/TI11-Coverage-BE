const { poolService } = require("../../../database_connection");
const mysql2 = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { PORT, DB_NAME } = require("../../../config");

//get Team List
const getTeams = (req, res) => {
  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.teamId}`)

    connection.query('SELECT * from teams', (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
};

//get team by ID
const getTeamById = (req, res) => {
  const teamId = req.params.teamId;


  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.teamId}`)

    //sql query
    // id = ? to prevent sql injection
    connection.query('SELECT * from teams WHERE teamid = ?',[teamId], (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
};
// delete team by ID
const deleteTeamById = (req, res) => {
  const params = req.params;
  console.log (params);


  const teamId = req.params.teamId;
  const teamTagName = req.params.tag;

  poolService.getConnection((err, connection) => {

    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)

    //sql query
    // id = ? to prevent sql injection
    connection.query('DELETE from teams WHERE teamId = ?',[teamId], (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Team with the Record ID: ${teamId} is removed`);
      } else {
        console.log(err);
      }
    })
  })
};
//create new team
const  createTeam = (req, res) => {
  const teamId = req.params.teamId;
  
  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)
    
    const params = req.body; // a body of what client send to server
  
    // add ? to prevent sql injection
    connection.query('INSERT INTO teams SET ?',params, (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Team ${params.teamName} is added`);
      } else {
        console.log(err);
      }
    })
    console.log(req.body);
  })
};
//edit a Team - Put method
const editTeam = (req, res) => {

  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)

    //destructure request body



    const {teamId, teamName, tag, region, wins, losses, imageUrl, createAt, lastMatchAt } = req.body
      
    // add ? to prevent sql injection
    // do querry and edit the database
    // then release the connection back to the pool
    // case sensitive: letters in query must be the same as letter in the body of json object for postman
    // be careful with variable position
    connection.query(
      'UPDATE teams SET teamName = ?, tag = ?, region =?, wins = ?, losses = ?, imageUrl = ? WHERE teamId = ?',
      [teamName, tag, region, wins, losses, imageUrl, teamId], 
      (err,rows) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.send(`Team with ${teamName} is updated`);
      } else {
        console.log(err);
      }
    })

    console.log(req.body);
  })
};

module.exports= {
  getTeams,
  getTeamById,
  deleteTeamById,
  createTeam,
  editTeam,
}
;