const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = new Schema({
	title: { type: String },
	description: { type: String },
	filename: { type: String },
	views: { type: Number, default: 0 },
	likes: { type: Number, default: 0 },
	timestamp: { type: Date, default: Date.now() }
})
// https://mongoosejs.com/docs/tutorials/lean.html
// Permitimos virtuals al usar lean()
ImageSchema.plugin(require('mongoose-lean-virtuals'))

ImageSchema.virtual('uniqueId')
	.get(function () {
		return this.filename.substring(0, this.filename.indexOf('.'))
	})

module.exports = mongoose.model('Image', ImageSchema)