const router = require('express').Router()
const Authorization = require('../routes/middlewares/Authorization') // TODO: colocar middleware nas rotas necessarias

const ElasticSearchController = require('../api/Controllers/ElasticSearchController')


router.route('/send-to-elastic').post(ElasticSearchController.save)

module.exports = router