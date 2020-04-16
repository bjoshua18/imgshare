const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const multer = require('multer')
const express = require('express')
const routes = require('../routes/index')
const errorHandler = require('errorhandler')

module.exports = app => {
	// Settings
	app.set('port', process.env.PORT || 3000)
	app.set('views', path.join(__dirname, 'views'))
	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		partialsDir: path.join(app.get('views'), 'partials'),
		layoutsDir: path.join(app.get('views'), 'layouts'),
		extname: '.hbs',
		helpers: require('./helpers')
	}))
	app.set('view engine', '.hbs')

	// Midlewares
	app.use(morgan('dev')) // Logger
	app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')) // Manejo de img
	app.use(express.urlencoded({extended: false})) // Recibir datos de form
	app.use(express.json()) // Ajax

	// Routers
	routes(app)

	// Static Files
	app.use('/public', express.static(path.join(__dirname, '../public')))

	// Errorhandlers
	if (app.get('env') === 'development') {
		app.use(errorHandler)
	}

	return app
}