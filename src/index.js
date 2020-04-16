const express = require('express')
const config = require('./server/config')

// Database
require('./database')

const app = config(express())

// Start server
app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))