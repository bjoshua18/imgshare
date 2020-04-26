const { Image, Comment } = require('../models')

module.exports = {
	async newest() {
		const comments = await Comment.find().limit(5).sort({timestamp: -1}).lean({virtuals:true})
		for (const comment of comments)
			comment.image = await Image.findOne({_id: comment.image_id}).lean({virtuals:true})
		return comments
	}
}