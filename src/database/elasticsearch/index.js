'use strict'

const Config = require('config')
const { Client } = require('elasticsearch')
const client = new Client({ host: Config.elasticsearch.connectionString })

module.exports = class Elastic {
    static save(value) {
        return new Promise((resolve, reject) => {
            let payload = {index: Config.elasticsearch.index, body: value}
            let response = client.index(payload);
            resolve(response)
        })
    }
}
