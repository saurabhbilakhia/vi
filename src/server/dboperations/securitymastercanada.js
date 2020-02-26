// 'use strict'

// const mysql = require('mysql')
// const log = require('./../logger')

// module.exports = {
//     insertData
// }

// var insertdata = []

// function insertData(records, connection) {
//     records.forEach(element => {
//         var tmxId = null
        
//         if(element.type == "ps") {
//             var tmxId = getTmxSecurityId(element.symbol)
//         }

//         var insertrecord = [element.symbol,tmxId,element.name,element.type,element.exchange,element.currency]
//         insertdata.push(insertrecord)
//     })

//     log.info(insertdata)
//     insert(insertdata, connection)
// }

// function insert(records, connection) {
//     var sql = `INSERT INTO ValueInvestingDB.SecurityMaster (iexId,tmxId,securityName,type,primaryExchange,currency) VALUES ?`
//     connection.query(sql, [records], function(error, result) {
//         if(error) {
//             log.error('securitymaster : insert : '+error)
//         } else {
//             log.info('securitymaster : insert successful')
//         }
//     })
// }



// function getTmxSecurityId(iexSecurityId) {
//     var splitSecurityId = iexSecurityId.split("-")
//     return splitSecurityId[0]+".PR."+splitSecurityId[1].charAt(1)
// }

// function getAvSecurityId(iexSecurityId) {
//     var splitSecurityId = iexSecurityId.split("-")
//     return splitSecurityId[0]+"-"+splitSecurityId[1]+".TRT"
// }