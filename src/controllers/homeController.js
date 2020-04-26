const { Image } = require('../models')
const sidebar = require('../helpers/sidebar')

const ctrl = {}

ctrl.index = async (req, res) => {
	const viewModel = {images: []}
	await sidebar(viewModel)
	viewModel.images = await Image.find().sort({ timestamp: -1 }).lean({virtuals:true})
	res.render('index', viewModel)
}

module.exports = ctrl