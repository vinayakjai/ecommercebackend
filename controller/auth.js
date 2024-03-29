const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {

	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		User.findOne({
			username: username,
			password: password,
		})
			.then((user) => {
		
				if (user) {
					
					let token= jwt.sign({ user: username ,id:user.id}, 'secret_key')
					return res.cookie('token',token,{
						httpOnly:true,
						maxAge:3600000,//1hr in miliseconds
					}).status(201).json({
						token,
					});
				} else {
					return res.status(401).
					res.json({
						err:'invalid user'
					});
				}
			})
			.catch((err) => {
				 return res.status(401).json({
					err:'Soemthing went wrong while login user'
				 })
			});
	}
};
