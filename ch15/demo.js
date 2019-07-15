const db = require('./db')

const go = async () => {
  const vacations = await db.getVacations()
  console.log(vacations)
}

go()
