const ElasticSearchService = require('../Services/elasticsearch/ElasticSearchService');
const elasticSearchService = new ElasticSearchService()

exports.save = async (req, res) => {
	try {
		const reponse = await elasticSearchService.save(req.body)
		res.json(reponse)
	} catch (e) {
		res.status(500).json(e)
	}

}