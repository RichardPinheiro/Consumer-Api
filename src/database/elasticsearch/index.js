'use strict'

const Config = require('config')
const { Client } = require('elasticsearch')
const client = new Client({ host: Config.elastic.host })

module.exports = class Elastic {
    static save(value) {
        return new Promise((resolve, reject) => {
            let payload = {index: Config.elastic.index, body: value}
            let response = client.index(payload);
            resolve(response)
        })
    }
}
