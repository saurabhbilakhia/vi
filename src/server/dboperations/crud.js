'use strict'

const mysql = require('mysql')
const log = require('./../logger')

module.exports = {
    insert
}

async function insert(category, records, connection) {
    records.forEach(element => {
        connection.query(`INSERT INTO IEX.eod_stats (symbol,companyName,primaryExchange,sector,calculationPrice,latestPrice,latestSource,latestTime,latestUpdate,latestVolume,iexRealtimePrice,iexRealtimeSize,iexLastUpdated,delayedPrice,delayedPriceTime,previousClose,changeInValue,changePercent,iexMarketPercent,iexVolume,avgTotalVolume,iexBidPrice,iexBidSize,iexAskPrice,iexAskSize,marketCap,peRatio,week52High,week52Low,ytdChange,category) 
                        VALUES ('${element.symbol}','${element.companyName}','${element.primaryExchange}','${element.sector}','${element.calculationPrice}',${element.latestPrice},'${element.latestSource}','${element.latestTime}',${element.latestUpdate},${element.latestVolume},${element.iexRealtimePrice},${element.iexRealtimeSize},${element.iexLastUpdated},${element.delayedPrice},${element.delayedPriceTime},${element.previousClose},${element.change},${element.changePercent},${element.iexMarketPercent},${element.iexVolume},${element.avgTotalVolume},${element.iexBidPrice},${element.iexBidSize},${element.iexAskPrice},${element.iexAskSize},${element.marketCap},${element.peRatio},${element.week52High},${element.week52Low},${element.ytdChange},'${category}')`, 
        function(error, result) {
            if(error) {
                log.error('crud : insert : '+error)
            } else {
                log.info('crud : insert successful')
            }
        })    
    })
}