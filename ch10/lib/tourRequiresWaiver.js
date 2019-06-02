module.exports = (req,res,next) => {
	const { cart } = req.session
	if(!cart) return next()
	if(cart.items.some(item => item.product.requiresWaiver)) {
    cart.warnings.push('One or more of your selected ' +
      'tours requires a waiver.')
	}
	next()
}
