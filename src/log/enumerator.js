'use strict'
/**
 * @class Enumerator
 */
class Enumerator {
  /**
   * @static
   * @returns {Enumerator.dataStatus}
   */
  static get dataStatus () {
    return {
      ACTIVE: 0,
      INACTIVE: 1,
      DELETED: 2
    }
  }
  /**
   * @static
   * @returns {Enumerator.logLevel}
   */
  static get logLevel () {
    return {
      ERROR: 'error',
      WARNING: 'warn',
      INFORMATION: 'info',
      DEBUG: 'debug'
    }
  }
}

module.exports = Enumerator
