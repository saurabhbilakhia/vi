'use strict'

var log4js = require('log4js');
var logger = log4js.getLogger();

log4js.configure({
    appenders: { vi: {type: 'file', filename: 'logs/valueinvesting.log'}},
    categories: { default: { appenders: ['vi'], level: 'ALL' } } 
})

  module.exports = {
      info,
      error
  }

function info(message) {
    logger.info(message)
}

function error(message) {
    logger.error(message)
}