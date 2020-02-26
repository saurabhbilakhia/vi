const request = require('request')
const log = require('./logger')
// const iexmarketlist = require('./dboperations/iexmarketlist')
const securitymastercanada = require('./dboperations/securitymastercanada')
const parseJson = require('parse-json');
const dbOperation = require('./dboperations/connection')
const dotenv = require('dotenv');
const result = dotenv.config();
const fs = require('fs');

const configs = [
    {"category": "mostActive", "url": "https://cloud.iexapis.com/stable/stock/market/list/mostactive?token="+`${process.env.token}`},
    {"category": "gainers", "url": "https://cloud.iexapis.com/stable/stock/market/list/gainers?token="+`${process.env.token}`},
    {"category": "losers", "url": "https://cloud.iexapis.com/stable/stock/market/list/losers?token="+`${process.env.token}`},
    {"category": "volume", "url": "https://cloud.iexapis.com/stable/stock/market/list/iexvolume?token="+`${process.env.token}`},
    {"category": "percent", "url": "https://cloud.iexapis.com/stable/stock/market/list/iexpercent?token="+`${process.env.token}`}]

async function startExec() {
    let connection = await dbOperation.getConnection()

    configs.forEach(config => {
        request(config.url, function(error, response, body) {
            if(error) {
                log.error('app : request : '+error)
            } else {
                log.info('app : Status Code : ' + response.statusCode)
                log.info('app : Config category: ' + config.category)
                log.info('app : Response Body : ' + body)
                iexmarketlist.insert(config.category, parseJson(body), connection)
            }
        })
    })

    // console.log(__dirname);
    // let rawdata = fs.readFileSync(__dirname + '/data.json');
    // let jsonData = parseJson(rawdata);

    // log.info('app : Json Data : ' + jsonData)
    // securitymastercanada.insertData(jsonData, connection)

    // var url = "https://cloud.iexapis.com/stable/ref-data/region/ca/symbols?token=pk_9ae026d1477246269b76ba02575ccbb8"
    // request(url, function(error, response, body) {
    //     if(error) {
    //         log.error('app : request : '+error)
    //     } else {
    //         // log.info('app : Status Code : ' + response.statusCode)
    //         log.info('app : Response Body : ' + body)
    //         securitymastercanada.insert(parseJson(body), connection)
    //     }
    // })
}

startExec();

setTimeout((function() {
    log.info("app : Exiting application !!!!!")
    return process.exit(1);
}), 30000);
