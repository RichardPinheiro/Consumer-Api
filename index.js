'use strict'
const Config = require('config')
const { amqp } = require('./src/queue')
const ToSend = require('./src/consumer/toSend')
const { logger } = require('./src/log')

amqp.connect(Config.amqp.host)
	.then(connection => amqp.createChannel(connection))
	.then(channel => {
        logger.verbose(`${new Date().toLocaleString()} - Listening rabbit`)
		let toSend = new ToSend()
		toSend.consumer(channel, Config.amqp.toSend)
	})
	.catch(error => {
        logger.error(`${new Date().toLocaleString()} - Cannot connect to Rabbit`)
        logger.error(error)
		process.exit(1)
	})
