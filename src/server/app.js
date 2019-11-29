const request = require('request')
const log = require('./logger')
const crud = require('./dboperations/crud')
const parseJson = require('parse-json');
const dbOperation = require('./dboperations/connection')
const dotenv = require('dotenv');
const result = dotenv.config();

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
                crud.insert(config.category, parseJson(body), connection)
            }
        })
    })
}

startExec();