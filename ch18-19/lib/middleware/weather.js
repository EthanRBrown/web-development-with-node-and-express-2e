const weatherData = require('../weather')

const getWeatherData = weatherData([
  {
    name: 'Portland',
    coordinates: { lat: 45.5154586, lng: -122.6793461 },
  },
  {
    name: 'Bend',
    coordinates: { lat: 44.0581728, lng: -121.3153096 },
  },
  {
    name: 'Manzanita',
    coordinates: { lat: 45.7184398, lng: -123.9351354 },
  },
])

const weatherMiddleware = async (req, res, next) => {
  if(!res.locals.partials) res.locals.partials = {}
  res.locals.partials.weatherContext = await getWeatherData()
  console.log('context: ', res.locals.partials.weatherContext)
  next()
}

module.exports = weatherMiddleware
