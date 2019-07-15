const credentials = require('./credentials')

const { Client } = require('pg')
const { connectionString } = credentials.postgres[process.env.NODE_ENV || 'development']
const client = new Client({ connectionString })

const createScript = `
  CREATE TABLE IF NOT EXISTS vacations (
    name varchar(200) NOT NULL,
    slug varchar(200) PRIMARY KEY,
    category varchar(50),
    sku varchar(20),
    description text,
    location_search varchar(100) NOT NULL,
    location_lat double precision,
    location_lng double precision,
    price money,
    tags jsonb,
    in_season boolean,
    available boolean,
    requires_waiver boolean,
    maximum_guests integer,
    notes text,
    packages_sold integer
  );
  CREATE TABLE IF NOT EXISTS vacation_in_season_listeners (
    email varchar(200) NOT NULL,
    sku varchar(20) NOT NULL,
    PRIMARY KEY (email, sku)
  );
`

const getVacationCount = async client => {
  const { rows } = await client.query('SELECT COUNT(*) FROM VACATIONS')
  return Number(rows[0].count)
}

const seedVacations = async client => {
  const sql = `
    INSERT INTO vacations(
      name,
      slug,
      category,
      sku,
      description,
      location_search,
      price,
      tags,
      in_season,
      available,
      requires_waiver,
      maximum_guests,
      notes,
      packages_sold
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  `
  await client.query(sql, [
    'Hood River Day Trip',
    'hood-river-day-trip',
    'Day Trip',
    'HR199',
    'Spend a day sailing on the Columbia and enjoying craft beers in Hood River!',
    'Hood River, Oregon, USA',
    99.95,
    `["day trip", "hood river", "sailing", "windsurfing", "breweries"]`,
    true,
    true,
    false,
    16,
    null,
    0,
  ])
  await client.query(sql, [
    'Oregon Coast Getaway',
    'oregon-coast-getaway',
    'Weekend Getaway',
    'OC39',
    'Enjoy the ocean air and quaint coastal towns!',
    'Cannon Beach, Oregon, USA',
    269.95,
    JSON.stringify(['weekend getaway', 'oregon coast', 'beachcombing']),
    false,
    true,
    false,
    8,
    '',
    0,
  ])
  await client.query(sql, [
    'Rock Climbing in Bend',
    'rock-climbing-in-bend',
    'Adventure',
    'B99',
    'Experience the thrill of climbing in the high desert.',
    'Bend, Oregon, USA',
    289.95,
    JSON.stringify(['weekend getaway', 'bend', 'high desert', 'rock climbing']),
    true,
    true,
    true,
    4,
    'The tour guide is currently recovering from a skiing accident.',
    0,
  ])
}

client.connect().then(async () => {
  try {
    console.log('creating database schema')
    await client.query(createScript)
    const vacationCount = await getVacationCount(client)
    if(vacationCount === 0) {
      console.log('seeding vacations')
      await seedVacations(client)
    }
  } catch(err) {
    console.log('ERROR: could not initialize database')
    console.log(err.message)
  } finally {
    client.end()
  }
})
