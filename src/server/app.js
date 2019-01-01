const request = require('request')
const log = require('./logger')
const crud = require('./dboperations/crud')
const parseJson = require('parse-json');
const dbOperation = require('./dboperations/connection')
const dotenv = require('dotenv');
const result = dotenv.config();

const configs = [
{"category": "mostActive", "url": "https://api.iextrading.com/1.0/stock/market/list/mostactive"},
{"category": "gainers", "url": "https://api.iextrading.com/1.0/stock/market/list/gainers"},
{"category": "losers", "url": "https://api.iextrading.com/1.0/stock/market/list/losers"},
{"category": "volume", "url": "https://api.iextrading.com/1.0/stock/market/list/iexvolume"},
{"category": "percent", "url": "https://api.iextrading.com/1.0/stock/market/list/iexpercent"},
{"category": "focus", "url": "https://api.iextrading.com/1.0/stock/market/list/infocus"}]

async function startExec() {
    let connection = await dbOperation.getConnection()

    configs.forEach(config => {
        request(config.url, function(error, response, body) {
            if(error) {
                log.error('app : request : '+error)
            } else {
                log.info('app : Status Code : '+response.statusCode)
                log.info('app : Config category: '+config.category)
                log.info('app : Response Body : '+body)
                crud.insert(config.category, parseJson(body), connection)
            }
        })
    })
}

startExec();