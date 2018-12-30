'use strict'

const mysql = require('mysql');
const chalk = require('chalk');
const log = console.log

module.exports = {
    getConnection
}

var connection = mysql.createConnection({
    host     : "valueinvestingdevdb.cdu3sla5f5lz.us-east-1.rds.amazonaws.com",
    user     : "sbilakhia",
    password : "Value!nve$ting",
    port     : 3306
});

function getConnection() {
    return new Promise(function(resolve, reject) {
        connection.connect(function(error) {
            if(error) { 
                log(chalk.red('Error: ' + error))
                reject(error)
            }
            else {
                log("connection successful")
                resolve(connection)
            }
        })
    })
}