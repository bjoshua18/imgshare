const path = require('path')
const fs = require('fs-extra')
const { getRandomString } = require('../helpers/libs')

const ctrl = {}

ctrl.index = async (req, res) => {

}

ctrl.create = (req, res) => {
	const imgName = getRandomString(6)
	const tempPath = req.file.path
	const ext = path.extname(req.file.originalname).toLowerCase()
	const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`)

	const admitedExts = ['.png', '.jpg', '.jpeg', '.gif']
	if(admitedExts.includes(ext))
		await fs.rename(tempPath, targetPath)

	res.send('works!')
}

ctrl.like = (req, res) => {
	
}

ctrl.comment = (req, res) => {
	
}

ctrl.remove = (req, res) => {
	
}

module.exports = ctrl