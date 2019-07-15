const db = require('../db')

exports.api = {}

exports.home = (req, res) => res.render('home')

// **** these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
// **** end browser-submitted form handlers

exports.vacationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoContestAjax = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('field data: ', fields)
  console.log('files: ', files)
  res.redirect(303, '/contest/vacation-photo-thank-you')
}
exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  res.redirect(303, '/contest/vacation-photo-error')
}

const pathUtils = require('path')
const fs = require('fs')

// create directory to store vacation photos (if it doesn't already exist)
const dataDir = pathUtils.resolve(__dirname, '..', 'data')
const vacationPhotosDir = pathUtils.join(dataDir, 'vacation-photos')
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
if(!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir)

function saveContestEntry(contestName, email, year, month, photoPath) {
  // TODO...this will come later
}

// we'll want these promise-based versions of fs functions in our async function
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const rename = promisify(fs.rename)

exports.api.vacationPhotoContest = async (req, res, fields, files) => {
  const photo = files.photo[0]
  const dir = vacationPhotosDir + '/' + Date.now()
  const path = dir + '/' + photo.originalFilename
  await mkdir(dir)
  await rename(photo.path, path)
  saveContestEntry('vacation-photo', fields.email,
    req.params.year, req.params.month, path)
  res.send({ result: 'success' })
}
exports.api.vacationPhotoContestError = (req, res, message) => {
  res.send({ result: 'error', error: message })
}

// **** these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api.newsletterSignup = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.send({ result: 'success' })
}
// **** end fetch/JSON form handlers

function convertFromUSD(value, currency) {
  switch(currency) {
    case 'USD': return value * 1
    case 'GBP': return value * 0.79
    case 'BTC': return value * 0.000078
    default: return NaN
  }
}

exports.listVacations = async (req, res) => {
  const vacations = await db.getVacations({ available: true })
  const currency = req.session.currency || 'USD'
  const context = {
    currency: currency,
    vacations: vacations.map(vacation => {
      return {
        sku: vacation.sku,
        name: vacation.name,
        description: vacation.description,
        inSeason: vacation.inSeason,
        price: convertFromUSD(vacation.price, currency),
        qty: vacation.qty,
      }
    }),
  }
  switch(currency) {
    case 'USD': context.currencyUSD = 'selected'; break
    case 'GBP': context.currencyGBP = 'selected'; break
    case 'BTC': context.currencyBTC = 'selected'; break
  }
  res.render('vacations', context)
}

// note that this redirects to the /vacations page, but may
// want to use on // other pages!  should fix....
exports.setCurrency = (req, res) => {
  req.session.currency = req.params.currency
  return res.redirect(303, '/vacations')
}

exports.notifyWhenInSeasonForm = (req, res) =>
  res.render('notify-me-when-in-season', { sku: req.query.sku })

exports.notifyWhenInSeasonProcess = async (req, res) => {
  const { email, sku } = req.body
  await db.addVacationInSeasonListener(email, sku)
  return res.redirect(303, '/vacations')
}

exports.getVacationsApi = async (req, res) => {
  const vacations = await db.getVacations({ available: true })
  res.json(vacations)
}

exports.getVacationBySkuApi = async (req, res) => {
  const vacation = await db.getVacationBySku(req.params.sku)
  res.json(vacation)
}

exports.addVacationInSeasonListenerApi = async (req, res) => {
  await db.addVacationInSeasonListener(req.params.sku, req.body.email)
  res.json({ message: 'success' })
}

exports.requestDeleteVacationApi = async (req, res) => {
  const { email, notes } = req.body
  res.status(500).json({ message: 'not yet implemented' })
}

exports.notFound = (req, res) => res.render('404')

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
  console.log(err)
  res.render('500')
}
/* eslint-enable no-unused-vars */

