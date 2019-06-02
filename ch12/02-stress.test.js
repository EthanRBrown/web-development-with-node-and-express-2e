const loadtest = require('loadtest')

describe('stress tests', function(){

  test('homepage should handle 50 requests in a second', done => {
    const options = {
      url: 'http://localhost:3000',
      concurrency: 4,
      maxRequests: 50,
    }
    loadtest.loadTest(options, (err,result) => {
      expect(!err)
      expect(result.totalTimeSeconds < 1)
      done()
    })
  })

})
