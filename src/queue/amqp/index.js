'use strict'
const Emitter = require('events')
const amqp = require('amqplib/callback_api')
const { logger } = require('../../log')
let connection
let channel

class Amqp {
	static connect (connectionString) {
		return new Promise((resolve, reject) => {
			logger.verbose(`${new Date().toLocaleString()} - [AMQP] connectionString ${JSON.stringify(connectionString)}`)
			if (connection) resolve(connection)
			amqp.connect(connectionString, (error, connection) => {
				if (!error) {
					Amqp.connection = connection
					resolve(connection)
				} else {
                        logger.error(error)
						reject(error)
				}
			})
		})
	}

	static createChannel (connection) {
		return new Promise((resolve, reject) => {
			connection.createChannel((error, channel) => {
				if (!error) {
					Amqp.channel = channel
					resolve(channel)
				} else {
                    logger.verbose(error)
					reject(error)
				}
			})
		})
	}

	static consumeFromQueue (channel, exchange, _companies) {
		let event = new Emitter()
		channel.prefetch(1)
		channel.consume(
				exchange,
				msg => {
						process.nextTick(() => {
						event.emit('message', msg)
						})
				},
				{ noAck: false }
		)
		return event
	}

	static get connection () {
		return connection
	}

	static set connection (conn) {
		connection = conn
	}

	static get channel () {
		return channel
	}

	static set channel (ch) {
		channel = ch
	}
}

module.exports = Amqp
