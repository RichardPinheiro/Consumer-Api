'use strict'

const Config = require('../../../infra/cross-cutting/Config')
const { Client } = require('elasticsearch')
const client = new Client({ host: Config.elasticsearch.connectionString })

class ElasticSearchService {
    save(value) {
        return new Promise((resolve, reject) => {
            let payload = {index: Config.elasticsearch.index, body: value}
            let response = client.index(payload);
            resolve(response)
        })
    }
}

module.exports = ElasticSearchService