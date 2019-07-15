const mongoose = require('mongoose')

const vacationInSeasonListenerSchema = mongoose.Schema({
  email: String,
  skus: [String],
})
const VacationInSeasonListener = mongoose.model('VacationInSeasonListener',
  vacationInSeasonListenerSchema)

module.exports = VacationInSeasonListener
