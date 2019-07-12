'use strict'
const Winston = require('winston')
const Config = require('config')
let logger
let transports = []
const Log2gelf = require('winston-log2gelf')

/**
 * @class Log
 */
class Log {
  /**
   * Get logger instance
   * @static
   * @return {Winston.Logger}
   */
  static get logger () {
    if (logger && logger instanceof Winston.Logger) return logger
    configureConsole(Config.logConsole)
    configureGelf(Config.logGelf)

    logger = new Winston.Logger({transports})
    logger.endGelf = endGelf
    return logger
  }

  /**
   * Set log transport
   * @static
   */
  static set transport (transport) {
    transports.push(transport)
  }
}

/**
 * Configure console transport
 * @param {Config.logConsole} logConsole
 * @private
 */
function configureConsole (logConsole) {
  logConsole && transports.push(new (Winston.transports.Console)({level: logConsole.level, colorize: true}))
}

function configureGelf (logGelf) {
  logGelf && transports.push(new Log2gelf(logGelf))
}

/**
 * Terminate Gelf TCP connection
 * @return {Boolean}
 */
function endGelf () {
  return logger &&
    logger.transports &&
    logger.transports.Log2gelf &&
    typeof logger.transports.Log2gelf.end &&
    ['TCP', 'TLS'].includes(Config.logGelf.protocol) &&
    logger.transports.Log2gelf.end()
}

module.exports = Log
