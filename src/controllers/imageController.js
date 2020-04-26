const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')
const { getRandomString } = require('../helpers/libs')
const { Image, Comment } = require('../models')
const sidebar = require('../helpers/sidebar')

const ctrl = {}

const viewsIncrement = async (img) => {
	const img_mongo = await Image.findById(img._id)
	img_mongo.views++
	img.views++
	await img_mongo.save()
}

ctrl.index = async (req, res) => {
	const viewModel = {image: {}, comments: {}}
	viewModel.image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true})
	if(viewModel.image) {
		viewModel.comments = await Comment.find({image_id: viewModel.image._id}).sort({ timestamp: -1 }).lean()
		viewsIncrement(viewModel.image)
		await sidebar(viewModel)
		res.render('image', viewModel)
	} else {
		res.redirect('/')
	}
}

ctrl.create = (req, res) => {
	const saveImage = async () => {
		// Comprobamos el filename
		const imgName = getRandomString(6)
		const images = await Image.find({filename: imgName})
		if(images.length > 0) {
			saveImage()
		} else {
			// Recogemos los datos de la img
			const tempPath = req.file.path
			const ext = path.extname(req.file.originalname).toLowerCase()
			const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`)

			// Comprobamos que sea una imagen
			const admitedExts = ['.png', '.jpg', '.jpeg', '.gif']
			if(admitedExts.includes(ext)) {
				await fs.rename(tempPath, targetPath)
				const img = new Image({
					title: req.body.title,
					description: req.body.description,
					filename: imgName + ext,
				})
				const imgSaved = await img.save()
				res.redirect(`/images/${imgName}`)
			} else {
				await fs.unlink(tempPath)
				res.status(500).json({error: 'Only images are allowed'})
			}
		}
	}

	saveImage()
}

ctrl.like = async (req, res) => {
	const img = await Image.findOne({filename:{$regex: req.params.image_id}})
	if(img) {
		img.likes++
		img.save()
		res.json({likes: img.likes})
	} else {
		res.status(500).json({error: 'Internal Error'})
	}
}

ctrl.comment = async (req, res) => {
	const image = await Image.findOne({ filename: {$regex: req.params.image_id} })
	if(image) {
		const comment = new Comment(req.body)
		comment.gravatar = md5(comment.email)
		comment.image_id = image._id
		await comment.save()
		res.redirect(`/images/${image.uniqueId}`)
	} else {
		res.redirect('/')
	}
}

ctrl.remove = async (req, res) => {
	const image = await Image.findOne({filename: {$regex: req.params.image_id}})
	if(image) {
		await fs.unlink(path.resolve(`./src/public/upload/${image.filename}`))
		await Comment.deleteMany({image_id: image._id})
		await image.remove()
		res.json(true)
	}
}

module.exports = ctrl