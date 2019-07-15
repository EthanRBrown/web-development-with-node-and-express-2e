const https = require('https')
const qs = require('querystringify')

module.exports = twitterOptions => {
  
	// this variable will be invisible outside of this module
  let accessToken = null

  // this function will be invisible outside of this module
  const getAccessToken = async () => {
    if(accessToken) return accessToken

    const bearerToken = Buffer(
      encodeURIComponent(twitterOptions.consumerApiKey) + ':' +
      encodeURIComponent(twitterOptions.apiSecretKey)
    ).toString('base64')

    const options = {
      hostname: 'api.twitter.com',
      port: 443,
      method: 'POST',
      path: '/oauth2/token?grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + bearerToken,
      },
    }

    return new Promise((resolve, reject) =>
      https.request(options, res => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          const auth = JSON.parse(data)
          if(auth.token_type !== 'bearer')
            return reject(new Error('Twitter auth failed.'))
          accessToken = auth.access_token
          return resolve(accessToken)
        })
      }).end()
    )
  }

	return {
		search: async (query, count) => {
      const accessToken = await getAccessToken()
      const options = {
        hostname: 'api.twitter.com',
        port: 443,
        method: 'GET',
        path: '/1.1/search/tweets.json?q=' + 
          encodeURIComponent(query) +
          '&count=' + (count || 10),
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      }
      return new Promise((resolve, reject) =>
        https.request(options, res => {
          let data = ''
          res.on('data', chunk => data += chunk)
          res.on('end', () => resolve(JSON.parse(data)))
        }).end()
      )
    },

    embed: async (url, options = {}) => {
      options.url = url
      const accessToken = await getAccessToken()
      const requestOptions = {
        hostname: 'api.twitter.com',
        port: 443,
        method: 'GET',
        path: '/1.1/statuses/oembed.json?' + qs.stringify(options),
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      }
      return new Promise((resolve, reject) =>
        https.request(requestOptions, res => {
          let data = ''
          res.on('data', chunk => data += chunk)
          res.on('end', () => resolve(JSON.parse(data)))
        }).end()
      )
    },

  }

}