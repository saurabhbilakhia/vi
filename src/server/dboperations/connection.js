'use strict'

const mysql = require('mysql');
const log = require('./../logger')

module.exports = {
    getConnection
}

function getConnection() {
    var connection = mysql.createConnection({
        host     : process.env.aws_rds_host,
        port     : process.env.aws_rds_port,
        user     : process.env.aws_rds_user,
        password : process.env.aws_rds_password
    });
    return new Promise(function(resolve, reject) {
        connection.connect(function(error) {
            if(error) {
                log.error('connection : dbconnect : '+error)
                reject(error)
            }
            else {
                log.info('connection : dbconnection successful')
                resolve(connection)
            }
        })
    })
}