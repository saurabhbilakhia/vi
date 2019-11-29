'use strict'

const mysql = require('mysql');
const log = require('./../logger')

module.exports = {
    getConnection
}

function getConnection() {
    var connection = mysql.createConnection({
        host     : process.env.host,
        port     : process.env.port,
        user     : process.env.user,
        password : process.env.password
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