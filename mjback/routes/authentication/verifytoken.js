//verify token middleware.
const jwt = require('jsonwebtoken')
const config = require('../../config')

function verifyToken(req, res, next) {
	const token = req.headers['x-access-token']
	if (!token) {
		return res.status(403).send({
			auth: false,
			message: "You are not logged in",
			token: null
		})
	}
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: "Failed to authenticate token.",
				token: null
			})
		}
		req.userId = decoded.id
		next()
	})
}

module.exports = verifyToken