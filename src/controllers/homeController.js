const { Image } = require('../models')

const ctrl = {}

ctrl.index = async (req, res) => {
	const images = await Image.find().sort({ timestamp: -1 }).lean()
	// Agregamos uniqueId
	images.forEach(i => {
		i.uniqueId = i.filename.substring(0, i.filename.indexOf('.'))
	})
	res.render('index', {images})
}

module.exports = ctrl