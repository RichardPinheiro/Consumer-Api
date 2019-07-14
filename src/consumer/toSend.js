'use strict'

const { amqp } = require('../queue')
const elastic = require('../database/elasticsearch')
const { logger } = require('../log')
const Config = require('config')

module.exports = class ToSend {
    consumer (channel, exchange) {
        logger.verbose(`${new Date().toLocaleString()} - Check queue`)
        amqp.consumeFromQueue(channel, exchange).on('message', msg => {
            logger.verbose(`${new Date().toLocaleString()} - Queue item caught`)
            let message = JSON.parse(msg.content)
            channel.ack(msg)
            elastic.save(message)
                .then(() => {
                    logger.verbose(`${new Date().toLocaleString()} - Sent queue item to elastic`)
                })
                .catch(error => {
                    logger.verbose(`${new Date().toLocaleString()} - Error to send queue item to elastic`)
                    logger.error(error)
                })
        })
    }
}
