const { poolService } = require("../../../database_connection");
const mysql2 = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { PORT, DB_NAME } = require("../../../config");
const { json } = require("body-parser");
const AppError = require("../utils/appError");
const { STATUS_CODES } = require("http");

//get Team List
const getTeams = (req, res, next) => {
  poolService.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.teamId}`)

    connection.query('SELECT * from teams', (err,data,fields) => {
      connection.release(); // return connection to the pool after the query

      if (!err) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
        // resultObject = rows.map(v=> Object.assign({},v)) // to map mysql rows into an object with v value
        res.status(200);
        res.json({
          status:"success",
          length: data?.length,
          data: data,
        });
      } else {
        return next(new AppError)
      }
    })
  })
};

//get team by ID
const getTeamById = (req, res, next) => {
  const teamId = req.params.teamId;

  poolService.getConnection((err, connection) => {
    //no ID found
    if (!teamId) {
      return next(new AppError("No Team found",404));
    };

    //sql query
    // id = ? to prevent sql injection
    connection.query('SELECT * from teams WHERE teamid = ?',[teamId], (err,data, fields) => {
      connection.release(); // return connection to the pool after the query
      if (err) return next(new AppError(err,500));
      res.status(200)
      res.json({
        status:"success",
        lenght:data?.lenght,
        data: data,
      });
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
const  createTeam = (req, res,next) => {
  
  poolService.getConnection((err, connection) => {
    if (!req.body) {
      return next(AppError("No form data found",404))
    };
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)
    const values = [req.body.name,"pending"];
    
    const params = req.body; // a body of what client send to server
  
    // add ? to prevent sql injection
    connection.query('INSERT INTO teams SET ?',params, (err,data, fields) => {
      connection.release(); // return connection to the pool after the query
      //if fail
      if (err) return next(new AppError(err,500));
      //if success create
      res.status(201);
      res.json({
        status: "Created",
        messsage:`Team ${params.tag} is created`,
      })
    })
  })
};
//edit a Team - Put method
const editTeam = (req, res) => {

  poolService.getConnection((err, connection) => {
    console.log(`Connecting to Pool at ${PORT}, accessed DB ${DB_NAME}`)
    
    if (err) {
      return next(new AppError ("No Team id is found",404))
    };

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
      (err, data, fields) => {
      connection.release(); // return connection to the pool after the query

      //if error
      if (err) return next(new AppError(err,500));
      //if success
      res.status(200);
      res.json({
        status:"success",
        lenght: data?.length,
        data:data,
      })
    })
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