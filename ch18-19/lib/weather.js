const https = require('https')
const { URL } = require('url')

const _fetch = url => new Promise((resolve, reject) => {
  const { hostname, pathname, search } = new URL(url)
  const options = {
    hostname,
    path: pathname + search,
    headers: {
      'User-Agent': 'Meadowlark Travel'
    },
  }
  https.get(options, res => {
    let data = ''
    res.on('data', chunk => data += chunk)
    res.on('end', () => resolve(JSON.parse(data)))
  }).end()
})

module.exports = locations => {

  const cache = {
    refreshFrequency: 15 * 60 * 1000,
    lastRefreshed: 0,
    refreshing: false,
    forecasts: locations.map(location => ({ location })),
  }

  const updateForecast = async forecast => {
    if(!forecast.url) {
      const { lat, lng } = forecast.location.coordinates
      const path = `/points/${lat.toFixed(4)},${lng.toFixed(4)}`
      const points = await _fetch('https://api.weather.gov' + path)
      forecast.url = points.properties.forecast
    }
    const { properties: { periods } } = await _fetch(forecast.url)
    const currentPeriod = periods[0]
    Object.assign(forecast, {
      iconUrl: currentPeriod.icon,
      weather: currentPeriod.shortForecast,
      temp: currentPeriod.temperature + ' ' + currentPeriod.temperatureUnit,
    })
    return forecast
  }

  const getForecasts = async () => {
    if(Date.now() > cache.lastRefreshed + cache.refreshFrequency) {
      cache.refreshing = true
      cache.forecasts = await Promise.all(cache.forecasts.map(updateForecast))
      cache.refreshing = false
    }
    return cache.forecasts
  }

  return getForecasts

}
