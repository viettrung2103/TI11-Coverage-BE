const { poolService } = require("../../../database_connection");
const mysql2 = require("mysql");
const express = require("express");

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

module.exports= {
  getTeams
}
;