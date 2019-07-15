module.exports = (req, res, next) => {
	// if there's a flash message, transfer
	// it to the context, then clear it
	res.locals.flash = req.session.flash
	delete req.session.flash
	next()
}
