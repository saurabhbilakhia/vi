'use strict'

const mysql = require('mysql')
const log = require('./../logger')

module.exports = {
    insert
}

async function insert(category, records, connection) {
    records.forEach(element => {
        connection.query(`INSERT INTO ValueInvestingDB.MarketList (
            symbol,
            companyname,
            primaryexchange,
            calculationprice,
            open,
            opentime,
            close,
            closetime,
            high,
            low,
            latestprice,
            latestsource,
            latesttime,
            latestupdate,
            latestvolume,
            iexrealtimeprice,
            iexrealtimesize,
            iexlastupdated,
            delayedprice,
            delayedpricetime,
            extendedprice,
            extendedchange,
            extendedchangepercent,
            extendedpricetime,
            previousclose,
            previousvolume,
            changed,
            changepercent,
            volume,
            iexmarketpercent,
            iexvolume,
            avgtotalvolume,
            iexbidprice,
            iexbidsize,
            iexaskprice,
            iexasksize,
            marketcap,
            peratio,
            week52high,
            week52low,
            ytdchange,
            lasttradetime,
            isusmarketopen,
            type,
            runtimestamp    
        ) VALUES 
        (
            '${element.symbol}',
            '${element.companyName}',
            '${element.primaryExchange}',
            '${element.calculationPrice}',
            ${element.open},
            ${element.openTime},
            ${element.close},
            ${element.closeTime},
            ${element.high},
            ${element.low},
            ${element.latestPrice},
            '${element.latestSource}',
            '${element.latestTime}',
            ${element.latestUpdate},
            ${element.latestVolume},
            ${element.iexRealtimePrice},
            ${element.iexRealtimeSize},
            ${element.iexLastUpdated},
            ${element.delayedPrice},
            ${element.delayedPriceTime},
            ${element.extendedPrice},
            ${element.extendedChange},
            ${element.extendedChangePercent},
            ${element.extendedPriceTime},
            ${element.previousClose},
            ${element.previousVolume},
            ${element.change},
            ${element.changePercent},
            ${element.volume},
            ${element.iexMarketPercent},
            ${element.iexVolume},
            ${element.avgTotalVolume},
            ${element.iexBidPrice},
            ${element.iexBidSize},
            ${element.iexAskPrice},
            ${element.iexAskSize},
            ${element.marketCap},
            ${element.peRatio},
            ${element.week52High},
            ${element.week52Low},
            ${element.ytdChange},
            ${element.lastTradeTime},
            '${element.isUSMarketOpen}',
            '${category}',
            ${Date.now()}
        )`, 
        function(error, result) {
            if(error) {
                log.error('iexmarketlist : insert : '+error)
            } else {
                log.info('iexmarketlist : insert successful')
            }
        })    
    })
}