const helpers = {}

helpers.getRandomString = (length = 10) => {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
	let randomString = ''
	for (let i = 0; i < length; i++)
		randomString += chars.charAt(Math.floor(Math.random() * chars.length))
	return randomString
}

module.exports = helpers