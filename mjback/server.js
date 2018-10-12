/*TODO: 
* Set Up Knex. (Write the steps/commands in notes or something)
* Build out user routes.
*
*
*
*
*
*
*
*/

const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()
const PORT       = process.env.PORT || 4500
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const authentication = require('./routes/authentication/authentication.js')
const journal = require('./routes/journal.js')

app.use('/api/auth', authentication)
app.use('/api/journal', journal)

app.get('/', (req, res) => {
	res.send("HELLO")
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))