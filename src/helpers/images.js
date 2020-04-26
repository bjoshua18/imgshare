const { Image } = require('../models')

module.exports = {
	async popular() {
		return await Image.find().limit(9).sort({likes: -1}).lean({virtuals:true})
	}
}