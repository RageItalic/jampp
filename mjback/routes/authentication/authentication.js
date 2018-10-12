const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex          = require('knex')(configuration);
const bcrypt        = require('bcryptjs')
const jwt           = require('jsonwebtoken')
const verifyToken   = require('./verifyToken')
const config        = require('../../config')


//register route.
router.post('/user/register', async (req, res) => {
	const {fullName, email, password} = req.body
	try {
		var hash = bcrypt.hashSync(password, 8)
		const registerUser = await knex('people')
			.insert([{
				full_name: fullName,
				email,
				password_hash: hash
			}])
		const registeredUserInfo = await knex('people')
			.select('person_id')
			.where({
				email
			})
		console.log("THIS", registeredUserInfo)
		const token = jwt.sign(
			{id: registeredUserInfo[0].person_id}, 
			config.secret,
			{expiresIn: 60} 
		)
		res.status(200).send({
			auth: true,
			message: "Successfully Registered and Authenticated.",
			token
		})
	} catch (e) {
		console.log("User might already exist in the db", e)
    res.status(409).send({
    	auth: false, 
    	message: "I know your email address. You should login.",
    	token: null
    })
	}
})

//login route.
router.post('/user/login', async (req, res) => {
	const {email, password} = req.body
	try {
		const personInfo = await knex('people')
			.select('password_hash', 'person_id')
			.where({
				email
			})
		if (bcrypt.compareSync(password, personInfo[0].password_hash)) {
			const token = jwt.sign(
				{id: personInfo[0].person_id},
				config.secret,
				{expiresIn: 60}
			)
			res.status(200).send({
				auth: true,
				message: "Successfully Logged In and Authenticated.",
				token
			})
		} else {
			res.status(400).send({
				auth: false,
				message: "You entered the wrong email or password. Try again!",
				token: null
			})
		}
	} catch (e) {
		console.log("ERROR", e)
    res.status(404).send({
    	auth: false,
    	message: 'I cant let you in. I dont know you. Try signing up or checking your login details.',
    	token: null
    })
	}
})

router.delete('/allUsers', async (req, res) => {
	const users = await knex('people').select("*")
	users.forEach(async user => await knex('people').where('person_id', '=', user.person_id).del())
	res.send("All users should be deleted.")
})

router.get('/allUsers', async (req, res) => {
	const allUsers = await knex('people').select("*")
	res.send(allUsers)
})

router.get('/user/getFakeData', verifyToken, async (req, res) => {
	const user = await knex('people').select('*').where({person_id: req.userId})
	res.status(200).send({
		auth: true,
		message: "You, you naughty dog you.",
		user
	})
})


module.exports = router