import 'dotenv/config'
import Restaurants from '../restaurants.js'
import db from '../../config/mongoose.js'

import { createRequire } from 'module'
const require = createRequire(import.meta.url) // construct the require method
const restaurantList = require('../../restaurant.json') // use the require method

db.once('open', () => {
  console.log('mongodb connected! run the seeder')
  Restaurants.create(restaurantList.results)
    .then(() => {
      console.log('done')
      process.exit()
    })
})
